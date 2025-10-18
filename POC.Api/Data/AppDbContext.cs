using Microsoft.EntityFrameworkCore;
using Posterr.Api.Models;

namespace Posterr.Api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasIndex(u => u.Username)
                .IsUnique();
        }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Repost> Reposts { get; set; }
    }
}
