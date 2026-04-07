using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Selu383.SP26.Api.Features.Orders;

public class OrderItemConfiguration : IEntityTypeConfiguration<OrderItem>
{
    public void Configure(EntityTypeBuilder<OrderItem> builder)
	{
		builder.HasKey(x => new { x.OrderId, x.ItemId });

		builder
			.HasOne(x => x.Order)
			.WithMany(x => x.OrderItem)
			.HasForeignKey(x => x.OrderId);
			
		builder
			.HasOne(x => x.Item)
			.WithMany(x => x.OrderItem)
			.HasForeignKey(x => x.ItemId);
		
	}
}