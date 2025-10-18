namespace Posterr.Api.Models
{
    public class Repost
    {
        public int Id { get; set; }
        public int PostId { get; set; }
        public Post OriginalPost { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public DateTime CreatedAt { get; set; }
        public object Value { get; }
    }
}
