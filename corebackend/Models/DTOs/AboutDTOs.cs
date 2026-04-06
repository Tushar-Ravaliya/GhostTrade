namespace corebackend.Models.DTOs
{
    public class UpdateAboutRequest
    {
        public string? HeroTitle { get; set; }
        public string? HeroSubtitle { get; set; }
        public List<Feature>? Features { get; set; }
    }
}
