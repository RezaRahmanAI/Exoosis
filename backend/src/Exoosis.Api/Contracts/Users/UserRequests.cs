namespace Exoosis.Api.Contracts.Users;

public record UpdateProfileRequest(
    string FullName,
    string Email,
    string? PhoneNumber,
    string? ProfilePhotoUrl,
    string? Street,
    string? City,
    string? State,
    string? PostalCode,
    string? Country,
    DateTime? DateOfBirth,
    string? Gender);

public record ChangePasswordRequest(string CurrentPassword, string NewPassword);
