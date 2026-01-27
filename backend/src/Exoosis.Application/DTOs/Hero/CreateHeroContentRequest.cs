namespace Exoosis.Application.DTOs.Hero;

public class CreateHeroContentRequest
{
    public string BadgeText { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string SubText { get; set; } = string.Empty;
    public string Image1Url { get; set; } = string.Empty;
    public string Image2Url { get; set; } = string.Empty;
    public string Image3Url { get; set; } = string.Empty;
    public bool IsActive { get; set; } = true;
}
