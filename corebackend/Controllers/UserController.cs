using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using System.Security.Claims;
using corebackend.Models;
using corebackend.Models.DTOs;
using corebackend.Services;

namespace corebackend.Controllers
{
    [ApiController]
    [Route("api/v1/user")]
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly IMongoCollection<User> _users;
        private readonly ImageKitService _imageKitService;

        public UserController(MongoService mongoService, ImageKitService imageKitService)
        {
            _users = mongoService.GetCollection<User>("users");
            _imageKitService = imageKitService;
        }

        private string UserId => User.FindFirstValue("id") ?? "";

        // GET /api/v1/user/me
        [HttpGet("me")]
        public async Task<IActionResult> GetMe()
        {
            var user = await _users.Find(u => u.Id == UserId).FirstOrDefaultAsync();
            if (user == null)
            {
                return StatusCode(404, new ApiErrorResponse(404, "User not found"));
            }

            return Ok(new ApiResponse<UserResponse>(200, UserResponse.FromUser(user), "User fetched successfully"));
        }

        // PUT /api/v1/user/update-profile
        [HttpPut("update-profile")]
        public async Task<IActionResult> UpdateProfile([FromBody] UpdateProfileRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Name))
            {
                return StatusCode(400, new ApiErrorResponse(400, "Name is required"));
            }

            var user = await _users.Find(u => u.Id == UserId).FirstOrDefaultAsync();
            if (user == null)
            {
                return StatusCode(404, new ApiErrorResponse(404, "User not found"));
            }

            user.Name = request.Name.Trim();
            user.UpdatedAt = DateTime.UtcNow;

            await _users.ReplaceOneAsync(u => u.Id == user.Id, user);

            return Ok(new ApiResponse<UserResponse>(200, UserResponse.FromUser(user), "Profile updated successfully"));
        }

        // PUT /api/v1/user/upload-photo
        [HttpPut("upload-photo")]
        public async Task<IActionResult> UploadPhoto(IFormFile? profilePhoto)
        {
            if (profilePhoto == null || profilePhoto.Length == 0)
            {
                return StatusCode(400, new ApiErrorResponse(400, "No file uploaded"));
            }

            var user = await _users.Find(u => u.Id == UserId).FirstOrDefaultAsync();
            if (user == null)
            {
                return StatusCode(404, new ApiErrorResponse(404, "User not found"));
            }

            using var memoryStream = new MemoryStream();
            await profilePhoto.CopyToAsync(memoryStream);
            var fileBytes = memoryStream.ToArray();

            var fileName = $"profile_{user.Id}_{DateTimeOffset.UtcNow.ToUnixTimeMilliseconds()}";
            
            try 
            {
                var url = await _imageKitService.UploadImageAsync(fileBytes, fileName, "/ghosttrade/profiles");
                user.ProfilePhoto = url;
                user.UpdatedAt = DateTime.UtcNow;

                await _users.ReplaceOneAsync(u => u.Id == user.Id, user);

                return Ok(new ApiResponse<UserResponse>(200, UserResponse.FromUser(user), "Profile photo updated successfully"));
            }
            catch (Exception ex)
            {
                 return StatusCode(500, new ApiErrorResponse(500, "Image upload failed", new[] { ex.Message }));
            }
        }

        // PUT /api/v1/user/change-password
        [HttpPut("change-password")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordRequest request)
        {
            if (request.NewPassword != request.ConfirmPassword)
            {
                return StatusCode(400, new ApiErrorResponse(400, "New password and confirm password do not match"));
            }

            var user = await _users.Find(u => u.Id == UserId).FirstOrDefaultAsync();
            if (user == null)
            {
                return StatusCode(404, new ApiErrorResponse(404, "User not found"));
            }

            bool isMatch = BCrypt.Net.BCrypt.Verify(request.CurrentPassword, user.Password);
            if (!isMatch)
            {
                return StatusCode(400, new ApiErrorResponse(400, "Current password is incorrect"));
            }

            user.Password = BCrypt.Net.BCrypt.HashPassword(request.NewPassword, 10);
            user.UpdatedAt = DateTime.UtcNow;

            await _users.ReplaceOneAsync(u => u.Id == user.Id, user);

            return Ok(new ApiResponse<object?>(200, null, "Password changed successfully"));
        }
    }
}
