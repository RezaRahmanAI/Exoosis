namespace Exoosis.Application.DTOs.Solutions;

public class UpdateSolutionRequest
{
    public string Name { get; set; } = string.Empty;
    public string? Summary { get; set; }
    public string? Description { get; set; }
    public string Category { get; set; } = string.Empty;
    public string? Icon { get; set; }
    public string? ImageUrl { get; set; }
    public bool IsFeatured { get; set; }
    public bool IsActive { get; set; } = true;
    public List<string> Brands { get; set; } = new();
    public List<string> Capabilities { get; set; } = new();
    public List<string> Industries { get; set; } = new();
    public List<string> Integrations { get; set; } = new();
    public List<string> Compliance { get; set; } = new();
    public List<string> Deployment { get; set; } = new();
    public List<SolutionSupportDto> Support { get; set; } = new();
    public List<SolutionMetricDto> Metrics { get; set; } = new();
}
