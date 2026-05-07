using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Selu383.SP26.Api.Data;
using Selu383.SP26.Api.Features.Auth;
using Selu383.SP26.Api.Features.Menu;
using Selu383.SP26.Api.Migrations;

namespace Selu383.SP26.Api.Controllers;

[Route("api/ItemIngredients")]
[ApiController]
public class ItemIngredientsController(DataContext dataContext) : ControllerBase
{
	[HttpGet]
	public IQueryable<ItemIngredient> GetAll()
	{
		return dataContext.Set<ItemIngredient>()
			.Select(x => new ItemIngredient
			{
				Id = x.Id,
				ItemId = x.ItemId,
				IngredientId = x.IngredientId,
				Item = x.Item,
				Ingredient = x.Ingredient
			});
	}

	[HttpGet("{Id}")]
	public ActionResult<ItemIngredientDto> GetById(int Id)
	{
		var result = dataContext.Set<ItemIngredient>()
			.FirstOrDefault(x => x.Id == Id);

		if (result == null)
		{
			return NotFound();
		}

		return Ok(new ItemIngredientDto
		{
			Id = result.Id,
			ItemId= result.ItemId,
			IngredientId= result.IngredientId
		});
	}

	[HttpPost]
	[Authorize(Roles = RoleNames.Admin)]
	public async Task<ActionResult<ItemIngredientDto>> Create(ItemIngredientDto dto) 
	{
		var items = await dataContext.Set<Item>().ToListAsync();
		var ingredients = await dataContext.Set<Ingredient>().ToListAsync();

		if (!items.Any() || !ingredients.Any())
		{
			return BadRequest("either no items or no ingredients were found");
		}

		var item = items.FirstOrDefault(i => i.Id == dto.ItemId);
		var ingredient = ingredients.FirstOrDefault(i => i.Id == dto.IngredientId);

		if (item == null || ingredient == null )
		{
			return BadRequest("bad item or ingredient");
		}

		var ItemIngredient = new ItemIngredient
		{
			ItemId = item.Id,
			IngredientId = ingredient.Id
		};

		dataContext.Set<ItemIngredient>().Add(ItemIngredient);
		await dataContext.SaveChangesAsync();

		dto.Id = ItemIngredient.Id;

		return CreatedAtAction(nameof(GetById), new { id = dto.Id }, dto);
	}
}
