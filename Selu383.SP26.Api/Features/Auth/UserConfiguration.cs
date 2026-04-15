using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Selu383.SP26.Api.Features.Orders;

namespace Selu383.SP26.Api.Features.Auth;

public class UserConfiguration : IEntityTypeConfiguration<User>
{
	public void Configure(EntityTypeBuilder<User> builder)
	{
		builder
			.HasMany(x => x.Orders)
			.WithOne()
			.HasForeignKey(o => o.UserId)
			.IsRequired()
			.OnDelete(DeleteBehavior.Cascade);
	}
}
