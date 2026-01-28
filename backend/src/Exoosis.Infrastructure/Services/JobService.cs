using AutoMapper;
using Exoosis.Application.DTOs.Jobs;
using Exoosis.Application.Interfaces;
using Exoosis.Application.Services;
using Exoosis.Domain.Entities;

namespace Exoosis.Infrastructure.Services;

public class JobService : IJobService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public JobService(IUnitOfWork unitOfWork, IMapper mapper)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
    }

    public async Task<IReadOnlyList<JobDto>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        var jobs = await _unitOfWork.Jobs.ListAsync(cancellationToken: cancellationToken);
        return _mapper.Map<IReadOnlyList<JobDto>>(jobs);
    }

    public async Task<JobDto?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var job = await _unitOfWork.Jobs.GetByIdAsync(id, cancellationToken);
        return job == null ? null : _mapper.Map<JobDto>(job);
    }

    public async Task<JobDto> CreateAsync(CreateJobRequest request, string? userId, CancellationToken cancellationToken = default)
    {
        var job = _mapper.Map<Job>(request);
        job.CreatedBy = userId;
        await _unitOfWork.Jobs.AddAsync(job, cancellationToken);
        await _unitOfWork.SaveChangesAsync(cancellationToken);
        return _mapper.Map<JobDto>(job);
    }

    public async Task<JobDto?> UpdateAsync(Guid id, UpdateJobRequest request, string? userId, CancellationToken cancellationToken = default)
    {
        var job = await _unitOfWork.Jobs.GetByIdAsync(id, cancellationToken);
        if (job == null)
        {
            return null;
        }

        _mapper.Map(request, job);
        job.UpdatedAt = DateTime.UtcNow;
        job.UpdatedBy = userId;
        _unitOfWork.Jobs.Update(job);
        await _unitOfWork.SaveChangesAsync(cancellationToken);
        return _mapper.Map<JobDto>(job);
    }

    public async Task<bool> DeleteAsync(Guid id, string? userId, CancellationToken cancellationToken = default)
    {
        var job = await _unitOfWork.Jobs.GetByIdAsync(id, cancellationToken);
        if (job == null)
        {
            return false;
        }

        job.IsDeleted = true;
        job.IsActive = false;
        job.UpdatedAt = DateTime.UtcNow;
        job.UpdatedBy = userId;
        _unitOfWork.Jobs.Update(job);
        await _unitOfWork.SaveChangesAsync(cancellationToken);
        return true;
    }
}
