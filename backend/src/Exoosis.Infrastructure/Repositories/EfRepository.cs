using System.Linq.Expressions;
using Exoosis.Application.Interfaces;
using Exoosis.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Exoosis.Infrastructure.Repositories;

public class EfRepository<T> : IRepository<T> where T : class
{
    private readonly ExoosisDbContext _dbContext;

    public EfRepository(ExoosisDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<T?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        return await _dbContext.Set<T>().FindAsync([id], cancellationToken);
    }

    public async Task<IReadOnlyList<T>> ListAsync(Expression<Func<T, bool>>? predicate = null, CancellationToken cancellationToken = default)
    {
        IQueryable<T> query = _dbContext.Set<T>();
        if (predicate != null)
        {
            query = query.Where(predicate);
        }

        return await query.ToListAsync(cancellationToken);
    }

    public async Task AddAsync(T entity, CancellationToken cancellationToken = default)
    {
        await _dbContext.Set<T>().AddAsync(entity, cancellationToken);
    }

    public void Update(T entity)
    {
        _dbContext.Set<T>().Update(entity);
    }

    public void Remove(T entity)
    {
        _dbContext.Set<T>().Remove(entity);
    }

    public IQueryable<T> Query()
    {
        return _dbContext.Set<T>().AsQueryable();
    }
}
