using System.ComponentModel.DataAnnotations;

namespace Selu383.SP26.Api.Features.Menu;

public class ItemDto
{
	public int Id { get; set; }

    [Required]
    [MaxLength(120)]
    public string Name { get; set; } = string.Empty;

    [Required]
    public string Type { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    [Required]
	public decimal Price { get; set; }

    public bool IsSeasonal { get; set; } = false;

    public string Image { get; set; } = string.Empty;
    //public virtual ICollection<ItemIngredient> ItemIngredients { get; set; } = new List<ItemIngredient>();
}
