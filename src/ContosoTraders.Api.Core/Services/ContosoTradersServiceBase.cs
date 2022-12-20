namespace ContosoTraders.Api.Core.Services;

internal abstract class ContosoTradersServiceBase
{
    protected readonly IConfiguration Configuration;

    protected readonly ILogger<ContosoTradersServiceBase> Logger;

    protected readonly IMapper Mapper;

    protected ContosoTradersServiceBase(IMapper mapper, IConfiguration configuration, ILogger<ContosoTradersServiceBase> logger)
    {
        Mapper = mapper;
        Configuration = configuration;
        Logger = logger;
    }
}