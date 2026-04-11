using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Selu383.SP26.Api.Features.Auth;

namespace Selu383.SP26.Api.Features.Orders;

public class OrderConfiguration : IEntityTypeConfiguration<Order>
{
	public void Configure(EntityTypeBuilder<Order> builder)
	{
		builder
			.HasMany(x => x.OrderItem)
			.WithOne()
			.HasForeignKey(oi => oi.OrderId)
			.IsRequired()
			.OnDelete(DeleteBehavior.Cascade);

		builder.Property(e => e.Total)
			.HasColumnType("decimal(18,2)")
			.HasPrecision(18, 2)
			.IsRequired();
	}
}