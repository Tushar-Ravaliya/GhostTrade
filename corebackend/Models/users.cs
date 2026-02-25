using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace corebackend.Models
{
    public class users
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? id { get; set; }

        public string name { get; set; } = null!;
        public string email { get; set; } = null!;
        public string password { get; set; } = null!;
        public string mobileNo { get; set; } = null!;
        public string status { get; set; } = null!;
        public int balance { get; set; }
        public string createdAt { get; set; } = null!;
        public string updatedAt { get; set; } = null!;
        [BsonElement("__v")] // This maps the C# property to the Mongo field
        public int? __v { get; set; }

    }
}
