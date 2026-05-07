using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Selu383.SP26.Api.Features.Locations;

public class LocationConfiguration : IEntityTypeConfiguration<Location>
{
    public void Configure(EntityTypeBuilder<Location> builder)
    {
        builder.Property(x => x.Name)
            .IsRequired()
            .HasMaxLength(120);

		builder
			.HasOne(x => x.Manager)
			.WithMany()
			.HasForeignKey(x => x.ManagerId)
			.IsRequired(false)
			.OnDelete(DeleteBehavior.SetNull);

	}
}