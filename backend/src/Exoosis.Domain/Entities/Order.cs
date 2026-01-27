using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Exoosis.Domain.Entities;

public class Order : BaseEntity
{
    [Required]
    public string UserId { get; set; } = string.Empty;

    [Required]
    [MaxLength(200)]
    public string CustomerName { get; set; } = string.Empty;

    [Required]
    [MaxLength(20)]
    public string CustomerPhone { get; set; } = string.Empty;

    [Required]
    [MaxLength(500)]
    public string CustomerAddress { get; set; } = string.Empty;

    [Column(TypeName = "decimal(18,2)")]
    public decimal TotalAmount { get; set; }

    [Required]
    [MaxLength(50)]
    public string Status { get; set; } = "Processing"; // Processing, Shipped, Delivered, Cancelled

    public DateTime OrderDate { get; set; } = DateTime.UtcNow;

    public List<OrderItem> OrderItems { get; set; } = new();
}
