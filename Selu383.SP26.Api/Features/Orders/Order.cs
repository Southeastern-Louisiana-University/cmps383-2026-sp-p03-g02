using System.ComponentModel.DataAnnotations.Schema;
using Selu383.SP26.Api.Features.Menu;

namespace Selu383.SP26.Api.Features.Orders;

public class Order  // Todo: fix user association 
{
	public int Id { get; set; }
	public int UserId { get; set; }
	public int ItemId { get; set; }
	public int LocationId { get; set; }
	public int TableId { get; set; }
	public float Total { get; set; }

	public DateTime CreatedAt { get; set; } = DateTime.Now;
	public virtual ICollection<OrderItem> OrderItem { get; set; } = new List<OrderItem>();
}
