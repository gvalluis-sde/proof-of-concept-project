namespace Posterr.Api.Models
{
    public class Post
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public DateTime CreatedAt { get; set; }
        public int UserId { get; set; }
        public User? User { get; set; }
        public int RepostCount { get; set; } = 0;
    }
}
