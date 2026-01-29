namespace Exoosis.Domain.Entities;

public class PageHeroContent : BaseEntity
{
    public string PageKey { get; set; } = string.Empty;
    public string Eyebrow { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string? Badge { get; set; }
    public string? BadgeIcon { get; set; }
}
