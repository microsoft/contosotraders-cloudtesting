using MediatR.Pipeline;

namespace ContosoTraders.Api.Core.Requests.Handlers;

internal class AddItemToCartRequestHandler : IRequestPreProcessor<AddItemToCartRequest>, IRequestHandler<AddItemToCartRequest, IActionResult>
{
    private readonly ICartService _cartService;

    public AddItemToCartRequestHandler(ICartService cartService)
    {
        _cartService = cartService;
    }

    public async Task<IActionResult> Handle(AddItemToCartRequest request, CancellationToken cancellationToken)
    {
        await _cartService.AddItemToCartAsync(request.CartItem, cancellationToken);

        var responseMessage = $"{request.CartItem.Name} added to shopping cart, id: {request.CartItem.ProductId}";

        return new ObjectResult(responseMessage) { StatusCode = 201 };
    }

    public async Task Process(AddItemToCartRequest request, CancellationToken cancellationToken)
    {
        var validator = new AddItemToCartRequestValidator();

        await validator.ValidateAndThrowAsync(request, cancellationToken);
    }
}