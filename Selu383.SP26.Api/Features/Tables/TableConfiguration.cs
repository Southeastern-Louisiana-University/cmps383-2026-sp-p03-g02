using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Selu383.SP26.Api.Features.Tables;

public class TableConfiguration : IEntityTypeConfiguration<Table>
{
	public void Configure(EntityTypeBuilder<Table> builder)
	{
		builder
			.HasMany(e => e.Orders)
			.WithOne(e => e.Table)
			.HasForeignKey(e => e.TableId)
			.IsRequired();
	}
}
