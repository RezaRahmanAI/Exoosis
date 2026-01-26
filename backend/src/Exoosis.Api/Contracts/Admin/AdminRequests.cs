namespace Exoosis.Api.Contracts.Admin;

public record AdminChangePasswordRequest(string CurrentPassword, string NewPassword);
