using MediatR.Pipeline;

namespace ContosoTraders.Api.Core.Requests.Handlers;

internal class DecrementStockCountRequestHandler : IRequestPreProcessor<DecrementStockCountRequest>, IRequestHandler<DecrementStockCountRequest, IActionResult>
{
    private readonly IStockService _stockService;

    public DecrementStockCountRequestHandler(IStockService stockService)
    {
        _stockService = stockService;
    }

    public async Task<IActionResult> Handle(DecrementStockCountRequest request, CancellationToken cancellationToken)
    {
        var stockCountDto = await _stockService.DecrementStockCountAsync(request.ProductId, cancellationToken);

        return new OkObjectResult(stockCountDto);
    }

    public async Task Process(DecrementStockCountRequest request, CancellationToken cancellationToken)
    {
        var validator = new DecrementStockCountRequestValidator();

        await validator.ValidateAndThrowAsync(request, cancellationToken);
    }
}