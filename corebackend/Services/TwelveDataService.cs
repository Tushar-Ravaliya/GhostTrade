using System.Text.Json;
using System.Text.Json.Nodes;

namespace corebackend.Services
{
    public class TwelveDataService
    {
        private readonly HttpClient _httpClient;
        private readonly string _apiKey;
        private const string Watchlist = "TSLA,NVDA,MSFT,AMZN,META,GOOGL";

        public TwelveDataService(HttpClient httpClient, IConfiguration config)
        {
            _httpClient = httpClient;
            _httpClient.BaseAddress = new Uri("https://api.twelvedata.com");
            _apiKey = config["TwelveData:ApiKey"] ?? throw new InvalidOperationException("TwelveData API Key is missing");
        }

        public async Task<object> GetTimeSeriesAsync(string symbol, string interval = "1day", int outputsize = 30)
        {
            var url = $"/time_series?symbol={symbol}&interval={interval}&outputsize={outputsize}&apikey={_apiKey}";
            return await FetchDataAsync(url);
        }

        public async Task<object> GetMarketMoversAsync()
        {
            var url = $"/quote?symbol={Watchlist}&apikey={_apiKey}";
            var data = await FetchDataAsync(url) as JsonObject;
            
            if (data == null) return new { gainers = Array.Empty<object>(), losers = Array.Empty<object>() };

            var stocks = new List<JsonObject>();
            foreach (var kvp in data)
            {
                if (kvp.Value is JsonObject stockObj)
                {
                    stocks.Add(stockObj);
                }
            }

            var sortedStocks = stocks.OrderByDescending(s => 
            {
                if (s.TryGetPropertyValue("percent_change", out var percentChangeNode))
                {
                    if (decimal.TryParse(percentChangeNode?.ToString(), out decimal percentChange))
                        return percentChange;
                }
                return 0m;
            }).ToList();

            var gainers = sortedStocks.Take(3).ToList();
            var losers = sortedStocks.TakeLast(3).Reverse().ToList();

            return new { gainers, losers };
        }

        public async Task<object> GetStockQuoteAsync(string symbol)
        {
            var url = $"/quote?symbol={symbol}&apikey={_apiKey}";
            return await FetchDataAsync(url);
        }

        public async Task<object> SearchSymbolAsync(string query)
        {
            var url = $"/symbol_search?symbol={query}&outputsize=10&apikey={_apiKey}";
            return await FetchDataAsync(url);
        }

        public async Task<object> GetStockLogoAsync(string symbol)
        {
            var url = $"/logo?symbol={symbol}&apikey={_apiKey}";
            return await FetchDataAsync(url);
        }

        private async Task<object> FetchDataAsync(string url)
        {
            var response = await _httpClient.GetAsync(url);
            response.EnsureSuccessStatusCode();
            
            var contentString = await response.Content.ReadAsStringAsync();
            var jsonNode = JsonNode.Parse(contentString);

            if (jsonNode is JsonObject jsonObj && jsonObj.TryGetPropertyValue("status", out var statusNode))
            {
                if (statusNode?.ToString() == "error")
                {
                    var message = jsonObj["message"]?.ToString() ?? "TwelveData API error";
                    throw new Exception(message);
                }
            }

            return jsonNode!;
        }
    }
}
