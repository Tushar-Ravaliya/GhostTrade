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
    [Route("api/v1/trade")]
    [Authorize]
    public class TradeController : ControllerBase
    {
        private readonly IMongoCollection<User> _users;
        private readonly IMongoCollection<Portfolio> _portfolios;
        private readonly IMongoCollection<Transaction> _transactions;

        public TradeController(MongoService mongoService)
        {
            _users = mongoService.GetCollection<User>("users");
            _portfolios = mongoService.GetCollection<Portfolio>("portfolios");
            _transactions = mongoService.GetCollection<Transaction>("transactions");
        }

        private string UserId => User.FindFirstValue("id") ?? "";

        // POST /api/v1/trade/buy
        [HttpPost("buy")]
        public async Task<IActionResult> BuyStock([FromBody] TradeRequest request)
        {
            var symbol = request.Symbol.ToUpper().Trim();
            var totalCost = request.Quantity * request.Price;

            var user = await _users.Find(u => u.Id == UserId).FirstOrDefaultAsync();
            if (user == null)
            {
                return StatusCode(404, new ApiErrorResponse(404, "User not found"));
            }

            if (user.Balance < totalCost)
            {
                return StatusCode(400, new ApiErrorResponse(400, $"Insufficient balance. You have ${user.Balance:F2} but need ${totalCost:F2}"));
            }

            // Deduct balance
            user.Balance -= totalCost;
            await _users.ReplaceOneAsync(u => u.Id == user.Id, user);

            // Update or create portfolio entry
            var portfolio = await _portfolios.Find(p => p.User == UserId && p.Symbol == symbol).FirstOrDefaultAsync();

            if (portfolio != null)
            {
                var newTotalInvested = portfolio.TotalInvested + totalCost;
                var newQuantity = portfolio.Quantity + request.Quantity;
                portfolio.AvgBuyPrice = newTotalInvested / newQuantity;
                portfolio.Quantity = newQuantity;
                portfolio.TotalInvested = newTotalInvested;
                portfolio.UpdatedAt = DateTime.UtcNow;
                await _portfolios.ReplaceOneAsync(p => p.Id == portfolio.Id, portfolio);
            }
            else
            {
                portfolio = new Portfolio
                {
                    User = UserId,
                    Symbol = symbol,
                    Quantity = request.Quantity,
                    AvgBuyPrice = request.Price,
                    TotalInvested = totalCost
                };
                await _portfolios.InsertOneAsync(portfolio);
            }

            // Record transaction
            var transaction = new Transaction
            {
                User = UserId,
                Symbol = symbol,
                Type = "buy",
                Quantity = request.Quantity,
                Price = request.Price,
                Total = totalCost,
                BalanceAfter = user.Balance
            };
            await _transactions.InsertOneAsync(transaction);

            return Ok(new ApiResponse<object>(200, new
            {
                transaction,
                portfolio,
                balance = user.Balance
            }, $"Successfully bought {request.Quantity} share(s) of {symbol}"));
        }

        // POST /api/v1/trade/sell
        [HttpPost("sell")]
        public async Task<IActionResult> SellStock([FromBody] TradeRequest request)
        {
            var symbol = request.Symbol.ToUpper().Trim();

            var portfolio = await _portfolios.Find(p => p.User == UserId && p.Symbol == symbol).FirstOrDefaultAsync();

            if (portfolio == null || portfolio.Quantity == 0)
            {
                return StatusCode(400, new ApiErrorResponse(400, $"You don't own any shares of {symbol}"));
            }

            if (portfolio.Quantity < request.Quantity)
            {
                return StatusCode(400, new ApiErrorResponse(400, $"Insufficient shares. You own {portfolio.Quantity} share(s) of {symbol} but tried to sell {request.Quantity}"));
            }

            var totalRevenue = request.Quantity * request.Price;

            var user = await _users.Find(u => u.Id == UserId).FirstOrDefaultAsync();
            if (user == null)
            {
                return StatusCode(404, new ApiErrorResponse(404, "User not found"));
            }

            // Credit balance
            user.Balance += totalRevenue;
            await _users.ReplaceOneAsync(u => u.Id == user.Id, user);

            // Update portfolio
            portfolio.Quantity -= request.Quantity;
            portfolio.TotalInvested -= request.Quantity * portfolio.AvgBuyPrice;

            if (portfolio.Quantity == 0)
            {
                portfolio.AvgBuyPrice = 0;
                portfolio.TotalInvested = 0;
            }

            portfolio.UpdatedAt = DateTime.UtcNow;
            await _portfolios.ReplaceOneAsync(p => p.Id == portfolio.Id, portfolio);

            // Record transaction
            var transaction = new Transaction
            {
                User = UserId,
                Symbol = symbol,
                Type = "sell",
                Quantity = request.Quantity,
                Price = request.Price,
                Total = totalRevenue,
                BalanceAfter = user.Balance
            };
            await _transactions.InsertOneAsync(transaction);

            return Ok(new ApiResponse<object>(200, new
            {
                transaction,
                portfolio,
                balance = user.Balance
            }, $"Successfully sold {request.Quantity} share(s) of {symbol}"));
        }

        // GET /api/v1/trade/portfolio
        [HttpGet("portfolio")]
        public async Task<IActionResult> GetPortfolio()
        {
            var holdings = await _portfolios.Find(p => p.User == UserId && p.Quantity > 0)
                                            .SortByDescending(p => p.UpdatedAt)
                                            .ToListAsync();

            return Ok(new ApiResponse<List<Portfolio>>(200, holdings, "Portfolio fetched successfully"));
        }

        // GET /api/v1/trade/portfolio/:symbol
        [HttpGet("portfolio/{symbol}")]
        public async Task<IActionResult> GetHolding(string symbol)
        {
            var holding = await _portfolios.Find(p => p.User == UserId && p.Symbol == symbol.ToUpper().Trim()).FirstOrDefaultAsync();

            var result = holding ?? new Portfolio { Quantity = 0, AvgBuyPrice = 0, TotalInvested = 0 };

            return Ok(new ApiResponse<Portfolio>(200, result, "Holding fetched successfully"));
        }

        // GET /api/v1/trade/transactions
        [HttpGet("transactions")]
        public async Task<IActionResult> GetTransactions()
        {
            var transactions = await _transactions.Find(t => t.User == UserId)
                                                  .SortByDescending(t => t.CreatedAt)
                                                  .ToListAsync();

            return Ok(new ApiResponse<List<Transaction>>(200, transactions, "Transactions fetched successfully"));
        }
    }
}
