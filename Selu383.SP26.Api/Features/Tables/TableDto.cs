using System.ComponentModel.DataAnnotations;

namespace Selu383.SP26.Api.Features.Locations;

public class TableDto
{
	public int Id { get; set; }
	public int LocationId { get; set; }

	public bool IsOccupied { get; set; } = false;
	public bool IsReserved { get; set; } = false;
}
