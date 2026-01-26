namespace Exoosis.Domain.Entities;

public class Solution : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string? Summary { get; set; }
    public string? Description { get; set; }
    public string Category { get; set; } = string.Empty;
    public string? Icon { get; set; }
    public string? ImageUrl { get; set; }
    public bool IsFeatured { get; set; }
    public List<string> Brands { get; set; } = new();
    public List<string> Capabilities { get; set; } = new();
    public List<string> Industries { get; set; } = new();
    public List<string> Integrations { get; set; } = new();
    public List<string> Compliance { get; set; } = new();
    public List<string> Deployment { get; set; } = new();
    public List<SolutionSupport> Support { get; set; } = new();
    public List<SolutionMetric> Metrics { get; set; } = new();
}

public class SolutionSupport
{
    public string Label { get; set; } = string.Empty;
    public string Detail { get; set; } = string.Empty;
}

public class SolutionMetric
{
    public string Label { get; set; } = string.Empty;
    public string Value { get; set; } = string.Empty;
}
