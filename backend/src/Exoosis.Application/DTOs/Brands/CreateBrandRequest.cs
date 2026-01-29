using Exoosis.Domain.Enums;

namespace Exoosis.Application.DTOs.Brands;

public class CreateBrandRequest
{
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string? LogoUrl { get; set; }
    public bool IsActive { get; set; } = true;
    public BrandCategory Category { get; set; } = BrandCategory.ComputingHardware;
}
