using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Posterr.Api.Data;
using Posterr.Api.Models;
using Swashbuckle.AspNetCore.Annotations;
using System;
using System.Collections.Generic;
using static Microsoft.Extensions.Logging.EventSource.LoggingEventSource;

namespace Posterr.Api.Controller
{
    [ApiController]
    [Route("api/posts")]
    public class PostsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PostsController(AppDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Retrieves a list of posts with optional sorting and keyword filtering.
        /// </summary>
        /// <param name="sort">Sorting method: "latest" (default) or "trending".</param>
        /// <param name="keyword">Keyword to filter posts by content (optional).</param>
        /// <returns>A list of posts matching the criteria, limited to 15 items.</returns>
        /// <response code="200">Returns the list of posts.</response>
        /// <response code="400">Bad request, invalid parameters provided.</response>
        /// <response code="500">Internal server error.</response>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetPosts(string sort = "latest", string keyword = "", int page = 1, int pageSize = 15)
        {
            try
            {
                if (sort != "latest" && sort != "trending")
                {
                    return BadRequest(new { message = "Invalid sort parameter. Allowed values are 'latest' or 'trending'." });
                }

                // Validate page and pageSize
                if (page < 1)
                {
                    return BadRequest(new { message = "Page number must be greater than or equal to 1." });
                }
                if (pageSize < 1 || pageSize > 100)
                {
                    return BadRequest(new { message = "Page size must be between 1 and 100." });
                }

                var query = _context.Posts.Include(p => p.User).AsQueryable();

                if (!string.IsNullOrEmpty(keyword))
                {
                    query = query.Where(p => p.Content.Contains(keyword));
                }

                query = sort == "trending"
                    ? query.OrderByDescending(p => p.RepostCount)
                    : query.OrderByDescending(p => p.CreatedAt);

                // Apply pagination: Skip the posts for the previous pages, and take only the posts for the current page
                var posts = await query
                    .Skip((page - 1) * pageSize)  // Skip the posts that belong to previous pages
                    .Take(pageSize)               // Take the number of posts requested
                    .ToListAsync();

                var totalPosts = await query.CountAsync();

                // Return paginated posts along with total count for frontend use
                return Ok(new
                {
                    Posts = posts,
                    TotalPosts = totalPosts
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An internal server error occurred.", details = ex.Message });
            }
        }



        /// <summary>
        /// Creates a new post.
        /// </summary>
        /// <param name="post">The post object to be created, containing content and user information.</param>
        /// <returns>The newly created post with a 201 Created status, or a 400 Bad Request if the content is too long.</returns>
        /// <response code="201">Returns the newly created post.</response>
        /// <response code="400">Bad request, content exceeds the maximum length of 777 characters.</response>
        /// <response code="500">Internal server error, unexpected error occurred while saving the post.</response>
        [HttpPost]
        [SwaggerOperation(
            Summary = "Create a new post",
            Description = "This endpoint allows you to create a new post. It accepts the content of the post and saves it in the database."
        )]
        [Produces("application/json")]
        [Consumes("application/json")]
        [ProducesResponseType(201, Type = typeof(Post))]
        [ProducesResponseType(400, Type = typeof(string))]
        [ProducesResponseType(500)]
        public async Task<IActionResult> CreatePost([FromBody] Post post)
        {
            if (post.Content.Length > 777)
            {
                return BadRequest("Content exceeds the maximum length of 777 characters.");
            }

            // Get today's date without time
            var today = DateTime.Today;

            // Count the posts created by the user today
            var postsToday = await _context.Posts.CountAsync(p => p.UserId == post.UserId && p.CreatedAt.Date == today);

            // Check if the user has reached the daily limit
            if (postsToday >= 5)
            {
                return BadRequest("You have reached the limit of 5 posts per day.");
            }

            try
            {
                _context.Posts.Add(post);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetPosts), new { id = post.Id }, post);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }


        [HttpPost("{id}/repost")]
        [SwaggerOperation(
            Summary = "Repost an existing post",
            Description = "This endpoint creates a new post as a repost of an existing post and increments the repost count of the original post."
        )]
        [Produces("application/json")]
        [Consumes("application/json")]
        [ProducesResponseType(201, Type = typeof(Post))]
        [ProducesResponseType(400, Type = typeof(string))]
        [ProducesResponseType(404, Type = typeof(string))]
        [ProducesResponseType(500)]
        public async Task<IActionResult> Repost(int id, [FromBody] User user) 
        {
            try
            {
                // Gets original post

                var originalPost = await _context.Posts.FindAsync(id);


                if (originalPost == null)
                {
                    return NotFound("Original post not found.");
                }

                var existingUser = await _context.Users.FindAsync(user.Id);
                if (existingUser == null)
                {
                    return BadRequest("User not found in the database.");
                }

                // Check if the user has already reposted the original post
                var hasReposted = await _context.Reposts.AnyAsync(r => r.PostId == originalPost.Id && r.UserId == existingUser.Id);
                if (hasReposted)
                {
                    return BadRequest("You have already reposted this post.");
                }

                Repost repost = new Repost
                {
                    PostId = originalPost.Id,
                    OriginalPost = originalPost,
                    UserId = existingUser.Id,
                    User = existingUser,
                    CreatedAt = DateTime.Now,
                };

                originalPost.RepostCount++;
                _context.Reposts.Add(repost);
                _context.Entry(originalPost).State = EntityState.Modified;

                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetPosts), new { id = repost.Id }, repost);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
