namespace Exoosis.Domain.Entities;

public class Product : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public decimal Price { get; set; }
    public Guid CategoryId { get; set; }
    public Category? Category { get; set; }
    public Guid BrandId { get; set; }
    public Brand? Brand { get; set; }
    public int StockQuantity { get; set; }
    public string ImageUrls { get; set; } = string.Empty;
}
