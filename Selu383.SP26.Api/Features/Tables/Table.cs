using Selu383.SP26.Api.Features.Auth;

namespace Selu383.SP26.Api.Features.Tables;

public class Table
{
	public int Id { get; set; }
	public int LocationId { get; set; }

	public bool IsOccupied { get; set; } = false;
	public bool IsReserved { get; set; } = false;
}
