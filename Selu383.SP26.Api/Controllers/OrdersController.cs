using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Selu383.SP26.Api.Data;
using Selu383.SP26.Api.Extensions;
using Selu383.SP26.Api.Features.Auth;
using Selu383.SP26.Api.Features.Menu;
using Selu383.SP26.Api.Features.Tables;
using Selu383.SP26.Api.Features.Orders;
using Selu383.SP26.Api.Migrations;
using Selu383.SP26.Api.Features.Locations;

namespace Selu383.SP26.Api.Controllers;

[Route("api/Orders")]
[ApiController]
public class OrdersController(DataContext dataContext) : ControllerBase
{
	[HttpGet]
	public IQueryable<OrderDto> GetAll()
	{

		return dataContext.Set<Order>()
			.Include(x => x.OrderItem)
			.OrderByDescending(x => x.CreatedAt)
			.Select(x => new OrderDto
			{
				Id = x.Id,
				UserId = x.UserId,
				UserName = x.UserName,
				LocationId = x.LocationId,
				TableId = x.TableId,
				Total = x.Total,
				Items = x.Items,
				CreatedAt = x.CreatedAt,
				OrderItem = x.OrderItem
			});
	}

	[HttpGet("mine")]
	public IQueryable<OrderDto> GetAllForUser()
	{
		var userId = User.GetCurrentUserId();

		return dataContext.Set<Order>()
			.Include(x => x.OrderItem)
			.Where(x => x.UserId == userId)
			.OrderByDescending(x => x.CreatedAt)
			.Select(x => new OrderDto
			{
				Id = x.Id,
				UserId = x.UserId,
				UserName = x.UserName,
				LocationId = x.LocationId,
				TableId = x.TableId,
				Total = x.Total,
				Items = x.Items,
				CreatedAt = x.CreatedAt,
				OrderItem = x.OrderItem
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
			UserName = result.UserName,
			LocationId = result.LocationId,
			TableId = result.TableId,
			Total = result.Total,
			Items = result.Items,
		});
	}

	[HttpPost]
	[Authorize]
	public ActionResult<OrderDto> Create(OrderDto dto)
	{
		var userId = User.GetCurrentUserId();

		if (userId == null)
		{
			return Unauthorized();
		}

		var orderItems = new List<OrderItem>();
		decimal total = 0;

		var Items = dataContext.Set<Item>();

		foreach (var itemDto in dto.OrderItem)
		{
			var item = Items.FirstOrDefault(x => x.Id == itemDto.ItemId);

			if (item == null)
			{
				return BadRequest("Invalid Item");
			}

			total += item.Price;

			orderItems.Add(new OrderItem
			{
				Id = itemDto.Id,
				ItemId = itemDto.ItemId,
				ItemName = item.Name,
				Modifications = itemDto.Modifications
			});
		}


		var table = dataContext.Set<Table>().FirstOrDefault(x => x.Id == dto.TableId);
		var location = dataContext.Set<Location>().FirstOrDefault(x => x.Id == dto.LocationId);

		if (table == null)
		{
			return BadRequest("Invalid Table");
		}

		if (location == null)
		{
			return BadRequest("Invalid Location");
		}


		var userName = User.Identity?.Name
			?? User.FindFirst(System.Security.Claims.ClaimTypes.Name)?.Value;

		if (userName == null)
			return Unauthorized();

		var Order = new Order
		{
			UserId = userId.Value,
			UserName = userName,
			LocationId = dto.LocationId,
			TableId = dto.TableId,
			Total = total,
			Items = dto.Items,
			OrderItem = orderItems
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
		Order.UserName = dto.UserName;
		Order.LocationId = dto.LocationId;
		Order.TableId = dto.TableId;
		Order.Total = dto.Total;
		Order.Items = dto.Items;

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
