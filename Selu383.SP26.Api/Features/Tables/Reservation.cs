using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Selu383.SP26.Api.Features.Auth;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Selu383.SP26.Api.Features.Tables;

public class Reservation
{
	public int Id { get; set; }
	public int UserId { get; set; }
	public int TableId { get; set; }
	public DateTime Date { get; set; }
}
