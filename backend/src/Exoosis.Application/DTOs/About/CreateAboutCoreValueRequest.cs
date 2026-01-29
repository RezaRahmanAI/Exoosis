namespace Exoosis.Application.DTOs.About;

public class CreateAboutCoreValueRequest
{
    public string Title { get; set; } = string.Empty;
    public string Icon { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public bool IsActive { get; set; } = true;
}
