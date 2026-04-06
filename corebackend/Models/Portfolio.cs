using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace corebackend.Models
{
    public class Portfolio
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("user")]
        [BsonRepresentation(BsonType.ObjectId)]
        public string User { get; set; } = null!;

        [BsonElement("symbol")]
        public string Symbol { get; set; } = null!;

        [BsonElement("quantity")]
        public int Quantity { get; set; } = 0;

        [BsonElement("avgBuyPrice")]
        public double AvgBuyPrice { get; set; } = 0;

        [BsonElement("totalInvested")]
        public double TotalInvested { get; set; } = 0;

        [BsonElement("createdAt")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [BsonElement("updatedAt")]
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        [BsonElement("__v")]
        public int? Version { get; set; } = 0;
    }
}
