using System.ComponentModel.DataAnnotations;

namespace HTMLLesson.Models
{

    public class UserLogin
    {

        [MaxLength(16)]
        public string Username { get; set; } = string.Empty;

        [MaxLength(16)]
        public string Password { get; set; } = string.Empty;

    }
}
