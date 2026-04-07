using Microsoft.AspNetCore.Identity;
using Selu383.SP26.Api.Features.Auth;

namespace Selu383.SP26.Api.Features.Menu;

public class ItemIngredient 
{
	public virtual required Item Item { get; set; }
	public int ItemId { get; set; }
	public virtual required Ingredient Ingredient { get; set; }
	public int IngredientId { get; set; }

}
