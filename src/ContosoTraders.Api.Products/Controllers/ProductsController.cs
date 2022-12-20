namespace ContosoTraders.Api.Products.Controllers;

[Route("v1/[controller]")]
[Produces("application/json")]
public class ProductsController : ContosoTradersControllerBase
{
    public ProductsController(IMediator mediator) : base(mediator)
    {
    }


    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetProducts(
        [FromQuery(Name = "brand")] int[] brands,
        [FromQuery(Name = "type")] string[] types)
    {
        var request = new GetProductsRequest
        {
            Brands = brands,
            Types = types
        };

        return await ProcessHttpRequestAsync(request);
    }


    [HttpGet("{id:int}")]
    [ProducesResponseType(typeof(ProductDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetProduct(int id)
    {
        var request = new GetProductRequest
        {
            ProductId = id
        };

        return await ProcessHttpRequestAsync(request);
    }


    [HttpGet("landing")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetPopularProducts()
    {
        var request = new GetPopularProductsRequest();

        return await ProcessHttpRequestAsync(request);
    }


    [HttpPost("imageclassifier")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> PostImage(IFormFile file)
    {
        var request = new PostImageRequest
        {
            File = file
        };

        return await ProcessHttpRequestAsync(request);
    }

    [HttpGet("search/{text}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Search(string text)
    {
        var request = new SearchTextRequest
        {
            Text = text
        };

        return await ProcessHttpRequestAsync(request);
    }
}