using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Selu383.SP26.Api.Data;
using Selu383.SP26.Api.Features.Auth;
using Selu383.SP26.Api.Features.Locations;
using Selu383.SP26.Api.Features.Tables;

namespace Selu383.SP26.Api.Controllers;

[Route("api/Tables")]
[ApiController]
public class TablesController(DataContext dataContext) : ControllerBase
{
    [HttpGet]
    public IQueryable<TableDto> GetAll()
    {
        return dataContext.Set<Table>()
            .Select(x => new TableDto
            {
                Id = x.Id,
				LocationId = x.LocationId,
				IsOccupied = x.IsOccupied,
				IsReserved = x.IsReserved,
			});
    }

    [HttpGet("{id}")]
    public ActionResult<TableDto> GetById(int id)
    {
        var result = dataContext.Set<Table>()
            .FirstOrDefault(x => x.Id == id);

        if (result == null)
        {
            return NotFound();
        }

        return Ok(new TableDto
        {
			Id = result.Id,
			LocationId = result.LocationId,
			IsOccupied = result.IsOccupied,
			IsReserved = result.IsReserved,
		});
    }

    [HttpPost]
    [Authorize(Roles = RoleNames.Admin)]
    public ActionResult<TableDto> Create(TableDto dto)
    {

        var Table = new Table
        {
			LocationId = dto.LocationId,
			IsOccupied = dto.IsOccupied,
			IsReserved = dto.IsReserved,
		};

        dataContext.Set<Table>().Add(Table);
        dataContext.SaveChanges();

        dto.Id = Table.Id;

        return CreatedAtAction(nameof(GetById), new { id = dto.Id }, dto);
    }

    [HttpPut("{id}")]
    [Authorize]
    public ActionResult<TableDto> Update(int id, TableDto dto)
    {

        var Table = dataContext.Set<Table>()
            .FirstOrDefault(x => x.Id == id);

        if (Table == null)
        {
            return NotFound();
        }

        Table.LocationId = dto.LocationId;
		Table.IsOccupied = dto.IsOccupied;
		Table.IsReserved = dto.IsReserved;

        dataContext.SaveChanges();

        dto.Id = Table.Id;

        return Ok(dto);
    }

    [HttpDelete("{id}")]
    [Authorize]
    public ActionResult Delete(int id)
    {
        var Table = dataContext.Set<Table>()
            .FirstOrDefault(x => x.Id == id);

        if (Table == null)
        {
            return NotFound();
        }

        dataContext.Set<Table>().Remove(Table);
        dataContext.SaveChanges();

        return Ok();
    }
}
