using Microsoft.EntityFrameworkCore;
using Profile = ContosoTraders.Api.Core.Models.Implementations.Dao.Profile;

namespace ContosoTraders.Api.Core.Repositories;

public class ProfilesDbContext : DbContext
{
    public ProfilesDbContext()
    {
    }

    public ProfilesDbContext(DbContextOptions<ProfilesDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Profile> Profiles { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Profile>(entity =>
        {
            entity.HasKey(e => e.Email);

            entity.Property(e => e.Email).HasMaxLength(50);

            entity.Property(e => e.Address).HasMaxLength(256);

            entity.Property(e => e.ImageNameLarge)
                .HasMaxLength(256)
                .IsFixedLength();

            entity.Property(e => e.ImageNameSmall).HasMaxLength(256);

            entity.Property(e => e.Name).HasMaxLength(50);

            entity.Property(e => e.PhoneNumber).HasMaxLength(100);
        });
    }
}