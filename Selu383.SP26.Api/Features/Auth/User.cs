using Microsoft.AspNetCore.Identity;
using Selu383.SP26.Api.Features.Orders;

namespace Selu383.SP26.Api.Features.Auth;

public class User : IdentityUser<int>
{
	public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
	public virtual ICollection<UserRole> UserRoles { get; set; } = new List<UserRole>();
}