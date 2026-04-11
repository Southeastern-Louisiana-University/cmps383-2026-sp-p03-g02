using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Selu383.SP26.Api.Data;
using Selu383.SP26.Api.Features.Auth;
using Selu383.SP26.Api.Features.Menu;

namespace Selu383.SP26.Api.Controllers;

[Route("api/Items")]
[ApiController]
public class ItemsController(DataContext dataContext) : ControllerBase
{
	[HttpGet]
	public IQueryable<Item> GetAll()
	{
		return dataContext.Set<Item>()
			.Include(x => x.ItemIngredients)
				.ThenInclude(ii => ii.Ingredient)
			.Select(x => new Item
			{
				Id = x.Id,
				Name = x.Name,
				Type = x.Type,
				Price = x.Price,
				IsSeasonal = x.IsSeasonal,
				ItemIngredients = x.ItemIngredients,
			});
	}

	[HttpGet("{id}")]
	public ActionResult<Item> GetById(int id)
	{
		var result = dataContext.Set<Item>()
			.FirstOrDefault(x => x.Id == id);

		if (result == null)
		{
			return NotFound();
		}

		return Ok(new Item
		{
			Id = result.Id,
			Name = result.Name,
			Type = result.Type,
			Price = result.Price,
			IsSeasonal = result.IsSeasonal,
			ItemIngredients = result.ItemIngredients,
		});
	}

	[HttpPost]
	[Authorize(Roles = RoleNames.Admin)]
	public ActionResult<ItemDto> Create(ItemDto dto)
	{

		var Item = new Item
		{
			Name = dto.Name,
			Type = dto.Type,
			Price = dto.Price,
			IsSeasonal = dto.IsSeasonal
		};

		dataContext.Set<Item>().Add(Item);
		dataContext.SaveChanges();

		dto.Id = Item.Id;

		return CreatedAtAction(nameof(GetById), new { id = dto.Id }, dto);
	}

	[HttpPut("{id}")]
	[Authorize]
	public ActionResult<ItemDto> Update(int id, ItemDto dto)
	{

		var Item = dataContext.Set<Item>()
			.FirstOrDefault(x => x.Id == id);

		if (Item == null)
		{
			return NotFound();
		}

		Item.Name = dto.Name;
		Item.Type = dto.Type;
		Item.Price = dto.Price;
		Item.IsSeasonal = dto.IsSeasonal;

		dataContext.SaveChanges();

		dto.Id = Item.Id;

		return Ok(dto);
	}

	[HttpDelete("{id}")]
	[Authorize]
	public ActionResult Delete(int id)
	{
		var Item = dataContext.Set<Item>()
			.FirstOrDefault(x => x.Id == id);

		if (Item == null)
		{
			return NotFound();
		}

		dataContext.Set<Item>().Remove(Item);
		dataContext.SaveChanges();

		return Ok();
	}
}
