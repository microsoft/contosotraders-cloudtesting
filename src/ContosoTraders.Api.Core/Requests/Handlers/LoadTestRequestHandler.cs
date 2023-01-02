namespace ContosoTraders.Api.Core.Requests.Handlers;

internal class LoadTestRequestHandler : IRequestHandler<LoadTestRequest, IActionResult>
{
    private readonly ICartService _cartService;

    public LoadTestRequestHandler(ICartService cartService)
    {
        _cartService = cartService;
    }

    public async Task<IActionResult> Handle(LoadTestRequest request, CancellationToken cancellationToken)
    {
        const string email = "testuser@contosotraders.com";

        IEnumerable<CartDto> cartDtos;

        try
        {
            cartDtos = await _cartService.GetCartAsync(email, cancellationToken);
        }
        catch (CartNotFoundException)
        {
            var newCartDto = new CartDto
            {
                Email = email,
                Quantity = 1,
                ProductId = 17,
                Name = "Dell Optiplex 380 17 inch (43.18 cms) Desktop",
                Price = 1399,
                ImageUrl = "https://contoso-traders-imagesctprod.azureedge.net/product-details/PID17-1.jpg",
                CartItemId = Guid.NewGuid().ToString()
            };

            await _cartService.AddItemToCartAsync(newCartDto, cancellationToken);

            cartDtos = await _cartService.GetCartAsync(email, cancellationToken);
        }

        foreach (var cartDto in cartDtos)
        {
            cartDto.Quantity += 1;

            await _cartService.UpdateCartItemQuantityAsync(cartDto, cancellationToken);
        }

        return new OkResult();
    }
}