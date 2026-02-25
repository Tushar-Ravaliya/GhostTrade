using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using corebackend.Models;
using corebackend.Services; // Ensure this matches your namespace
using BCrypt.Net;

namespace corebackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IMongoCollection<User> _users;

        public AuthController(MongoService mongoService)
        {
            _users = mongoService.GetCollection<User>("Users");
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            // 1. Check if user exists
            var existingUser = await _users.Find(u => u.email == request.Email).FirstOrDefaultAsync();
            if (existingUser != null) return BadRequest(new { message = "Email already registered" });

            // 2. Create new user with your model fields
            var newUser = new User
            {
                name = request.Name,
                email = request.Email,
                password = BCrypt.Net.BCrypt.HashPassword(request.Password), // Hash for security
                mobileNo = request.MobileNo,
                status = "Active",
                balance = 0, // Initializing as string per your model
                createdAt = DateTime.UtcNow.ToString("yyyy-MM-dd HH:mm:ss"),
                updatedAt = DateTime.UtcNow.ToString("yyyy-MM-dd HH:mm:ss")
            };

            await _users.InsertOneAsync(newUser);
            return Ok(new { message = "User created successfully" });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            // 1. Find user
            var user = await _users.Find(u => u.email == request.Email).FirstOrDefaultAsync();
            if (user == null) return Unauthorized(new { message = "Invalid email or password" });

            // 2. Verify Password
            bool isValid = BCrypt.Net.BCrypt.Verify(request.Password, user.password);
            if (!isValid) return Unauthorized(new { message = "Invalid email or password" });

            // 3. Return User Data (Excluding password for security)
            return Ok(new
            {
                message = "Welcome back!",
                data = new { user.id, user.name, user.email, user.balance, user.status }
            });
        }
    }

    // DTOs for incoming JSON
    public record RegisterRequest(string Name, string Email, string Password, string MobileNo);
    public record LoginRequest(string Email, string Password);
}