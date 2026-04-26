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
			new Location { Name = "Main St", Address = "123 Main St", TableCount = 10 },
			new Location { Name = "Oak Ave", Address = "456 Oak Ave", TableCount = 20 },
			new Location { Name = "Pine Ln", Address = "789 Pine Ln", TableCount = 15 }
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
        new Item { Name = "Supernova", Type = "Coffee", IsSeasonal = false, Price = 795, Description = "A unique coffee blend with a complex, balanced profile and subtle sweetness. Delicious as espresso or paired with milk.", Image = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%2Fid%2FOIP.BeBvpJjmjK14ja_nYohMMgHaEJ%3Fpid%3DApi&f=1&ipt=b134811da3abdb3ec40f0094ce61ce9f2eb08da36fc13a4705edacc8d00af7dd&ipo=images" },
        new Item { Name = "Roaring Frappe", Type = "Coffee", IsSeasonal = true, Price = 620, Description = "Cold brew, milk, and ice blended together with a signature syrup or flavor, topped with whipped cream.", Image = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcoffeemaister.com%2Fwp-content%2Fuploads%2F2024%2F12%2FIced-Mocha-Frappe-3rd-Photo.webp&f=1&nofb=1&ipt=759c2528bd79b21d04b5105d0f097ae02f68dc2d5b96d2959e15cc0a60fe5f10" },
        new Item { Name = "Black & White Cold Brew", Type = "Coffee", IsSeasonal = false, Price = 515, Description = "Cold brew made with both dark and light roast beans, finished with a drizzle of condensed milk.", Image = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcookieandkate.com%2Fimages%2F2018%2F09%2Fcold-brew-coffee-tutorial.jpg&f=1&nofb=1&ipt=26c1138b22989acd6de43043ae8e8fc0cb8c1317e82f56aa16b064d2bfdfffc6" },
        new Item{ Name = "Evil Coffee", Type = "Coffee", IsSeasonal = true, Price = 100000, Description="The most dangerous brew in all of the land.", Image="https://cdn.discordapp.com/attachments/1486156692231159818/1498105426225397810/image.png?ex=69eff2e7&is=69eea167&hm=27e3b9ab95633d89679081301f88b5ac05e3eebdf7c458ff8c8eb49031d71847&"},
        new Item { Name = "Strawberry Limeade", Type = "Drink", IsSeasonal = false, Price = 500, Description = "Fresh lime juice blended with strawberry purée for a refreshing, tangy drink.", Image = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcreateyum.com%2Fwp-content%2Fuploads%2F2023%2F03%2Fcopycat-starbucks-blended-strawberry-lemonade-2.jpg&f=1&nofb=1&ipt=a23421456e189e078ce12db667c52cc69faf8e2d36f574501def274fc6ce9f28" },
		new Item { Name = "Shaken Lemonade", Type = "Drink", IsSeasonal = false, Price = 500, Description = "Fresh lemon juice and simple syrup vigorously shaken for a bright, refreshing lemonade.", Image = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fthesoccermomblog.com%2Fwp-content%2Fuploads%2F2024%2F06%2FHomemade-Lemonade-1.jpg&f=1&nofb=1&ipt=3887f2d60d395a1f28569f9fbbd1e24b59bedd695c54500203a4af67d98a6a2e" },
        new Item { Name = "Mannino Honey Crepe", Type = "Crepe", IsSeasonal = false, Price = 1000, Description = "A sweet crepe drizzled with Mannino honey and topped with mixed berries.", Image = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.mollyjwilk.com%2Fwp-content%2Fuploads%2F2022%2F06%2FFig-and-Honey-Crepe-Cake-MollyJWilk.jpg&f=1&nofb=1&ipt=d064ccb9823f2af6443a16cb3229ef26ddb872b4528f1e2e5a7a2e8252a6ee4f" },
        new Item { Name = "Downtowner", Type = "Crepe", IsSeasonal = true, Price = 1075, Description = "Strawberries and bananas wrapped in a crepe, finished with Nutella and Hershey's chocolate sauce.", Image = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftreatdreams.com%2Fwp-content%2Fuploads%2F2021%2F03%2Fstrawberry-banana-crepe-with-Nutella-728x485.jpg&f=1&nofb=1&ipt=f68abdbf73c9d6b1f08e09b2ba4801093f2e2956c1861fb92b5aa2b3d57efd81" },
		new Item { Name = "Funky Monkey", Type = "Crepe", IsSeasonal = false, Price = 1000, Description = "Nutella and bananas wrapped in a crepe, served with whipped cream.", Image = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftherecipecookbook.com%2Fwp-content%2Fuploads%2F2025%2F09%2FNutella-and-Banana-Crepes.jpg&f=1&nofb=1&ipt=014ce71e609c5f44fdc055b1cb649c150c1058f382dfca2913ccf22d2bf9c6ab" },
		new Item { Name = "Le S'mores", Type = "Crepe", IsSeasonal = false, Price = 950, Description = "Marshmallow cream and chocolate sauce inside a crepe, topped with graham cracker crumbs.", Image = "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.thecookierookie.com%2Fwp-content%2Fuploads%2F2015%2F05%2Fsmore-crepes-7-of-8.jpg&f=1&nofb=1&ipt=bb934004a7666715c58738001ccd181bbfcd67da4e7e3e0eeece2a9b8d1bfa34" },
		new Item { Name = "Strawberry Fields", Type = "Crepe", IsSeasonal = true, Price = 1000, Description = "Fresh strawberries with chocolate drizzle and powdered sugar.", Image = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.stockcake.com%2Fpublic%2F5%2Fa%2F6%2F5a6e4f5f-d8db-4a7c-b2f0-b5fef1fc7253_large%2Fdecadent-chocolate-crepe-stockcake.jpg&f=1&nofb=1&ipt=a08c0a434751fd563c0d13a3ebcca54d6ad93c995a23e0e8ca7ba8e910e04730" },
		new Item { Name = "Bonjour", Type = "Crepe", IsSeasonal = false, Price = 850, Description = "Sweet crepe filled with syrup and cinnamon, finished with powdered sugar.", Image = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ffitnessfoodchef.com%2Fwp-content%2Fuploads%2F2025%2F08%2Frolled-cinnamon-roll-high-protein-crepes.jpg&f=1&nofb=1&ipt=dd1444472df7323e2685145182b19309cd5273766e26313e89e978b0879200ab" },
		new Item { Name = "Banana Foster", Type = "Crepe", IsSeasonal = false, Price = 895, Description = "Bananas with cinnamon in a crepe, topped with caramel sauce.", Image = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimg.freepik.com%2Fpremium-photo%2Fcrepes-with-bananas-nuts-caramel-sauce_972290-74581.jpg&f=1&nofb=1&ipt=69060e884863b3909ea837d16f14111e47d09cc9a717580ca67af400744b6b0b" },
        new Item { Name = "Matt's Scrambled Eggs", Type = "Crepe", IsSeasonal = true, Price = 500, Description = "Scrambled eggs and mozzarella cheese wrapped in a crepe.", Image = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwearenotmartha.com%2Fwp-content%2Fuploads%2FBacon-Egg-and-Cheese-Crepes-Featured.jpg&f=1&nofb=1&ipt=f26d1445ded50ac28fc900c7c91d6d1546bc7186b9ab352dfbd8d1ae78d090a6" },
        new Item { Name = "Meanie Mushroom", Type = "Crepe", IsSeasonal = false, Price = 1050, Description = "Sautéed mushrooms, mozzarella, tomato, and bacon inside a crepe.", Image = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fd104wv11b7o3gc.cloudfront.net%2Fwp-content%2Fuploads%2F2016%2F05%2Fchicken-florentine-crepes-23.jpg&f=1&nofb=1&ipt=83f1c9a2a7f749085ff58b228e7e43a64bd33f23d322e7919ce8117771ef34ac" },
		new Item { Name = "Turkey Club", Type = "Crepe", IsSeasonal = false, Price = 1050, Description = "Turkey, bacon, spinach, and tomato wrapped in a savory crepe.", Image = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcopykat.com%2Fwp-content%2Fuploads%2F2024%2F10%2FIHOP-Chicken-Florentine-Crepes-Pin-3.jpg&f=1&nofb=1&ipt=6bf509ace2d262df53037175cb5eb15a8256f30399e4159f59649e4ec307e9d7" },
		new Item { Name = "Green Machine", Type = "Crepe", IsSeasonal = false, Price = 1000, Description = "Spinach, artichokes, and mozzarella cheese inside a fresh crepe.", Image = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flookaside.fbsbx.com%2Flookaside%2Fcrawler%2Fmedia%2F%3Fmedia_id%3D122167500458436637&f=1&nofb=1&ipt=92e9b715efdcaf1dc0594f9ca22ad2a39168bce48a53d8cc494a5797fe499656" },
		new Item { Name = "Perfect Pair", Type = "Crepe", IsSeasonal = false, Price = 1000, Description = "Bacon and Nutella wrapped in a crepe.", Image = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%2Fid%2FOIP.bphTTbkUBi4AwGtn-lhUeQHaHa%3Fpid%3DApi&f=1&ipt=82a46e3cc433acd0b14fe0189ac99dafc075d96b4cd5894fc4b69606abd59d6c&ipo=images" },
		new Item { Name = "Crepe Fromage", Type = "Crepe", IsSeasonal = false, Price = 800, Description = "Savory crepe filled with a blend of cheeses.", Image = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimg.sndimg.com%2Ffood%2Fimage%2Fupload%2Fq_92%2Cfl_progressive%2Cw_1200%2Cc_scale%2Fv1%2Fimg%2Frecipes%2F37%2F33%2F90%2FpicXzxvSw.jpg&f=1&nofb=1&ipt=62c1e12fd5fb0bed7b76f6dae1cdd540c3cc8eed0a60441e3c8d51fbae21b266" },
		new Item { Name = "Farmers Market Crepe", Type = "Crepe", IsSeasonal = false, Price = 1050, Description = "Turkey, spinach, and mozzarella wrapped in a savory crepe.", Image = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fvihaad.com%2Fwp-content%2Fuploads%2F2025%2F09%2Fsavory-spinach-mushroom-chicken-crepes-2.jpg&f=1&nofb=1&ipt=c47b0deea676d31d9c46f5c28b8f2945ee8a7cb92a10ac548523207005f5b48b" },
		new Item { Name = "Travis Special", Type = "Bagel", IsSeasonal = true, Price = 1400, Description = "Cream cheese, salmon, spinach, and a fried egg served on a freshly toasted bagel.", Image = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fthumbs.dreamstime.com%2Fb%2Fbagels-smoked-salmon-cream-cheese-capers-ideal-creative-business-use-365420901.jpg&f=1&nofb=1&ipt=6a368785d04e55ab3d549f7d99ed001a6f1d3e0f93f1494303bb5002e0087843" },        
		new Item { Name = "Crème Brulagel", Type = "Bagel", IsSeasonal = false, Price = 800, Description = "Toasted bagel with caramelized sugar crust and cream cheese.", Image = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fthemomnutritionist.com%2Fwp-content%2Fuploads%2F2025%2F01%2Fprotein-bagel-recipe.jpg&f=1&nofb=1&ipt=c337c37acc50693f00b40f4d5ac00500db3b93873e68d54c47a0a82211e7e976" },
		new Item { Name = "The Fancy One", Type = "Bagel", IsSeasonal = false, Price = 1300, Description = "Smoked salmon, cream cheese, and fresh dill.", Image = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fyummygusto.com%2Fassets%2Fimages%2F1753287107103-ah2aj6wc.jpg&f=1&nofb=1&ipt=89d1394b67ed3d87519b44459f4346c4e4f326026572086301f03f6b403f86df" },
		new Item { Name = "Breakfast Bagel", Type = "Bagel", IsSeasonal = false, Price = 950, Description = "Ham, bacon, or sausage with egg and cheddar cheese.", Image = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftoplushrecipes.com%2Fwp-content%2Fuploads%2F2025%2F06%2F0_3-63.png&f=1&nofb=1&ipt=caa2aef064fba4f71dd6ab5002154dd6fbe34aca9839a6626501b1c7ed96f6e0" },
		new Item { Name = "The Classic", Type = "Bagel", IsSeasonal = false, Price = 525, Description = "Toasted bagel with cream cheese.", Image = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.zingermansdeli.com%2Fapp%2Fuploads%2F2024%2F10%2Funnamed-32-683x1024.jpg&f=1&nofb=1&ipt=dcf1394e5240dc056ce6d07f4b66ee80c4b92bf6d07070a75e847fba2c98371b" }
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
			new Ingredient { Name = "Whole Milk", Type = "Milk", IsAllergen = true },
			new Ingredient { Name = "2% Milk", Type = "Milk", IsAllergen = true },
			new Ingredient { Name = "Skim Milk", Type = "Milk", IsAllergen = true },
			new Ingredient { Name = "Oat Milk", Type = "Milk Alternative", IsAllergen = false },
			new Ingredient { Name = "Almond Milk", Type = "Milk Alternative", IsAllergen = true },
			new Ingredient { Name = "Soy Milk", Type = "Milk Alternative", IsAllergen = true },
			new Ingredient { Name = "Half & Half", Type = "Milk", IsAllergen = true },
			new Ingredient { Name = "Heavy Cream", Type = "Milk", IsAllergen = true },
            new Ingredient { Name = "Sugar", Type = "Sweetener", IsAllergen = false },
			new Ingredient { Name = "Brown Sugar", Type = "Sweetener", IsAllergen = false },
			new Ingredient { Name = "Honey", Type = "Sweetener", IsAllergen = false },
			new Ingredient { Name = "Stevia", Type = "Sweetener", IsAllergen = false },
			new Ingredient { Name = "Vanilla Syrup", Type = "Flavor", IsAllergen = false },
			new Ingredient { Name = "Caramel Syrup", Type = "Flavor", IsAllergen = false },
			new Ingredient { Name = "Hazelnut Syrup", Type = "Flavor", IsAllergen = false },
			new Ingredient { Name = "Chocolate Syrup", Type = "Flavor", IsAllergen = false },
			new Ingredient { Name = "Whipped Cream", Type = "Topping", IsAllergen = true },
			new Ingredient { Name = "Ice", Type = "Add-on", IsAllergen = false }
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
        new Table { LocationId = 1, Capacity = 2, IsReserved = false },
        new Table { LocationId = 1, Capacity = 2, IsReserved = true },
        new Table { LocationId = 1, Capacity = 2, IsReserved = false },
        new Table { LocationId = 1, Capacity = 4, IsReserved = false },
        new Table { LocationId = 1, Capacity = 4, IsReserved = true},
        new Table { LocationId = 1, Capacity = 4, IsReserved = false },
        new Table { LocationId = 1, Capacity = 6, IsReserved = false },
        new Table { LocationId = 1, Capacity = 6, IsReserved = false },
        new Table { LocationId = 1, Capacity = 6, IsReserved = true },
        new Table { LocationId = 1, Capacity = 8, IsReserved = false },

        new Table { LocationId = 2, Capacity = 2, IsReserved = false },
        new Table { LocationId = 2, Capacity = 2, IsReserved = true },
        new Table { LocationId = 2, Capacity = 2, IsReserved = false },
        new Table { LocationId = 2, Capacity = 2, IsReserved = false },
        new Table { LocationId = 2, Capacity = 2, IsReserved = false },
        new Table { LocationId = 2, Capacity = 4, IsReserved = false },
        new Table { LocationId = 2, Capacity = 4, IsReserved = false },
        new Table { LocationId = 2, Capacity = 4, IsReserved = false },
        new Table { LocationId = 2, Capacity = 4, IsReserved = true },
        new Table { LocationId = 2, Capacity = 4, IsReserved = false },
        new Table { LocationId = 2, Capacity = 4, IsReserved = true },
        new Table { LocationId = 2, Capacity = 4, IsReserved = false },
        new Table { LocationId = 2, Capacity = 4, IsReserved = false },
        new Table { LocationId = 2, Capacity = 4, IsReserved = false },
        new Table { LocationId = 2, Capacity = 6, IsReserved = false },
        new Table { LocationId = 2, Capacity = 6, IsReserved = false },
        new Table { LocationId = 2, Capacity = 6, IsReserved = false },
        new Table { LocationId = 2, Capacity = 6, IsReserved = false },
        new Table { LocationId = 2, Capacity = 8, IsReserved = false},
        new Table { LocationId = 2, Capacity = 8, IsReserved = true },

        new Table { LocationId = 3, Capacity = 2, IsReserved = false },
        new Table { LocationId = 3, Capacity = 2, IsReserved = false },
        new Table { LocationId = 3, Capacity = 2, IsReserved = false },
        new Table { LocationId = 3, Capacity = 2, IsReserved = false },
        new Table { LocationId = 3, Capacity = 2, IsReserved = true },
        new Table { LocationId = 3, Capacity = 2, IsReserved = false },
        new Table { LocationId = 3, Capacity = 2, IsReserved = false },
        new Table { LocationId = 3, Capacity = 4, IsReserved = false },
        new Table { LocationId = 3, Capacity = 4, IsReserved = true },
        new Table { LocationId = 3, Capacity = 4, IsReserved = false },
        new Table { LocationId = 3, Capacity = 4, IsReserved = false },
        new Table { LocationId = 3, Capacity = 4, IsReserved = true },
        new Table { LocationId = 3, Capacity = 6, IsReserved = false },
        new Table { LocationId = 3, Capacity = 6, IsReserved = false },
        new Table { LocationId = 3, Capacity = 6, IsReserved = true }
        );

        await dataContext.SaveChangesAsync();
    }
}
