using MediatR.Pipeline;

namespace ContosoTraders.Api.Core.Requests.Handlers;

internal class RemoveItemFromCartRequestHandler : IRequestPreProcessor<RemoveItemFromCartRequest>, IRequestHandler<RemoveItemFromCartRequest, IActionResult>
{
    private readonly ICartService _cartService;

    public RemoveItemFromCartRequestHandler(ICartService cartService)
    {
        _cartService = cartService;
    }

    public async Task<IActionResult> Handle(RemoveItemFromCartRequest request, CancellationToken cancellationToken)
    {
        await _cartService.RemoveItemFromCartAsync(request.CartItem, cancellationToken);

        return new OkObjectResult($"Product removed from cart, id: {request.CartItem.ProductId}");
    }

    public async Task Process(RemoveItemFromCartRequest request, CancellationToken cancellationToken)
    {
        var validator = new RemoveItemFromCartRequestValidator();

        await validator.ValidateAndThrowAsync(request, cancellationToken);
    }
}