using Selu383.SP26.Api.Features.Menu;

namespace Selu383.SP26.Api.Features.Orders;

public class OrderItem
{
	public virtual required Order Order { get; set; }
	public int OrderId { get; set; }
	public virtual required Item Item { get; set; }
	public int ItemId { get; set; }

	public string Modifications { get; set; } = string.Empty;

}
