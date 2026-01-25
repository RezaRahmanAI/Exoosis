using Exoosis.Application.Interfaces;
using Exoosis.Domain.Entities;
using Exoosis.Infrastructure.Persistence;

namespace Exoosis.Infrastructure.Repositories;

public class UnitOfWork : IUnitOfWork
{
    private readonly ExoosisDbContext _dbContext;

    public UnitOfWork(ExoosisDbContext dbContext)
    {
        _dbContext = dbContext;
        Categories = new EfRepository<Category>(dbContext);
        Brands = new EfRepository<Brand>(dbContext);
        Products = new EfRepository<Product>(dbContext);
    }

    public IRepository<Category> Categories { get; }
    public IRepository<Brand> Brands { get; }
    public IRepository<Product> Products { get; }

    public Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        return _dbContext.SaveChangesAsync(cancellationToken);
    }
}
