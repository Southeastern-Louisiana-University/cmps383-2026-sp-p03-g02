using Selu383.SP26.Api.Features.Auth;

namespace Selu383.SP26.Api.Features.Locations;

public class Ingredient
{
	public int Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public string Type { get; set; } = string.Empty;

    public bool IsAllergen { get; set; } = false;
}
