using System.ComponentModel.DataAnnotations.Schema;
using Selu383.SP26.Api.Features.Auth;
using Selu383.SP26.Api.Features.Tables;

namespace Selu383.SP26.Api.Features.Orders;

public class OrderDto
{
	public int Id { get; set; }

	public virtual required User User { get; set; }
	public int UserId { get; set; }

	public int LocationId { get; set; }

	public virtual required Table Table { get; set; }
	public int TableId { get; set; }

	public float Total { get; set; }

	[Column("created_at")]
	public DateTime CreatedAt { get; set; } = DateTime.Now;
	public virtual ICollection<OrderItem> OrderItem { get; set; } = new List<OrderItem>();
}
