using System.ComponentModel.DataAnnotations;

namespace corebackend.Models.DTOs
{
    public class UpdateProfileRequest
    {
        [Required(ErrorMessage = "Name is required")]
        public string Name { get; set; } = null!;
    }

    public class ChangePasswordRequest
    {
        [Required(ErrorMessage = "Current password is required")]
        public string CurrentPassword { get; set; } = null!;

        [Required(ErrorMessage = "New password is required")]
        [MinLength(6, ErrorMessage = "Password must be at least 6 characters")]
        public string NewPassword { get; set; } = null!;

        [Required(ErrorMessage = "Confirm password is required")]
        public string ConfirmPassword { get; set; } = null!;
    }
}
