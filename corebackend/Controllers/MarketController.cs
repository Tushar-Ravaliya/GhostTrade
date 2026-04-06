using Microsoft.AspNetCore.Mvc;
using corebackend.Services;
using System.Text.Json.Nodes;

namespace corebackend.Controllers
{
    [ApiController]
    [Route("api/v1/market")]
    public class MarketController : ControllerBase
    {
        private readonly TwelveDataService _marketService;

        public MarketController(TwelveDataService marketService)
        {
            _marketService = marketService;
        }

        // GET /api/v1/market/timeseries/:symbol
        [HttpGet("timeseries/{symbol}")]
        public async Task<IActionResult> GetTimeSeries(string symbol)
        {
            try
            {
                var data = await _marketService.GetTimeSeriesAsync(symbol);
                return Ok(data);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        // GET /api/v1/market/market-movers
        [HttpGet("market-movers")]
        public async Task<IActionResult> GetMarketMovers()
        {
            try
            {
                var data = await _marketService.GetMarketMoversAsync();
                return Ok(data);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        // GET /api/v1/market/quote/:symbol
        [HttpGet("quote/{symbol}")]
        public async Task<IActionResult> GetStockQuote(string symbol)
        {
            try
            {
                var data = await _marketService.GetStockQuoteAsync(symbol);
                return Ok(data);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        // GET /api/v1/market/search?q=AAPL
        [HttpGet("search")]
        public async Task<IActionResult> SearchSymbol([FromQuery] string q)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(q))
                {
                    return Ok(new { data = Array.Empty<object>() });
                }

                var data = await _marketService.SearchSymbolAsync(q.Trim());
                return Ok(data);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        // GET /api/v1/market/logo/:symbol
        [HttpGet("logo/{symbol}")]
        public async Task<IActionResult> GetStockLogo(string symbol)
        {
            try
            {
                var data = await _marketService.GetStockLogoAsync(symbol);
                
                string? url = null;
                if (data is JsonObject jsonObj)
                {
                    if (jsonObj.TryGetPropertyValue("logo", out var logoNode)) url = logoNode?.ToString();
                    else if (jsonObj.TryGetPropertyValue("url", out var urlNode)) url = urlNode?.ToString();
                }

                return Ok(new { symbol, url });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }
    }
}
