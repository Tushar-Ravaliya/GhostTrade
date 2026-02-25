using BCrypt.Net;
using corebackend.Services;
using corebackend.Models; // Ensure your User model is here
using corebackend.Services;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

namespace corebackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IMongoCollection<User> _users;

        public AuthController(MongoService mongoService)
        {
            // Connects to the "Users" collection in MongoDB
            _users = mongoService.GetCollection<User>("Users");
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto model)
        {
            // 1. Check if user already exists
            var existingUser = await _users.Find(u => u.Email == model.Email).FirstOrDefaultAsync();
            if (existingUser != null) return BadRequest("User with this email already exists.");

            // 2. Hash the password using BCrypt
            string passwordHash = BCrypt.Net.BCrypt.HashPassword(model.Password);

            // 3. Create the User object
            var newUser = new User
            {
                Username = model.Username,
                Email = model.Email,
                PasswordHash = passwordHash
            };

            // 4. Save to MongoDB
            await _users.InsertOneAsync(newUser);
            return Ok(new { message = "Registration successful!" });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto model)
        {
            // 1. Find user by email
            var user = await _users.Find(u => u.Email == model.Email).FirstOrDefaultAsync();
            if (user == null) return Unauthorized("Invalid email or password.");

            // 2. Verify the hashed password
            bool isPasswordValid = BCrypt.Net.BCrypt.Verify(model.Password, user.PasswordHash);
            if (!isPasswordValid) return Unauthorized("Invalid email or password.");

            // 3. Success (Ideally, return a JWT token here)
            return Ok(new
            {
                message = "Login successful!",
                user = new { user.Id, user.Username, user.Email }
            });
        }
    }

    // Data Transfer Objects (DTOs) for clean input handling
    public record RegisterDto(string Username, string Email, string Password);
    public record LoginDto(string Email, string Password);
}