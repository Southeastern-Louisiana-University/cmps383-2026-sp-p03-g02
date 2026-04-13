using Selu383.SP26.Api.Features.Auth;
using Selu383.SP26.Api.Features.Orders;

namespace Selu383.SP26.Api.Features.Menu;

public class Item
{
	public int Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public string Type { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public decimal Price { get; set; }

    public bool IsSeasonal { get; set; } = false;

    public string Image { get; set; } = string.Empty;
	public virtual ICollection<ItemIngredient> ItemIngredients { get; set; } = new List<ItemIngredient>();
}
