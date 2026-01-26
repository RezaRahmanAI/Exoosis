namespace Exoosis.Domain.Entities;

public class User : BaseEntity
{
    public string FullName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string? Username { get; set; }
    public string PasswordHash { get; set; } = string.Empty;
    public string Role { get; set; } = "User";
    public string? PhoneNumber { get; set; }
    public string? ProfilePhotoUrl { get; set; }
    public string? AddressStreet { get; set; }
    public string? AddressCity { get; set; }
    public string? AddressState { get; set; }
    public string? AddressPostalCode { get; set; }
    public string? AddressCountry { get; set; }
    public DateTime? DateOfBirth { get; set; }
    public string? Gender { get; set; }
    public DateTime? LastLoginAt { get; set; }
    public bool EmailVerified { get; set; }
    public string? ResetToken { get; set; }
    public DateTime? ResetTokenExpiresAt { get; set; }
}
