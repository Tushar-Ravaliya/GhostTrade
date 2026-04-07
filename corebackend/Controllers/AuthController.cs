using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using corebackend.Models;
using corebackend.Models.DTOs;
using corebackend.Services;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace corebackend.Controllers
{
    [ApiController]
    [Route("api/v1/auth")]
    public class AuthController : ControllerBase
    {
        private readonly IMongoCollection<User> _users;
        private readonly IConfiguration _config;

        public AuthController(MongoService mongoService, IConfiguration config)
        {
            _users = mongoService.GetCollection<User>("users");
            _config = config;
        }

        // ── POST /api/v1/auth/register ──
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            // 1. Check if user with same email or mobileNo already exists
            var filter = Builders<User>.Filter.Or(
                Builders<User>.Filter.Eq(u => u.Email, request.Email.ToLower().Trim()),
                Builders<User>.Filter.Eq(u => u.MobileNo, request.MobileNo)
            );
            var existingUser = await _users.Find(filter).FirstOrDefaultAsync();

            if (existingUser != null)
            {
                return StatusCode(400, new ApiErrorResponse(400, "User with this email or mobile number already exists"));
            }

            // 2. Create user with hashed password
            var newUser = new User
            {
                Name = request.Name.Trim(),
                Email = request.Email.ToLower().Trim(),
                Password = BCrypt.Net.BCrypt.HashPassword(request.Password, 10),
                MobileNo = request.MobileNo,
                ProfilePhoto = "",
                Status = "active",
                Balance = 100000,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                Version = 0
            };

            await _users.InsertOneAsync(newUser);

            // 3. Generate JWT token (1 day expiry — same as Node.js register)
            var token = GenerateJwtToken(newUser.Id!, TimeSpan.FromDays(1));

            // 4. Set cookie
            SetTokenCookie(token);

            // 5. Return response matching Node.js format
            var userResponse = UserResponse.FromUser(newUser);
            return StatusCode(201, new ApiResponse<UserResponse>(201, userResponse, "User registered successfully"));
        }

        // ── POST /api/v1/auth/login ──
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            // 1. Find user by email
            var user = await _users.Find(u => u.Email == request.Email.ToLower().Trim())
                                   .FirstOrDefaultAsync();

            if (user == null)
            {
                return StatusCode(400, new ApiErrorResponse(400, "Invalid email or password"));
            }

            // 2. Compare password
            bool isMatch = BCrypt.Net.BCrypt.Verify(request.Password, user.Password);
            if (!isMatch)
            {
                return StatusCode(400, new ApiErrorResponse(400, "Invalid password"));
            }

            // 3. Generate JWT (1 hour expiry — same as Node.js login)
            var token = GenerateJwtToken(user.Id!, TimeSpan.FromHours(1));

            // 5. Set cookie
            SetTokenCookie(token);

            // 6. Return user + token (matching Node.js response shape)
            var userResponse = UserResponse.FromUser(user);
            return StatusCode(200, new ApiResponse<object>(200, new { user = userResponse, token }, "User logged in successfully"));
        }

        // ── POST /api/v1/auth/logout ──
        [HttpPost("logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("token", new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict
            });

            return StatusCode(200, new ApiResponse<object?>(200, null, "User logged out successfully"));
        }

        // ── Helper: Generate JWT Token ──
        private string GenerateJwtToken(string userId, TimeSpan expiry)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]!));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim("id", userId),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.Add(expiry),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        // ── Helper: Set token cookie ──
        private void SetTokenCookie(string token)
        {
            Response.Cookies.Append("token", token, new CookieOptions
            {
                HttpOnly = true,
                Secure = false,  // false for development (localhost)
                SameSite = SameSiteMode.Lax,
                Expires = DateTimeOffset.UtcNow.AddDays(1)
            });
        }
    }
}