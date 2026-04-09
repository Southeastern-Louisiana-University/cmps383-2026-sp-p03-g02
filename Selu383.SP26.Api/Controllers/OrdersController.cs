using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Selu383.SP26.Api.Data;
using Selu383.SP26.Api.Features.Auth;
using Selu383.SP26.Api.Features.Orders;

namespace Selu383.SP26.Api.Controllers;

[Route("api/Orders")]
[ApiController]
public class OrdersController(DataContext dataContext) : ControllerBase
{
	[HttpGet]
	public IQueryable<OrderDto> GetAll()
	{
		return dataContext.Set<Order>()
			.Select(x => new OrderDto
			{
				Id = x.Id,
				UserId = x.UserId,
				LocationId = x.LocationId,
				TableId = x.TableId,
				Total = x.Total,
			});
	}

	[HttpGet("{id}")]
	public ActionResult<OrderDto> GetById(int id)
	{
		var result = dataContext.Set<Order>()
			.FirstOrDefault(x => x.Id == id);

		if (result == null)
		{
			return NotFound();
		}

		return Ok(new OrderDto
		{
			Id = result.Id,
			UserId = result.UserId,
			LocationId = result.LocationId,
			TableId = result.TableId,
			Total = result.Total,
		});
	}

	[HttpPost]
	[Authorize(Roles = RoleNames.Admin)]
	public ActionResult<OrderDto> Create(OrderDto dto)
	{

		var Order = new Order
		{
			UserId = dto.UserId,
			LocationId = dto.LocationId,
			TableId = dto.TableId,
			Total = dto.Total,
		};

		dataContext.Set<Order>().Add(Order);
		dataContext.SaveChanges();

		dto.Id = Order.Id;

		return CreatedAtAction(nameof(GetById), new { id = dto.Id }, dto);
	}

	[HttpPut("{id}")]
	[Authorize]
	public ActionResult<OrderDto> Update(int id, OrderDto dto)
	{

		var Order = dataContext.Set<Order>()
			.FirstOrDefault(x => x.Id == id);

		if (Order == null)
		{
			return NotFound();
		}

		Order.UserId = dto.UserId;
		Order.LocationId = dto.LocationId;
		Order.TableId = dto.TableId;
		Order.Total = dto.Total;

		dataContext.SaveChanges();

		dto.Id = Order.Id;

		return Ok(dto);
	}

	[HttpDelete("{id}")]
	[Authorize]
	public ActionResult Delete(int id)
	{
		var Order = dataContext.Set<Order>()
			.FirstOrDefault(x => x.Id == id);

		if (Order == null)
		{
			return NotFound();
		}

		dataContext.Set<Order>().Remove(Order);
		dataContext.SaveChanges();

		return Ok();
	}
}
