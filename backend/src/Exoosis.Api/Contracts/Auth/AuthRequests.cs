namespace Exoosis.Api.Contracts.Auth;

public record LoginRequest(string Identifier, string Password, bool RememberMe);

public record SignupRequest(
    string FullName,
    string Email,
    string Password,
    string PhoneNumber,
    string? Street,
    string? City,
    string? State,
    string? PostalCode,
    string? Country);

public record ForgotPasswordRequest(string Email);

public record ResetPasswordRequest(string Token, string NewPassword);

public record AuthResponse(string Token, UserSummary User);

public record UserSummary(
    Guid Id,
    string FullName,
    string Email,
    string Role,
    string? PhoneNumber,
    string? ProfilePhotoUrl,
    string? AddressStreet,
    string? AddressCity,
    string? AddressState,
    string? AddressPostalCode,
    string? AddressCountry,
    DateTime? DateOfBirth,
    string? Gender,
    DateTime? LastLoginAt,
    bool EmailVerified);
