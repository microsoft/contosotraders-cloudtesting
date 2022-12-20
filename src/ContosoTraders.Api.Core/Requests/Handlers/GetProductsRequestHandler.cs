using MediatR.Pipeline;

namespace ContosoTraders.Api.Core.Requests.Handlers;

internal class GetProductsRequestHandler : RequestHandler<GetProductsRequest, IActionResult>, IRequestPreProcessor<GetProductsRequest>
{
    private readonly IProductService _productService;

    public GetProductsRequestHandler(IProductService productService)
    {
        _productService = productService;
    }

    public async Task Process(GetProductsRequest request, CancellationToken cancellationToken)
    {
        var validator = new GetProductsRequestValidator();

        await validator.ValidateAndThrowAsync(request, cancellationToken);
    }

    protected override IActionResult Handle(GetProductsRequest request)
    {
        var brands = _productService.GetBrands();

        var types = _productService.GetTypes();

        var typeIds = types
            .Where(t => request.Types.Contains(t.Code))
            .Select(t => t.Id)
            .ToArray();

        var productDtos = _productService.GetProducts(request.Brands, typeIds);

        if (!productDtos.Any()) return new NoContentResult();

        var aggregateResponse = new
        {
            Products = productDtos,
            Brands = brands,
            Types = types
        };

        return new OkObjectResult(aggregateResponse);
    }
}