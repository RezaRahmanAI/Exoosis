using Exoosis.Application.Responses;
using Exoosis.Domain.Entities;
using Exoosis.Infrastructure.Persistence;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Exoosis.Api.Controllers;

[ApiController]
[Route("api/respected-clients")]
public class RespectedClientsController : ControllerBase
{
    private readonly ExoosisDbContext _context;

    public RespectedClientsController(ExoosisDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<ApiResponse<List<RespectedClient>>>> GetAll([FromQuery] bool includeInactive = false, CancellationToken cancellationToken = default)
    {
        var query = _context.RespectedClients.AsQueryable();
        if (!includeInactive)
        {
            query = query.Where(client => client.IsActive);
        }

        var clients = await query
            .OrderBy(client => client.CreatedAt)
            .ToListAsync(cancellationToken);

        if (!clients.Any())
        {
            clients = new List<RespectedClient>
            {
                new RespectedClient
                {
                    Name = "Pubali Bank",
                    LogoUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuDjwsIA0cEQU4-BnWhf7KCg0B92gAneQjMhOvvFplkDN85Sx5n_vZNUUrA4u-PyE6iO88T04KpbJf44_DeEtn08ru3O_QnyDbp59wg-YfeTtkpODsKzS2W361f6zWHNXF2L0JkrIEoLBdBBgXAW-fAr1VRnzJVb1YDAJKFFWD7K6jRROZs93qcq1KFZMglwTUCZx8Tz6qDDhWMCr48TwUaqidSdwEBaGK8tqM7s62AyE2-EMCjyb4Zc6BOQySv86JjRCwKOfv11oQVk",
                    IsActive = true
                },
                new RespectedClient
                {
                    Name = "NCC Bank",
                    LogoUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuBKHxOUKPcz7zkxPVwKYpv6au1nTVeUc97cUsafJnl59rd8AL0Lj8rLKseP1NsxOWwPLN0s9xcataahJDBCuJmzwPQP7XGy4127_kXsg27mF5UwsWcHQls6L-qI2TfFTaMq1kB4CDpP2ZNLEIwZ-hXTvBnwwPizfKKbXs7B-nupizYqEsX1AWqkHxd6ReYFKd9rBidiyMtB_Q60qHq-SmakP1n8ZCRSGpDa2AOuvn4xvrOzVDXE7pfxpZ6OhC-mBa0ni161zO25jAWC",
                    IsActive = true
                },
                new RespectedClient
                {
                    Name = "Incepta Pharma",
                    LogoUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuD8qDG66edMBzTaLSYAvHpK2dp1ZVMiLGINwEe1D-BRkJyIFQb3-s3FtarZ_Doq2sdjM3CzSPP0KRcK4yKZ_-o_ZC8i0yMyWFcfXSgBBPgLxJTMgjpq1PAcEwyNP8GLjHK7uHnHey1OJKhyjO--BBclGR6B_beysFNjSyvZsa8LgChGufY_uOdms6iMNOz61mPEJGRbwNsMKyv-GVMD8AuUNc_fTD6fqeLclyhYg-YXh0pwvZ3Jmlyaqiswhh6J3LMWVVzka9lidDu9",
                    IsActive = true
                },
                new RespectedClient
                {
                    Name = "Pacific Pharma",
                    LogoUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuA0nZ87eSEivNfEdOWYkAxMxHF6-jgBoRWRZJKUuR-yu-NkO9Obx4GPBSimwzTDiTDDlcPRCZP-qh4fwHSqHAkMhxJI9JlvsozN0yzJsANd9O2oZCAtHINEbaSQl5z59V97tn7qWPuJN9Xg1n1n92Ss2wYlgvoh1P-c3L7R3d_JkOgLoAM7YPzjbCVN2J3q54HfqBSJ975Yp2cJGCliDwayw-MD75-qPmmtwxxk4GMfR8vn3_I9LDVSbR55t9I7TIFSFmk_3atJcuhq",
                    IsActive = true
                },
                new RespectedClient
                {
                    Name = "Bangladesh Eye Hospital",
                    LogoUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuAZIkU8BlCJEySHIdv-thMIr145UO65KrHQKxILx_V11t5vNz2iWwA9pMZwuoFLy7k-2vzgPYpBJ2Kxq-mifx09lmOznRrRDLoxcxFriuATrTetvNhX4P1yGAW3iPjFUeW_TMxXYleTkyiGfZ87wzdKF-Yvdt28PgSFSsHRZEbAeW46v7tZGN3Suh2emvkRQuUMcw1POfWOZ3TuyvRNeopYp4xPTpJtbPGDcL9b89a-ek3bCz52R8Z78VCZNBRy6WoDANtXR8vvpUoo",
                    IsActive = true
                },
                new RespectedClient
                {
                    Name = "Padma Bank",
                    LogoUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuBJ5XbVKhHMwf_XcCCzWfyaE7ESOIAMbvDy0x1p87scQYbSbLzS8ycMuEAnZebH2pTvCyZHkfTJnIq9U5tlPB29miwfGRBAq2naLob2sd8Ecfc_oMrcA2rfcsPjzaRnVpuHjdP9hDUpNLt--YwHbveeU4PpErSBdEDKr4bl-hL8kJ2HqOs31exmMnjv7PuIz-kZTUdXRjFwf5mdOwyI1vqO7RHWZRX2br86EJvR6kMS_rjlZ7X84rUnM6MW6gZNRgyXIJAAfQbcBLVt",
                    IsActive = true
                },
                new RespectedClient
                {
                    Name = "Bangladesh Police",
                    LogoUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuAt8SCYniong0KnxDtNACA_ohHxtLEcSZ09l_y8rGVVqdDfSfBCaj6BmOgMZgKvGGmkhZ7z3iqMint8lv4hMhMY21fOG9BqreGhqknsrCJeqiH7Ef7kcV0nMH6Zsr2_2yD01774uyCDYPAhU9e7oofEw8lfsedHRroSt9WnQTwm9VcKXb1y4uw8duGAKBx9nmIFW0nUc4Irq5bS9vJKYV1bbQk9ShLlrHFXzdXCurIIrv8I8IyBxNYfwniX0EtDvuAjhxfnJo2N0kTY",
                    IsActive = true
                }
            };

            _context.RespectedClients.AddRange(clients);
            await _context.SaveChangesAsync(cancellationToken);
        }

        return Ok(ApiResponse<List<RespectedClient>>.Ok(clients));
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<ApiResponse<RespectedClient>>> GetById(Guid id, CancellationToken cancellationToken)
    {
        var client = await _context.RespectedClients.FindAsync(new object?[] { id }, cancellationToken);
        if (client == null || client.IsDeleted)
        {
            return NotFound(ApiResponse<RespectedClient>.Fail("Client not found."));
        }

        return Ok(ApiResponse<RespectedClient>.Ok(client));
    }

    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<ActionResult<ApiResponse<RespectedClient>>> Create([FromBody] RespectedClientRequest request, CancellationToken cancellationToken)
    {
        var client = new RespectedClient
        {
            Name = request.Name,
            LogoUrl = request.LogoUrl ?? string.Empty,
            IsActive = request.IsActive
        };

        _context.RespectedClients.Add(client);
        await _context.SaveChangesAsync(cancellationToken);

        return CreatedAtAction(nameof(GetById), new { id = client.Id }, ApiResponse<RespectedClient>.Ok(client, "Client created successfully"));
    }

    [Authorize(Roles = "Admin")]
    [HttpPut("{id:guid}")]
    public async Task<ActionResult<ApiResponse<RespectedClient>>> Update(Guid id, [FromBody] RespectedClientRequest request, CancellationToken cancellationToken)
    {
        var client = await _context.RespectedClients.FindAsync(new object?[] { id }, cancellationToken);
        if (client == null || client.IsDeleted)
        {
            return NotFound(ApiResponse<RespectedClient>.Fail("Client not found."));
        }

        client.Name = request.Name;
        client.LogoUrl = request.LogoUrl ?? string.Empty;
        client.IsActive = request.IsActive;
        client.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync(cancellationToken);

        return Ok(ApiResponse<RespectedClient>.Ok(client, "Client updated successfully"));
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete("{id:guid}")]
    public async Task<ActionResult<ApiResponse<string>>> Delete(Guid id, CancellationToken cancellationToken)
    {
        var client = await _context.RespectedClients.FindAsync(new object?[] { id }, cancellationToken);
        if (client == null || client.IsDeleted)
        {
            return NotFound(ApiResponse<string>.Fail("Client not found."));
        }

        client.IsDeleted = true;
        client.UpdatedAt = DateTime.UtcNow;
        await _context.SaveChangesAsync(cancellationToken);

        return Ok(ApiResponse<string>.Ok("Deleted", "Client removed successfully"));
    }

    public record RespectedClientRequest(string Name, string? LogoUrl, bool IsActive = true);
}
