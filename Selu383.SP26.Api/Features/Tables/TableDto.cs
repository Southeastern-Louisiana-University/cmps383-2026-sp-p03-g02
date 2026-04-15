using System.ComponentModel.DataAnnotations;
using Selu383.SP26.Api.Features.Orders;

namespace Selu383.SP26.Api.Features.Tables;

public class TableDto
{
	public int Id { get; set; }
	[Required]
	public int LocationId { get; set; }

	public bool IsOccupied { get; set; } = false;
	public bool IsReserved { get; set; } = false;
	//public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
}
