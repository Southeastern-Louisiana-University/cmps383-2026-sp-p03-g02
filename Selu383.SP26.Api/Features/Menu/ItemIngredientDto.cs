using Microsoft.AspNetCore.Identity;
using Selu383.SP26.Api.Features.Auth;

namespace Selu383.SP26.Api.Features.Menu;

public class ItemIngredientDto
{
	public int Id { get; set; }
	public int ItemId { get; set; }
	public int IngredientId { get; set; }
}
