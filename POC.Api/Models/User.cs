using System.ComponentModel.DataAnnotations;

namespace Posterr.Api.Models
{
    public class User
    {
        public int Id { get; set; }
        [Required]
        [RegularExpression(@"^[a-zA-Z0-9]+$", ErrorMessage = "Username must be and a unique alphanumeric string")]
        public string Username { get; set; }
    }
}
