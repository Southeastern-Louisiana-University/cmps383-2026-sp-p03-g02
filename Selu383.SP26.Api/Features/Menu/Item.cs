using Selu383.SP26.Api.Features.Auth;

namespace Selu383.SP26.Api.Features.Menu;

public class Item
{
	public int Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public string Type { get; set; } = string.Empty;

    public float Price { get; set; }

    public bool IsSeasonal { get; set; } = false;
	public virtual ICollection<ItemIngredient> ItemIngredient { get; set; } = new List<ItemIngredient>();
}
