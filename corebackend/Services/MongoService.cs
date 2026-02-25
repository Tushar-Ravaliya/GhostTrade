using MongoDB.Driver;

namespace corebackend.Services
{
    public class MongoService
    {
        private readonly IMongoDatabase _database;

        public MongoService(IConfiguration config)
        {
            // Pulls connection details from appsettings.json
            var connectionString = config.GetSection("DatabaseSettings:ConnectionString").Value;
            var databaseName = config.GetSection("DatabaseSettings:DatabaseName").Value;

            var client = new MongoClient(connectionString);
            _database = client.GetDatabase(databaseName);
        }

        // Generic method to get any collection (Users, Markets, etc.)
        public IMongoCollection<T> GetCollection<T>(string name)
        {
            return _database.GetCollection<T>(name);
        }
    }

}