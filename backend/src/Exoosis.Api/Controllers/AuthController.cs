using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Exoosis.Api.Contracts.Auth;
using Exoosis.Domain.Entities;
using Exoosis.Infrastructure.Persistence;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace Exoosis.Api.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly ExoosisDbContext _dbContext;
    private readonly IConfiguration _configuration;
    private readonly PasswordHasher<User> _passwordHasher;

    public AuthController(ExoosisDbContext dbContext, IConfiguration configuration)
    {
        _dbContext = dbContext;
        _configuration = configuration;
        _passwordHasher = new PasswordHasher<User>();
    }

    [HttpPost("signup")]
    public async Task<ActionResult<AuthResponse>> Signup(SignupRequest request, CancellationToken cancellationToken)
    {
        var exists = await _dbContext.Users.AnyAsync(user => user.Email == request.Email, cancellationToken);
        if (exists)
        {
            return Conflict("Email already exists.");
        }

        var user = new User
        {
            FullName = request.FullName,
            Email = request.Email,
            PhoneNumber = request.PhoneNumber,
            AddressStreet = request.Street,
            AddressCity = request.City,
            AddressState = request.State,
            AddressPostalCode = request.PostalCode,
            AddressCountry = request.Country,
            Role = "User",
            EmailVerified = false
        };
        user.PasswordHash = _passwordHasher.HashPassword(user, request.Password);

        _dbContext.Users.Add(user);
        await _dbContext.SaveChangesAsync(cancellationToken);

        var token = GenerateToken(user);
        return Ok(new AuthResponse(token, ToSummary(user)));
    }

    [HttpPost("login")]
    public async Task<ActionResult<AuthResponse>> Login(LoginRequest request, CancellationToken cancellationToken)
    {
        var normalized = request.Identifier.Trim();
        var user = await _dbContext.Users
            .FirstOrDefaultAsync(u => u.Email == normalized || (u.Username != null && u.Username == normalized), cancellationToken);

        if (user is null)
        {
            return Unauthorized("Invalid credentials.");
        }

        var result = _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, request.Password);
        if (result == PasswordVerificationResult.Failed)
        {
            return Unauthorized("Invalid credentials.");
        }

        user.LastLoginAt = DateTime.UtcNow;
        await _dbContext.SaveChangesAsync(cancellationToken);

        var token = GenerateToken(user);
        return Ok(new AuthResponse(token, ToSummary(user)));
    }

    [Authorize]
    [HttpGet("me")]
    public async Task<ActionResult<UserSummary>> Me(CancellationToken cancellationToken)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!Guid.TryParse(userId, out var id))
        {
            return Unauthorized();
        }

        var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Id == id, cancellationToken);
        if (user is null)
        {
            return Unauthorized();
        }

        return Ok(ToSummary(user));
    }

    [HttpPost("forgot-password")]
    public async Task<IActionResult> ForgotPassword(ForgotPasswordRequest request, CancellationToken cancellationToken)
    {
        var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Email == request.Email, cancellationToken);
        if (user is null)
        {
            return NotFound("No account found for this email.");
        }

        user.ResetToken = Guid.NewGuid().ToString("N");
        user.ResetTokenExpiresAt = DateTime.UtcNow.AddHours(2);
        await _dbContext.SaveChangesAsync(cancellationToken);

        return Ok(new { message = "Password reset token generated.", token = user.ResetToken });
    }

    [HttpPost("reset-password")]
    public async Task<IActionResult> ResetPassword(ResetPasswordRequest request, CancellationToken cancellationToken)
    {
        var user = await _dbContext.Users
            .FirstOrDefaultAsync(u => u.ResetToken == request.Token, cancellationToken);

        if (user is null || user.ResetTokenExpiresAt is null || user.ResetTokenExpiresAt < DateTime.UtcNow)
        {
            return BadRequest("Invalid or expired reset token.");
        }

        user.PasswordHash = _passwordHasher.HashPassword(user, request.NewPassword);
        user.ResetToken = null;
        user.ResetTokenExpiresAt = null;
        user.UpdatedAt = DateTime.UtcNow;
        await _dbContext.SaveChangesAsync(cancellationToken);

        return Ok(new { message = "Password updated." });
    }

    [Authorize]
    [HttpPost("logout")]
    public IActionResult Logout()
    {
        return Ok();
    }

    private string GenerateToken(User user)
    {
        var key = _configuration["Jwt:Key"] ?? "development_key";
        var issuer = _configuration["Jwt:Issuer"] ?? "Exoosis";
        var audience = _configuration["Jwt:Audience"] ?? "Exoosis";
        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        var email = user.Email ?? string.Empty;
        var role = string.IsNullOrWhiteSpace(user.Role) ? "User" : user.Role;
        var displayName = user.FullName;
        if (string.IsNullOrWhiteSpace(displayName))
        {
            displayName = user.Username;
        }
        if (string.IsNullOrWhiteSpace(displayName))
        {
            displayName = email;
        }
        displayName ??= "User";

        var claims = new List<Claim>
        {
            new(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new(ClaimTypes.Email, email),
            new(ClaimTypes.Name, displayName),
            new(ClaimTypes.Role, role)
        };

        var token = new JwtSecurityToken(
            issuer: issuer,
            audience: audience,
            claims: claims,
            expires: DateTime.UtcNow.AddDays(7),
            signingCredentials: credentials);

        return new JwtSecurityTokenHandler().WriteToken(token);
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
