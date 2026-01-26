using System.Security.Claims;
using Exoosis.Api.Contracts.Auth;
using Exoosis.Api.Contracts.Users;
using Exoosis.Domain.Entities;
using Exoosis.Infrastructure.Persistence;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Exoosis.Api.Controllers;

[ApiController]
[Route("api/users")]
public class UsersController : ControllerBase
{
    private readonly ExoosisDbContext _dbContext;
    private readonly PasswordHasher<User> _passwordHasher;

    public UsersController(ExoosisDbContext dbContext)
    {
        _dbContext = dbContext;
        _passwordHasher = new PasswordHasher<User>();
    }

    [Authorize]
    [HttpGet("profile")]
    public async Task<ActionResult<UserSummary>> GetProfile(CancellationToken cancellationToken)
    {
        var user = await GetCurrentUserAsync(cancellationToken);
        if (user is null)
        {
            return Unauthorized();
        }

        return Ok(ToSummary(user));
    }

    [Authorize]
    [HttpPut("profile")]
    public async Task<ActionResult<UserSummary>> UpdateProfile(UpdateProfileRequest request, CancellationToken cancellationToken)
    {
        var user = await GetCurrentUserAsync(cancellationToken);
        if (user is null)
        {
            return Unauthorized();
        }

        user.FullName = request.FullName;
        user.Email = request.Email;
        user.PhoneNumber = request.PhoneNumber;
        user.ProfilePhotoUrl = request.ProfilePhotoUrl;
        user.AddressStreet = request.Street;
        user.AddressCity = request.City;
        user.AddressState = request.State;
        user.AddressPostalCode = request.PostalCode;
        user.AddressCountry = request.Country;
        user.DateOfBirth = request.DateOfBirth;
        user.Gender = request.Gender;
        user.UpdatedAt = DateTime.UtcNow;

        await _dbContext.SaveChangesAsync(cancellationToken);
        return Ok(ToSummary(user));
    }

    [Authorize]
    [HttpPut("change-password")]
    public async Task<IActionResult> ChangePassword(ChangePasswordRequest request, CancellationToken cancellationToken)
    {
        var user = await GetCurrentUserAsync(cancellationToken);
        if (user is null)
        {
            return Unauthorized();
        }

        var result = _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, request.CurrentPassword);
        if (result == PasswordVerificationResult.Failed)
        {
            return BadRequest("Current password is incorrect.");
        }

        user.PasswordHash = _passwordHasher.HashPassword(user, request.NewPassword);
        user.UpdatedAt = DateTime.UtcNow;
        await _dbContext.SaveChangesAsync(cancellationToken);
        return Ok();
    }

    [Authorize]
    [HttpPost("upload-photo")]
    public async Task<ActionResult<UserSummary>> UploadPhoto([FromBody] string photoUrl, CancellationToken cancellationToken)
    {
        var user = await GetCurrentUserAsync(cancellationToken);
        if (user is null)
        {
            return Unauthorized();
        }

        user.ProfilePhotoUrl = photoUrl;
        user.UpdatedAt = DateTime.UtcNow;
        await _dbContext.SaveChangesAsync(cancellationToken);

        return Ok(ToSummary(user));
    }

    private async Task<User?> GetCurrentUserAsync(CancellationToken cancellationToken)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!Guid.TryParse(userId, out var id))
        {
            return null;
        }

        return await _dbContext.Users.FirstOrDefaultAsync(u => u.Id == id, cancellationToken);
    }

    private static UserSummary ToSummary(User user)
    {
        return new UserSummary(
            user.Id,
            user.FullName,
            user.Email,
            user.Role,
            user.PhoneNumber,
            user.ProfilePhotoUrl,
            user.AddressStreet,
            user.AddressCity,
            user.AddressState,
            user.AddressPostalCode,
            user.AddressCountry,
            user.DateOfBirth,
            user.Gender,
            user.LastLoginAt,
            user.EmailVerified);
    }
}
