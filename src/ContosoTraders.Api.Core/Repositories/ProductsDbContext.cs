using Microsoft.EntityFrameworkCore;
using Type = ContosoTraders.Api.Core.Models.Implementations.Dao.Type;

namespace ContosoTraders.Api.Core.Repositories;

public class ProductsDbContext : DbContext
{
    public ProductsDbContext()
    {
    }

    public ProductsDbContext(DbContextOptions<ProductsDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Brand> Brands { get; set; }
    public virtual DbSet<Feature> Features { get; set; }
    public virtual DbSet<Product> Products { get; set; }
    public virtual DbSet<Tag> Tags { get; set; }
    public virtual DbSet<Type> Types { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Brand>(entity =>
        {
            entity.Property(e => e.Id).ValueGeneratedNever();

            entity.Property(e => e.Name).HasMaxLength(255);
        });

        modelBuilder.Entity<Feature>(entity =>
        {
            entity.Property(e => e.Id).ValueGeneratedNever();

            entity.Property(e => e.Title).HasMaxLength(255);
        });

        modelBuilder.Entity<Product>(entity =>
        {
            entity.Property(e => e.Id).ValueGeneratedNever();

            entity.Property(e => e.ImageName).HasMaxLength(255);

            entity.Property(e => e.Name).HasMaxLength(255);

            entity.Property(e => e.Price).HasColumnType("decimal(9, 2)");
        });

        modelBuilder.Entity<Tag>(entity =>
        {
            entity.Property(e => e.Id).ValueGeneratedNever();

            entity.Property(e => e.Value).HasMaxLength(255);
        });

        modelBuilder.Entity<Type>(entity =>
        {
            entity.Property(e => e.Id).ValueGeneratedNever();

            entity.Property(e => e.Code).HasMaxLength(255);

            entity.Property(e => e.Name).HasMaxLength(255);
        });
    }
}