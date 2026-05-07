using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Selu383.SP26.Api.Features.Orders;

namespace Selu383.SP26.Api.Features.Menu;

public class ItemConfiguration : IEntityTypeConfiguration<Item>
{
    public void Configure(EntityTypeBuilder<Item> builder)
    {
        builder.Property(x => x.Name)
            .IsRequired()
            .HasMaxLength(120);

		builder
			.HasMany(x => x.ItemIngredients)
			.WithOne()
			.HasForeignKey(i => i.ItemId)
			.IsRequired()
			.OnDelete(DeleteBehavior.Cascade);


		builder
			.HasMany(x => x.OrderItem)
			.WithOne()
			.HasForeignKey(oi => oi.ItemId)
			.IsRequired()
			.OnDelete(DeleteBehavior.Cascade);


		builder.Property(e => e.Price)
			.HasColumnType("decimal(18,2)")
			.HasPrecision(18, 2)
			.IsRequired();
	}
}