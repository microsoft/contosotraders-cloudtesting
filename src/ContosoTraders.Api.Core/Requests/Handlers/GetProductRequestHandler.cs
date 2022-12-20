using MediatR.Pipeline;

namespace ContosoTraders.Api.Core.Requests.Handlers;

internal class GetProductRequestHandler : IRequestPreProcessor<GetProductRequest>, IRequestHandler<GetProductRequest, IActionResult>
{
    private readonly IProductService _productService;

    private readonly IStockService _stockService;

    public GetProductRequestHandler(IProductService productService, IStockService stockService)
    {
        _productService = productService;
        _stockService = stockService;
    }

    public async Task<IActionResult> Handle(GetProductRequest request, CancellationToken cancellationToken)
    {
        var productDto = _productService.GetProduct(request.ProductId);

        try
        {
            var stockDto = await _stockService.GetStockAsync(request.ProductId, cancellationToken);
            productDto.StockUnits = stockDto.StockCount;
        }
        catch (StockNotFoundException)
        {
            productDto.StockUnits = 0;
        }

        return new OkObjectResult(productDto);
    }

    public async Task Process(GetProductRequest request, CancellationToken cancellationToken)
    {
        var validator = new GetProductRequestValidator();

        await validator.ValidateAndThrowAsync(request, cancellationToken);
    }
}