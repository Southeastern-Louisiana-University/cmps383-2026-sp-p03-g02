using Selu383.SP26.Api.Features.Orders;

namespace Selu383.SP26.Api.Features.Auth;

public class UserDto
{
	public int Id { get; set; }
	public string UserName { get; set; } = string.Empty;
	public string[] Roles { get; set; } = Array.Empty<string>();
	public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
}