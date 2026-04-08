using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Selu383.SP26.Api.Data;
using Selu383.SP26.Api.Features.Auth;
using Selu383.SP26.Api.Features.Menu;

namespace Selu383.SP26.Api.Controllers;

[Route("api/Ingredients")]
[ApiController]
public class IngredientsController(DataContext dataContext) : ControllerBase
{
    [HttpGet]
    public IQueryable<IngredientDto> GetAll()
    {
        return dataContext.Set<Ingredient>()
            .Select(x => new IngredientDto
            {
                Id = x.Id,
				Name = x.Name,
				Type = x.Type,
				IsAllergen = x.IsAllergen,
			});
    }

    [HttpGet("{id}")]
    public ActionResult<IngredientDto> GetById(int id)
    {
        var result = dataContext.Set<Ingredient>()
            .FirstOrDefault(x => x.Id == id);

        if (result == null)
        {
            return NotFound();
        }

        return Ok(new IngredientDto
        {
			Id = result.Id,
			Name = result.Name,
			Type = result.Type,
			IsAllergen = result.IsAllergen,
		});
    }

    [HttpPost]
    [Authorize(Roles = RoleNames.Admin)]
    public ActionResult<IngredientDto> Create(IngredientDto dto)
    {

        var Ingredient = new Ingredient
        {
			Name = dto.Name,
			Type = dto.Type,
			IsAllergen = dto.IsAllergen,
		};

        dataContext.Set<Ingredient>().Add(Ingredient);
        dataContext.SaveChanges();

        dto.Id = Ingredient.Id;

        return CreatedAtAction(nameof(GetById), new { id = dto.Id }, dto);
    }

    [HttpPut("{id}")]
    [Authorize]
    public ActionResult<IngredientDto> Update(int id, IngredientDto dto)
    {

        var Ingredient = dataContext.Set<Ingredient>()
            .FirstOrDefault(x => x.Id == id);

        if (Ingredient == null)
        {
            return NotFound();
        }

        Ingredient.Name = dto.Name;
        Ingredient.Type = dto.Type;
		Ingredient.IsAllergen = dto.IsAllergen;

        dataContext.SaveChanges();

        dto.Id = Ingredient.Id;

        return Ok(dto);
    }

    [HttpDelete("{id}")]
    [Authorize]
    public ActionResult Delete(int id)
    {
        var Ingredient = dataContext.Set<Ingredient>()
            .FirstOrDefault(x => x.Id == id);

        if (Ingredient == null)
        {
            return NotFound();
        }

        dataContext.Set<Ingredient>().Remove(Ingredient);
        dataContext.SaveChanges();

        return Ok();
    }
}
