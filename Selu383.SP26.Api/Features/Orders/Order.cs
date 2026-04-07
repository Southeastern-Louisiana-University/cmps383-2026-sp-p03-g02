using System.ComponentModel.DataAnnotations.Schema;
using Selu383.SP26.Api.Features.Auth;

namespace Selu383.SP26.Api.Features.Locations;

public class Order  // Todo: fix user association 
{
	public int Id { get; set; }
	public int UserId { get; set; }
	public int ItemId { get; set; }
	public int LocationId { get; set; }
	public int TableId { get; set; }
	public float Total { get; set; }

	public DateTime CreatedAt { get; set; } = DateTime.Now;
}
