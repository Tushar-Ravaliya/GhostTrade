using System.ComponentModel.DataAnnotations;

namespace corebackend.Models.DTOs
{
    // ── Register Request ──
    public class RegisterRequest
    {
        [Required(ErrorMessage = "Name is required")]
        public string Name { get; set; } = null!;

        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email format")]
        public string Email { get; set; } = null!;

        [Required(ErrorMessage = "Password is required")]
        [MinLength(6, ErrorMessage = "Password must be at least 6 characters")]
        public string Password { get; set; } = null!;

        [Required(ErrorMessage = "Mobile number is required")]
        public string MobileNo { get; set; } = null!;
    }

    // ── Login Request ──
    public class LoginRequest
    {
        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email format")]
        public string Email { get; set; } = null!;

        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set; } = null!;
    }

    // ── User Response (excludes password) ──
    public class UserResponse
    {
        public string Id { get; set; } = null!;
        public string Name { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string MobileNo { get; set; } = null!;
        public string ProfilePhoto { get; set; } = "";
        public string Status { get; set; } = null!;
        public double Balance { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        public static UserResponse FromUser(User user)
        {
            return new UserResponse
            {
                Id = user.Id!,
                Name = user.Name,
                Email = user.Email,
                MobileNo = user.MobileNo,
                ProfilePhoto = user.ProfilePhoto,
                Status = user.Status,
                Balance = user.Balance,
                CreatedAt = user.CreatedAt,
                UpdatedAt = user.UpdatedAt
            };
        }
    }
}
