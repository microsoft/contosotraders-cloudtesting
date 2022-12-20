namespace ContosoTraders.Api.Core.Services.Implementations;

internal class ImageAnalysisService : ContosoTradersServiceBase, IImageAnalysisService
{
    public ImageAnalysisService(IMapper mapper, IConfiguration configuration, ILogger<ImageAnalysisService> logger) : base(mapper, configuration, logger)
    {
    }

    public async Task<IEnumerable<string>> AnalyzeImageAsync(Stream imageStream, CancellationToken cancellationToken = default)
    {
        var client = GetComputerVisionClient();

        var features = new List<VisualFeatureTypes?>
        {
            VisualFeatureTypes.Tags
        };

        var results = await client.AnalyzeImageInStreamAsync(imageStream, features, cancellationToken: cancellationToken);

        var searchTerms = results.Tags
            .Select(tag => tag.Name)
            .ToList();

        return searchTerms;
    }

    private ComputerVisionClient GetComputerVisionClient()
    {
        var accountKey = Configuration[KeyVaultConstants.SecretNameCognitiveServicesAccountKey];

        var endpoint = Configuration[KeyVaultConstants.SecretNameCognitiveServicesEndpoint];

        var credentials = new ApiKeyServiceClientCredentials(accountKey);

        var client = new ComputerVisionClient(credentials)
        {
            Endpoint = endpoint
        };

        return client;
    }
}