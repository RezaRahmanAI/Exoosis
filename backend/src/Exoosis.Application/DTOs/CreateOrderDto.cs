using System.ComponentModel.DataAnnotations;

namespace Exoosis.Application.DTOs;

public class CreateOrderDto
{
    [Required]
    public string CustomerName { get; set; } = string.Empty;

    [Required]
    public string CustomerPhone { get; set; } = string.Empty;

    [Required]
    public string CustomerAddress { get; set; } = string.Empty;

    public List<CreateOrderItemDto> Items { get; set; } = new();
}

public class CreateOrderItemDto
{
    public Guid ProductId { get; set; }
    public int Quantity { get; set; }
    public decimal Price { get; set; }
}
