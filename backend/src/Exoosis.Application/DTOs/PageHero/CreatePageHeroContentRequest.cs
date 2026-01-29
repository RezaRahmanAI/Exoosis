namespace Exoosis.Application.DTOs.PageHero;

public class CreatePageHeroContentRequest
{
    public string PageKey { get; set; } = string.Empty;
    public string Eyebrow { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string? Badge { get; set; }
    public string? BadgeIcon { get; set; }
    public bool IsActive { get; set; } = true;
}
