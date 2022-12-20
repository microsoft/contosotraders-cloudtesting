using MediatR.Pipeline;

namespace ContosoTraders.Api.Core.Requests.Handlers;

internal class SearchTextRequestHandler : IRequestPreProcessor<SearchTextRequest>, IRequestHandler<SearchTextRequest, IActionResult>
{
    private readonly IProductService _productService;

    public SearchTextRequestHandler(IProductService productService)
    {
        _productService = productService;
    }

    public async Task<IActionResult> Handle(SearchTextRequest request, CancellationToken cancellationToken = default)
    {
        var products = await Task.FromResult(_productService.GetProducts(request.Text));

        return new OkObjectResult(products);
    }

    public async Task Process(SearchTextRequest request, CancellationToken cancellationToken)
    {
        var validator = new SearchTextRequestValidator();

        await validator.ValidateAndThrowAsync(request, cancellationToken);
    }
}