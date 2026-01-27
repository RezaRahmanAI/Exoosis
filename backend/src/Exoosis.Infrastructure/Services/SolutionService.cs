using AutoMapper;
using Exoosis.Application.DTOs.Solutions;
using Exoosis.Application.Interfaces;
using Exoosis.Application.Services;
using Exoosis.Domain.Entities;

namespace Exoosis.Infrastructure.Services;

public class SolutionService : ISolutionService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public SolutionService(IUnitOfWork unitOfWork, IMapper mapper)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
    }

    public async Task<IReadOnlyList<SolutionDto>> GetAllAsync(string? industry, CancellationToken cancellationToken = default)
    {
        var solutions = await _unitOfWork.Solutions.ListAsync(cancellationToken: cancellationToken);
        // Industry filtering removed as Industries property no longer exists
        return _mapper.Map<IReadOnlyList<SolutionDto>>(solutions);
    }

    public async Task<IReadOnlyList<SolutionDto>> GetFeaturedAsync(CancellationToken cancellationToken = default)
    {
        var solutions = await _unitOfWork.Solutions.ListAsync(cancellationToken: cancellationToken);
        // IsFeatured property removed - returning all solutions
        return _mapper.Map<IReadOnlyList<SolutionDto>>(solutions);
    }

    public async Task<SolutionDto?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var solution = await _unitOfWork.Solutions.GetByIdAsync(id, cancellationToken);
        return solution == null ? null : _mapper.Map<SolutionDto>(solution);
    }

    public async Task<SolutionDto> CreateAsync(CreateSolutionRequest request, string? userId, CancellationToken cancellationToken = default)
    {
        var solution = _mapper.Map<Solution>(request);
        solution.CreatedBy = userId;
        await _unitOfWork.Solutions.AddAsync(solution, cancellationToken);
        await _unitOfWork.SaveChangesAsync(cancellationToken);
        return _mapper.Map<SolutionDto>(solution);
    }

    public async Task<SolutionDto?> UpdateAsync(Guid id, UpdateSolutionRequest request, string? userId, CancellationToken cancellationToken = default)
    {
        var solution = await _unitOfWork.Solutions.GetByIdAsync(id, cancellationToken);
        if (solution == null)
        {
            return null;
        }

        _mapper.Map(request, solution);
        solution.UpdatedAt = DateTime.UtcNow;
        solution.UpdatedBy = userId;
        _unitOfWork.Solutions.Update(solution);
        await _unitOfWork.SaveChangesAsync(cancellationToken);
        return _mapper.Map<SolutionDto>(solution);
    }

    public async Task<bool> DeleteAsync(Guid id, string? userId, CancellationToken cancellationToken = default)
    {
        var solution = await _unitOfWork.Solutions.GetByIdAsync(id, cancellationToken);
        if (solution == null)
        {
            return false;
        }

        solution.IsDeleted = true;
        solution.UpdatedAt = DateTime.UtcNow;
        solution.UpdatedBy = userId;
        _unitOfWork.Solutions.Update(solution);
        await _unitOfWork.SaveChangesAsync(cancellationToken);
        return true;
    }
}
