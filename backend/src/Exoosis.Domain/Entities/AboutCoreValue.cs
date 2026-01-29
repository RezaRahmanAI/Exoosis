namespace Exoosis.Domain.Entities;

public class AboutCoreValue : BaseEntity
{
    public string Title { get; set; } = string.Empty;
    public string Icon { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
}
