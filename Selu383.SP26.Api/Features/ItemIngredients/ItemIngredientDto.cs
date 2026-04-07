using System.ComponentModel.DataAnnotations;

namespace Selu383.SP26.Api.Features.Locations;

public class ItemIngredientDto
{
	[Required]
	public int ItemId { get; set; }
	[Required]
	public int IngredientId { get; set; }
}
