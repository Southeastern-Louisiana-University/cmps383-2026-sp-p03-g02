using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Selu383.SP26.Api.Features.Auth;
using Selu383.SP26.Api.Features.Locations;
using Selu383.SP26.Api.Features.Orders;
using Selu383.SP26.Api.Features.Tables;
using Selu383.SP26.Api.Features.Menu;
using System.Data;

namespace Selu383.SP26.Api.Data;

public class DataContext : IdentityDbContext<User, Role, int, IdentityUserClaim<int>, UserRole, IdentityUserLogin<int>, IdentityRoleClaim<int>, IdentityUserToken<int>>
{
	public DataContext(DbContextOptions<DataContext> options) : base(options)
	{

	}

	public DbSet<Location> Locations { get; set; }
	public DbSet<Item> Items { get; set; }
	public DbSet<Ingredient> Ingredients { get; set; }
	public DbSet<ItemIngredient> ItemIngredients { get; set; }
	public DbSet<Order> Orders { get; set; }
	public DbSet<OrderItem> OrderItems { get; set; }
	public DbSet<Table> Tables { get; set; }
	public DbSet<Reservation> Reservations { get; set; }

	protected override void OnModelCreating(ModelBuilder modelBuilder)
	{
		base.OnModelCreating(modelBuilder);

		// find all the "IEntityTypeConfiguration<TEntity>" implementations in this assembly and apply them
		modelBuilder.ApplyConfigurationsFromAssembly(typeof(DataContext).Assembly);
	}
}