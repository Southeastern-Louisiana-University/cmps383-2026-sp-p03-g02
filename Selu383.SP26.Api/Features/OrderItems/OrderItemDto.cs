using System.ComponentModel.DataAnnotations;

namespace Selu383.SP26.Api.Features.Locations;

public class OrderItemDto
{
	[Required]
	public int ItemId { get; set; }
	[Required]
	public int OrderId { get; set; }
}
