using System.ComponentModel.DataAnnotations;

namespace corebackend.Models.DTOs
{
    public class TradeRequest
    {
        [Required(ErrorMessage = "Symbol is required")]
        public string Symbol { get; set; } = null!;

        [Required(ErrorMessage = "Quantity is required")]
        [Range(1, int.MaxValue, ErrorMessage = "Quantity must be at least 1")]
        public int Quantity { get; set; }

        [Required(ErrorMessage = "Price is required")]
        [Range(0.01, double.MaxValue, ErrorMessage = "Price must be greater than 0")]
        public double Price { get; set; }
    }
}
