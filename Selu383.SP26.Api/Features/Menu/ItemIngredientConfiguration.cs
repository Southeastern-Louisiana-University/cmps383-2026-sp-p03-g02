using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Selu383.SP26.Api.Features.Menu;

public class ItemIngredientConfiguration : IEntityTypeConfiguration<ItemIngredient>
{
    public void Configure(EntityTypeBuilder<ItemIngredient> builder)
	{
		builder.HasKey(x => new { x.ItemId, x.IngredientId });

		builder
			.HasOne(x => x.Ingredient)
			.WithMany(x => x.ItemIngredient)
			.HasForeignKey(x => x.IngredientId);

		builder
			.HasOne(x => x.Item)
			.WithMany(x => x.ItemIngredient)
			.HasForeignKey(x => x.ItemId);
	}
}