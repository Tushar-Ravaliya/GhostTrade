namespace corebackend.Models.DTOs
{
    /// <summary>
    /// Matches the Node.js ApiResponse format:
    /// { statusCode, data, message, successCode }
    /// </summary>
    public class ApiResponse<T>
    {
        public int StatusCode { get; set; }
        public T? Data { get; set; }
        public string Message { get; set; }
        public bool SuccessCode { get; set; }

        public ApiResponse(int statusCode, T? data, string message = "success")
        {
            StatusCode = statusCode;
            Data = data;
            Message = message;
            SuccessCode = statusCode < 400;
        }
    }

    /// <summary>
    /// Matches the Node.js ApiError format:
    /// { statusCode, data: null, success: false, message, errors }
    /// </summary>
    public class ApiErrorResponse
    {
        public int StatusCode { get; set; }
        public object? Data { get; set; } = null;
        public bool Success { get; set; } = false;
        public string Message { get; set; }
        public object[] Errors { get; set; }

        public ApiErrorResponse(int statusCode, string message, object[]? errors = null)
        {
            StatusCode = statusCode;
            Message = message;
            Errors = errors ?? Array.Empty<object>();
        }
    }
}
