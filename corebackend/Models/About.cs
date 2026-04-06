using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace corebackend.Models
{
    public class Feature
    {
        [BsonElement("title")]
        public string Title { get; set; } = null!;

        [BsonElement("description")]
        public string Description { get; set; } = null!;

        [BsonElement("badge")]
        public string Badge { get; set; } = null!;

        [BsonElement("icon")]
        public string Icon { get; set; } = null!;

        [BsonElement("order")]
        public int Order { get; set; } = 0;

        [BsonElement("_id")]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
    }

    public class About
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("heroTitle")]
        public string HeroTitle { get; set; } = null!;

        [BsonElement("heroSubtitle")]
        public string HeroSubtitle { get; set; } = null!;

        [BsonElement("features")]
        public List<Feature> Features { get; set; } = new();

        [BsonElement("createdAt")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [BsonElement("updatedAt")]
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        [BsonElement("__v")]
        public int? Version { get; set; } = 0;
    }
}
