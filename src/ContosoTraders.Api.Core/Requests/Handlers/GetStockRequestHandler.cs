using MediatR.Pipeline;

namespace ContosoTraders.Api.Core.Requests.Handlers;

internal class GetStockRequestHandler : IRequestPreProcessor<GetStockRequest>, IRequestHandler<GetStockRequest, IActionResult>
{
    private readonly IStockService _stockService;

    public GetStockRequestHandler(IStockService stockService)
    {
        _stockService = stockService;
    }

    public async Task<IActionResult> Handle(GetStockRequest request, CancellationToken cancellationToken)
    {
        var stockDto = await _stockService.GetStockAsync(request.ProductId, cancellationToken);

        return new OkObjectResult(stockDto);
    }

    public async Task Process(GetStockRequest request, CancellationToken cancellationToken)
    {
        var validator = new GetStockRequestValidator();

        await validator.ValidateAndThrowAsync(request, cancellationToken);
    }
}