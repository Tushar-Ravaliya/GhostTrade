using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using corebackend.Models;
using corebackend.Models.DTOs;
using corebackend.Services;

namespace corebackend.Controllers
{
    [ApiController]
    [Route("api/v1/about")]
    public class AboutController : ControllerBase
    {
        private readonly IMongoCollection<About> _about;

        public AboutController(MongoService mongoService)
        {
            _about = mongoService.GetCollection<About>("abouts");
        }

        // GET /api/v1/about
        [HttpGet]
        public async Task<IActionResult> GetAbout()
        {
            var about = await _about.Find(_ => true).FirstOrDefaultAsync();

            if (about == null)
            {
                about = new About
                {
                    HeroTitle = "Trade With Complete Confidence",
                    HeroSubtitle = "Our comprehensive security infrastructure ensures every transaction is safe, authenticated, and backed by industry-leading protection.",
                    Features = new List<Feature>
                    {
                        new Feature { Title = "Escrow Protection", Description = "Funds are held securely until both parties confirm the transaction is complete, protecting buyers and sellers alike.", Badge = "Essential", Icon = "Shield", Order = 1 },
                        new Feature { Title = "Verified Sellers", Description = "Multi-step verification process including ID verification, address confirmation, and trading history review.", Badge = "Trust", Icon = "UserCheck", Order = 2 },
                        new Feature { Title = "End-to-End Encryption", Description = "All communications and transactions are encrypted using bank-level security protocols.", Badge = "Security", Icon = "Lock", Order = 3 },
                        new Feature { Title = "Authentication Services", Description = "Partner with leading authentication services to verify every transaction and account activity.", Badge = "Quality", Icon = "FileCheck", Order = 4 },
                        new Feature { Title = "Fraud Detection", Description = "Advanced AI-powered systems monitor all transactions for suspicious activity in real-time.", Badge = "Protection", Icon = "Eye", Order = 5 },
                        new Feature { Title = "Dispute Resolution", Description = "Dedicated team of experts to mediate and resolve any disputes fairly and efficiently.", Badge = "Support", Icon = "Scale", Order = 6 },
                        new Feature { Title = "Secure Payments", Description = "Multiple secure payment options including cards, bank transfers, and cryptocurrency.", Badge = "Flexible", Icon = "CreditCard", Order = 7 },
                        new Feature { Title = "Two-Factor Auth", Description = "Optional 2FA adds an extra layer of security to your account and transactions.", Badge = "Control", Icon = "Fingerprint", Order = 8 }
                    }
                };

                await _about.InsertOneAsync(about);
            }

            return Ok(new ApiResponse<About>(200, about, "About data fetched successfully"));
        }

        // PUT /api/v1/about
        [Authorize]
        [HttpPut]
        public async Task<IActionResult> UpdateAbout([FromBody] UpdateAboutRequest request)
        {
            var about = await _about.Find(_ => true).FirstOrDefaultAsync();

            if (about == null)
            {
                about = new About();
            }

            if (!string.IsNullOrWhiteSpace(request.HeroTitle)) about.HeroTitle = request.HeroTitle;
            if (!string.IsNullOrWhiteSpace(request.HeroSubtitle)) about.HeroSubtitle = request.HeroSubtitle;
            if (request.Features != null) about.Features = request.Features;

            about.UpdatedAt = DateTime.UtcNow;

            if (about.Id == null)
            {
                await _about.InsertOneAsync(about);
            }
            else
            {
                await _about.ReplaceOneAsync(a => a.Id == about.Id, about);
            }

            return Ok(new ApiResponse<About>(200, about, "About page updated successfully"));
        }
    }
}
