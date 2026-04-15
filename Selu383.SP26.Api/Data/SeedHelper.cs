using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Selu383.SP26.Api.Features.Auth;
using Selu383.SP26.Api.Features.Locations;
using Selu383.SP26.Api.Features.Menu;
using Selu383.SP26.Api.Features.Orders;
using Selu383.SP26.Api.Features.Tables;

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
		await AddTables(dataContext);    
		await AddItems(dataContext);
		await AddOrders(dataContext);
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
		new Item { Name = "Iced Latte", Type = "Coffee", IsSeasonal = false, Price = 550, Description = "Espresso and milk served over ice for a refreshing coffee drink.", Image = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimg.freepik.com%2Fpremium-photo%2Ficed-coffee-latte-takeaway-cup-isolated-white-background_871222-1517.jpg%3Fw%3D2000&f=1&nofb=1&ipt=cc763f93ee226d9f9160a488d043951627798186272e5ea2fcb875e3ef67c046" },
		new Item { Name = "Roaring Frappe", Type = "Coffee", IsSeasonal = true, Price = 620, Description = "Cold brew, milk, and ice blended together with a signature syrup or flavor, topped with whipped cream.", Image = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcoffeemaister.com%2Fwp-content%2Fuploads%2F2024%2F12%2FIced-Mocha-Frappe-3rd-Photo.webp&f=1&nofb=1&ipt=759c2528bd79b21d04b5105d0f097ae02f68dc2d5b96d2959e15cc0a60fe5f10" },
		new Item { Name = "Mannino Honey Crepe", Type = "Crepe", IsSeasonal = false, Price = 1000, Description = "A sweet crepe drizzled with Mannino honey and topped with mixed berries.", Image = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.mollyjwilk.com%2Fwp-content%2Fuploads%2F2022%2F06%2FFig-and-Honey-Crepe-Cake-MollyJWilk.jpg&f=1&nofb=1&ipt=d064ccb9823f2af6443a16cb3229ef26ddb872b4528f1e2e5a7a2e8252a6ee4f" },
        new Item { Name = "Travis Special", Type = "Bagel", IsSeasonal = false, Price = 1400, Description = "Cream cheese, salmon, spinach, and a fried egg served on a freshly toasted bagel.", Image = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fthumbs.dreamstime.com%2Fb%2Fbagels-smoked-salmon-cream-cheese-capers-ideal-creative-business-use-365420901.jpg&f=1&nofb=1&ipt=6a368785d04e55ab3d549f7d99ed001a6f1d3e0f93f1494303bb5002e0087843" }

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
	private static async Task AddOrders(DataContext dataContext)
	{
		if (dataContext.Set<Order>().Any())
		{
			return;
		}

		dataContext.Set<Order>().AddRange(
			new Order { UserId = 1, LocationId = 1, TableId = 1, Items = [1, 1, 2], Total = 16 },
			new Order { UserId = 1, LocationId = 2, TableId = 2, Items = [2], Total = 6 },
			new Order { UserId = 2, LocationId = 1, TableId = 1, Items = [1, 1, 2], Total = 16 }
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
    private static async Task AddTables(DataContext dataContext)
    {
        if (dataContext.Set<Table>().Any())
        {
            return;
        }

        dataContext.Set<Table>().AddRange(
        new Table { LocationId = 1, IsOccupied = true, IsReserved = false },
        new Table { LocationId = 1, IsOccupied = false, IsReserved = true },
        new Table { LocationId = 1, IsOccupied = false, IsReserved = false },
        new Table { LocationId = 1, IsOccupied = false, IsReserved = false },
        new Table { LocationId = 1, IsOccupied = false, IsReserved = false },
        new Table { LocationId = 1, IsOccupied = false, IsReserved = false },
        new Table { LocationId = 1, IsOccupied = false, IsReserved = false },
        new Table { LocationId = 1, IsOccupied = false, IsReserved = false }

        );

        await dataContext.SaveChangesAsync();
    }
}
