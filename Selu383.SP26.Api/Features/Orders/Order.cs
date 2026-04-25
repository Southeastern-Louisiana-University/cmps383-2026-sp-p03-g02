namespace Selu383.SP26.Api.Features.Orders;

public class Order
{
	public int Id { get; set; }
	public int UserId { get; set; }
	public int LocationId { get; set; }
	public int TableId { get; set; }
	public decimal Total { get; set; }
	public string PaymentMethod { get; set; } = string.Empty;
	public string status { get; set; } = string.Empty;
	public int[] Items { get; set; } = new int[] { }; //TEMPORARY

	public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
	public DateTime ReadyAt { get; set; } 
	public DateTime PickedUpAt { get; set; } 
	public virtual ICollection<OrderItem> OrderItem { get; set; } = new List<OrderItem>();
}
