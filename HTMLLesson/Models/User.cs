using System.ComponentModel.DataAnnotations;

namespace HTMLLesson.Models
{

    public class User
    {
        [Key]
        public int Id { get; set; }
        [MaxLength(20)]
        public string? Name { get; set; }
        [MaxLength(30)]
        public string? Lastname { get; set; }
        [MaxLength(16)]
        public string Username { get; set; }
        public long Phone { get; set; }
        public DateTime? Birthday { get; set; }
        [MaxLength(75)]
        public string? Email { get; set; }
        [MaxLength(16)]
        public string Password { get; set; }
        public string? Address { get; set; }
        public bool Status { get; set; } = false;

    }
}
