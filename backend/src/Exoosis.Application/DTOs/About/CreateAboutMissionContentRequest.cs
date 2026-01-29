namespace Exoosis.Application.DTOs.About;

public class CreateAboutMissionContentRequest
{
    public string Eyebrow { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Text1 { get; set; } = string.Empty;
    public string Text2 { get; set; } = string.Empty;
    public string Quote { get; set; } = string.Empty;
    public bool IsActive { get; set; } = true;
}
