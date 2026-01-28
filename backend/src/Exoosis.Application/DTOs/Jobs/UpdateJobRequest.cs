namespace Exoosis.Application.DTOs.Jobs;

public class UpdateJobRequest
{
    public string Title { get; set; } = string.Empty;
    public string Location { get; set; } = string.Empty;
    public string Type { get; set; } = string.Empty;
    public string TypeIcon { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public string? Description { get; set; }
    public List<string> Responsibilities { get; set; } = new();
    public List<string> Requirements { get; set; } = new();
    public string? Team { get; set; }
    public string? Salary { get; set; }
    public string? DatePosted { get; set; }
    public bool IsActive { get; set; }
}
