using Selu383.SP26.Api.Features.Menu;

namespace Selu383.SP26.Api.Features.Orders;

public class OrderItem
{
	public int Id {  get; set; }
	public int OrderId { get; set; }
	public int ItemId { get; set; }

	public string Modifications { get; set; } = string.Empty;

}
