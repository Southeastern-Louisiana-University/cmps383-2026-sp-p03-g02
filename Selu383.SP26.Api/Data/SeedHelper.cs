using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Selu383.SP26.Api.Features.Auth;
using Selu383.SP26.Api.Features.Locations;
using Selu383.SP26.Api.Features.Menu;

namespace Selu383.SP26.Api.Data;

public static class SeedHelper
{
	public static async Task MigrateAndSeed(IServiceProvider serviceProvider)
	{
		var dataContext = serviceProvider.GetRequiredService<DataContext>();

		await dataContext.Database.MigrateAsync();

		await AddRoles(serviceProvider);
		await AddUsers(serviceProvider);

		await AddLocations(dataContext);
		await AddItems(dataContext);
		await AddIngredients(dataContext);
		await AddItemIngredients(dataContext);
	}

	private static async Task AddUsers(IServiceProvider serviceProvider)
	{
		const string defaultPassword = "Password123!";
		var userManager = serviceProvider.GetRequiredService<UserManager<User>>();

		if (userManager.Users.Any())
		{
			return;
		}

		var adminUser = new User
		{
			UserName = "galkadi"
		};
		await userManager.CreateAsync(adminUser, defaultPassword);
		await userManager.AddToRoleAsync(adminUser, RoleNames.Admin);

		var bob = new User
		{
			UserName = "bob"
		};
		await userManager.CreateAsync(bob, defaultPassword);
		await userManager.AddToRoleAsync(bob, RoleNames.User);

		var sue = new User
		{
			UserName = "sue"
		};
		await userManager.CreateAsync(sue, defaultPassword);
		await userManager.AddToRoleAsync(sue, RoleNames.User);
	}

	private static async Task AddRoles(IServiceProvider serviceProvider)
	{
		var roleManager = serviceProvider.GetRequiredService<RoleManager<Role>>();
		if (roleManager.Roles.Any())
		{
			return;
		}
		await roleManager.CreateAsync(new Role
		{
			Name = RoleNames.Admin
		});

		await roleManager.CreateAsync(new Role
		{
			Name = RoleNames.User
		});
	}

	private static async Task AddLocations(DataContext dataContext)
	{
		if (dataContext.Set<Location>().Any())
		{
			return;
		}
		dataContext.Set<Location>().AddRange(
			new Location { Name = "Location 1", Address = "123 Main St", TableCount = 10 },
			new Location { Name = "Location 2", Address = "456 Oak Ave", TableCount = 20 },
			new Location { Name = "Location 3", Address = "789 Pine Ln", TableCount = 15 }
		);

		await dataContext.SaveChangesAsync();
	}
	private static async Task AddItems(DataContext dataContext)
	{
		if (dataContext.Set<Item>().Any())
		{
			return;
		}

		dataContext.Set<Item>().AddRange(
		new Item { Name = "Decaf", Type = "Coffee", IsSeasonal = false },
		new Item { Name = "Golden Coffee", Type = "Coffee", IsSeasonal = true }
		);

		await dataContext.SaveChangesAsync();
	}
	private static async Task AddIngredients(DataContext dataContext)
	{
		if (dataContext.Set<Ingredient>().Any())
		{
			return;
		}

		dataContext.Set<Ingredient>().AddRange(
		new Ingredient { Name = "Coffee Beans", Type = "Base Ingredient", IsAllergen = false },
		new Ingredient { Name = "Almond Milk", Type = "Addon", IsAllergen = true }
		);

		await dataContext.SaveChangesAsync();
	}
	private static async Task AddItemIngredients(DataContext dataContext)
	{
		if (dataContext.Set<ItemIngredient>().Any())
		{
			return;
		}

		var items = await dataContext.Set<Item>().ToListAsync();
		var ingredients = await dataContext.Set<Ingredient>().ToListAsync();

		if (!items.Any() || !ingredients.Any())
		{
			return;
		}

		var decaf = items.FirstOrDefault(i => i.Id == 1);
		var golden = items.FirstOrDefault(i => i.Id == 2);

		var coffeeBeans = ingredients.FirstOrDefault(i => i.Id == 1);
		var almondMilk = ingredients.FirstOrDefault(i => i.Id == 2);

		if (decaf == null || coffeeBeans == null || almondMilk == null)
		{
			return;
		}

		dataContext.Set<ItemIngredient>().AddRange(
			new ItemIngredient { ItemId = decaf.Id, IngredientId = coffeeBeans.Id },
			new ItemIngredient { ItemId = golden.Id, IngredientId = coffeeBeans.Id },
			new ItemIngredient { ItemId = golden.Id, IngredientId = almondMilk.Id }
		);

		await dataContext.SaveChangesAsync();
	}

}
