using System.Net.Http.Headers;

namespace corebackend.Services
{
    public class ImageKitService
    {
        private readonly HttpClient _httpClient;
        private readonly string _privateKey;

        public ImageKitService(HttpClient httpClient, IConfiguration config)
        {
            _httpClient = httpClient;
            _httpClient.BaseAddress = new Uri("https://upload.imagekit.io");
            _privateKey = config["ImageKit:PrivateKey"] ?? throw new InvalidOperationException("ImageKit Private Key missing");
            
            var authValue = new AuthenticationHeaderValue("Basic", Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes($"{_privateKey}:")));
            _httpClient.DefaultRequestHeaders.Authorization = authValue;
        }

        public async Task<string> UploadImageAsync(byte[] fileBytes, string fileName, string folderName)
        {
            var fileContent = new ByteArrayContent(fileBytes);
            var content = new MultipartFormDataContent
            {
                { fileContent, "file", fileName },
                { new StringContent(fileName), "fileName" },
                { new StringContent(folderName), "folder" }
            };

            var response = await _httpClient.PostAsync("/api/v1/files/upload", content);
            response.EnsureSuccessStatusCode();

            var result = await response.Content.ReadFromJsonAsync<ImageKitUploadResponse>();
            return result?.Url ?? string.Empty;
        }

        private class ImageKitUploadResponse
        {
            public string? Url { get; set; }
        }
    }
}
