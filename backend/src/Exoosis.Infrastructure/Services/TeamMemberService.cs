using AutoMapper;
using Exoosis.Application.DTOs.TeamMembers;
using Exoosis.Application.Interfaces;
using Exoosis.Application.Services;
using Exoosis.Domain.Entities;

namespace Exoosis.Infrastructure.Services;

public class TeamMemberService : ITeamMemberService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public TeamMemberService(IUnitOfWork unitOfWork, IMapper mapper)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
    }

    public async Task<IReadOnlyList<TeamMemberDto>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        var teamMembers = await _unitOfWork.TeamMembers.ListAsync(cancellationToken: cancellationToken);
        return _mapper.Map<IReadOnlyList<TeamMemberDto>>(teamMembers);
    }

    public async Task<TeamMemberDto?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var member = await _unitOfWork.TeamMembers.GetByIdAsync(id, cancellationToken);
        return member == null ? null : _mapper.Map<TeamMemberDto>(member);
    }

    public async Task<TeamMemberDto> CreateAsync(CreateTeamMemberRequest request, string? userId, CancellationToken cancellationToken = default)
    {
        var member = _mapper.Map<TeamMember>(request);
        member.CreatedBy = userId;
        await _unitOfWork.TeamMembers.AddAsync(member, cancellationToken);
        await _unitOfWork.SaveChangesAsync(cancellationToken);
        return _mapper.Map<TeamMemberDto>(member);
    }

    public async Task<TeamMemberDto?> UpdateAsync(Guid id, UpdateTeamMemberRequest request, string? userId, CancellationToken cancellationToken = default)
    {
        var member = await _unitOfWork.TeamMembers.GetByIdAsync(id, cancellationToken);
        if (member == null)
        {
            return null;
        }

        _mapper.Map(request, member);
        member.UpdatedAt = DateTime.UtcNow;
        member.UpdatedBy = userId;
        _unitOfWork.TeamMembers.Update(member);
        await _unitOfWork.SaveChangesAsync(cancellationToken);
        return _mapper.Map<TeamMemberDto>(member);
    }

    public async Task<bool> DeleteAsync(Guid id, string? userId, CancellationToken cancellationToken = default)
    {
        var member = await _unitOfWork.TeamMembers.GetByIdAsync(id, cancellationToken);
        if (member == null)
        {
            return false;
        }

        member.IsDeleted = true;
        member.IsActive = false;
        member.UpdatedAt = DateTime.UtcNow;
        member.UpdatedBy = userId;
        _unitOfWork.TeamMembers.Update(member);
        await _unitOfWork.SaveChangesAsync(cancellationToken);
        return true;
    }
}
