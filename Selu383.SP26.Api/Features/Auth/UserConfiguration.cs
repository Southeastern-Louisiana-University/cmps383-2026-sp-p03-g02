using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Selu383.SP26.Api.Features.Auth;

public class UserConfiguration : IEntityTypeConfiguration<User>
{
	public void Configure(EntityTypeBuilder<User> builder)
	{
		builder
			.HasMany(e => e.Orders)
			.WithOne(e => e.User)
			.HasForeignKey(e => e.UserId)
			.IsRequired();
	}
}
