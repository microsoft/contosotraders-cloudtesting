using MediatR.Pipeline;

namespace ContosoTraders.Api.Core.Requests.Handlers;

internal class GetCartRequestHandler : IRequestPreProcessor<GetCartRequest>, IRequestHandler<GetCartRequest, IActionResult>
{
    private readonly ICartService _cartService;

    public GetCartRequestHandler(ICartService cartService)
    {
        _cartService = cartService;
    }

    public async Task<IActionResult> Handle(GetCartRequest request, CancellationToken cancellationToken)
    {
        var cartItemsDto = await _cartService.GetCartAsync(request.Email, cancellationToken);

        return new OkObjectResult(cartItemsDto);
    }

    public async Task Process(GetCartRequest request, CancellationToken cancellationToken)
    {
        var validator = new GetCartRequestValidator();

        await validator.ValidateAndThrowAsync(request, cancellationToken);
    }
}