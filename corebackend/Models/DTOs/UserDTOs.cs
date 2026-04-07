using System.ComponentModel.DataAnnotations;

namespace corebackend.Models.DTOs
{
    public class UpdateProfileRequest
    {
        [Required]
        public string Name { get; set; } = null!;
    }

    public class ChangePasswordRequest
    {
        [Required]
        public string CurrentPassword { get; set; } = null!;

        [Required]
        public string NewPassword { get; set; } = null!;

        [Required]
        public string ConfirmPassword { get; set; } = null!;
    }
}
