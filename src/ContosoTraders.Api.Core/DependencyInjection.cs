using System.Reflection;
using Azure.Identity;
using Microsoft.AspNetCore.Builder;
using Microsoft.Azure.Cosmos;
using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Logging;

[assembly: FunctionsStartup(typeof(DependencyInjection))]

namespace ContosoTraders.Api.Core;

public class DependencyInjection : FunctionsStartup
{
    private const string _allowSpecificOrigins = "allowSpecificOrigins";

    public static void ConfigureServices(HostBuilderContext context, IServiceCollection services)
    {
        ConfigureServicesInternal(services, context.Configuration);
    }


    /// <remarks>
    ///     This is implicitly called by the Azure Functions runtime.
    /// </remarks>
    public override void Configure(IFunctionsHostBuilder builder)
    {
        ConfigureServicesInternal(builder.Services, builder.GetContext().Configuration);
    }


    /// <remarks>
    ///     To be explicitly called from an asp.net core application only
    /// </remarks>
    public static void ConfigureApp()
    {
        var builder = WebApplication.CreateBuilder();

        if (builder.Environment.IsDevelopment())
            builder.Configuration.AddAzureKeyVault(
                new Uri(builder.Configuration["KeyVaultEndpoint"]),
                new DefaultAzureCredential());
        else
            builder.Configuration.AddAzureKeyVault(
                new Uri(builder.Configuration["KeyVaultEndpoint"]),
                new DefaultAzureCredential(
                    new DefaultAzureCredentialOptions
                    {
                        ManagedIdentityClientId = builder.Configuration["ManagedIdentityClientId"]
                    }));

        ConfigureServicesInternal(builder.Services, builder.Configuration);

        ConfigureAspNetCoreServices(builder.Services, builder.Configuration);

        var app = builder.Build();

        ConfigureAspNetCoreMiddleware(app);

        app.Run();
    }


    /// <remarks>
    ///     @TODO: Currently, this method is very 'aspnetcore' specific. Make it more generic (for azure functions) later.
    /// </remarks>
    private static void ConfigureServicesInternal(IServiceCollection services, IConfiguration configuration)
    {
        // injecting auto-mapper
        services.AddAutoMapper(typeof(AutoMapperProfile));

        // inject mediatr
        services.AddMediatR(Assembly.GetExecutingAssembly());

        // inject ef-core dbcontexts (after fetching connection string from azure keyvault).
        var productsDbConnectionString = configuration[KeyVaultConstants.SecretNameProductsDbConnectionString];
        services.AddDbContext<ProductsDbContext>(options => options.UseSqlServer(productsDbConnectionString));

        var profilesDbConnectionString = configuration[KeyVaultConstants.SecretNameProfilesDbConnectionString];
        services.AddDbContext<ProfilesDbContext>(options => options.UseSqlServer(profilesDbConnectionString));

        // injecting the cosmosdb clients
        var stocksDbConnectionString = configuration[KeyVaultConstants.SecretNameStocksDbConnectionString];
        services.AddSingleton(_ => new CosmosClient(stocksDbConnectionString).GetDatabase(CosmosConstants.DatabaseNameStocks));

        var cartsDbConnectionString = configuration[KeyVaultConstants.SecretNameCartsDbConnectionString];
        services.AddSingleton(_ => new CosmosClient(cartsDbConnectionString).GetDatabase(CosmosConstants.DatabaseNameCarts));

        // inject services
        services
            .AddScoped<ICartService, CartService>()
            .AddScoped<IProductService, ProductService>()
            .AddScoped<IStockService, StockService>()
            .AddScoped<IProfileService, ProfileService>()
            .AddScoped<IImageAnalysisService, ImageAnalysisService>()
            .AddScoped<IImageSearchService, ImageSearchService>();

        // inject repositories
        services
            .AddScoped<ICartRepository, CartRepository>()
            .AddScoped<IStockRepository, StockRepository>();
    }


    private static void ConfigureAspNetCoreServices(IServiceCollection services, IConfiguration configuration)
    {
        services.AddControllers();
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen();

        var appInsightsConnectionString = configuration[KeyVaultConstants.SecretNameAppInsightsConnectionString];
        services.AddApplicationInsightsTelemetry(options => options.ConnectionString = appInsightsConnectionString);

        // @TODO: Temporary. Fix later.
        services.AddCors(options =>
            options.AddPolicy(_allowSpecificOrigins,
                policy => policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod()));

        IdentityModelEventSource.ShowPII = true;
    }


    /// <remarks>
    ///     Add middleware to the asp.net core request pipeline.
    ///     Note: COR pattern applies, ordering matters.
    /// </remarks>
    private static void ConfigureAspNetCoreMiddleware(WebApplication app)
    {
        app.UseSwagger();
        app.UseSwaggerUI();

        app.UseHttpsRedirection();
        app.UseCors(_allowSpecificOrigins);

#if TODO_INVESTIGATE_LATER
        app.UseAuthorization(); // very important, else [Authorize] will not work in controllers.
        app.UseAuthentication();
#endif

        app.MapControllers();
    }
}