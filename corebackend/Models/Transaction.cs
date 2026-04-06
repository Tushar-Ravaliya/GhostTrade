using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace corebackend.Models
{
    public class Transaction
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("user")]
        [BsonRepresentation(BsonType.ObjectId)]
        public string User { get; set; } = null!;

        [BsonElement("symbol")]
        public string Symbol { get; set; } = null!;

        [BsonElement("type")]
        public string Type { get; set; } = null!;  // "buy" or "sell"

        [BsonElement("quantity")]
        public int Quantity { get; set; }

        [BsonElement("price")]
        public double Price { get; set; }

        [BsonElement("total")]
        public double Total { get; set; }

        [BsonElement("balanceAfter")]
        public double BalanceAfter { get; set; }

        [BsonElement("createdAt")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [BsonElement("updatedAt")]
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        [BsonElement("__v")]
        public int? Version { get; set; } = 0;
    }
}
