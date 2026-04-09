using Microsoft.AspNetCore.Identity;
using Selu383.SP26.Api.Features.Auth;

namespace Selu383.SP26.Api.Features.Menu;

public class ItemIngredient 
{
	public int ItemId { get; set; }
	public int IngredientId { get; set; }
	public virtual Item? Item { get; set; }
	public virtual Ingredient? Ingredient { get; set; }
}
