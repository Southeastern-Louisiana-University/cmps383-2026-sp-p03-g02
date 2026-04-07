using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Selu383.SP26.Api.Features.Locations;

public class OrderDto
{
	public int Id { get; set; }
	public int UserId { get; set; }
	public int ItemId { get; set; }
	public int LocationId { get; set; }
	public int TableId { get; set; }
	public float Total { get; set; }

	[Column("created_at")]
	public DateTime CreatedAt { get; set; } = DateTime.Now;
}
