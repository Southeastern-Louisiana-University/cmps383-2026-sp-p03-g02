using System.ComponentModel.DataAnnotations;

namespace Selu383.SP26.Api.Features.Locations;

public class ReservationDto
{
	public int Id { get; set; }

	[Required]
	public int UserId { get; set; }
	[Required]
	public int TableId { get; set; }
	public DateTime Date { get; set; }
}
