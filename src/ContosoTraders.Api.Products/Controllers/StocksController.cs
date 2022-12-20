namespace ContosoTraders.Api.Products.Controllers;

[Route("v1/[controller]")]
[Produces("application/json")]
public class StocksController : ContosoTradersControllerBase
{
    public StocksController(IMediator mediator) : base(mediator)
    {
    }

    [HttpGet("{id:int}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetStock(int id)
    {
        var request = new GetStockRequest
        {
            ProductId = id
        };

        return await ProcessHttpRequestAsync(request);
    }

    [HttpPost("{id:int}/consume")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> DecrementStockCount(int id)
    {
        var request = new DecrementStockCountRequest
        {
            ProductId = id
        };

        return await ProcessHttpRequestAsync(request);
    }
}