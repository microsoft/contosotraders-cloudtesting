namespace ContosoTraders.Api.Core.Requests.Definitions;

public class UpdateCartItemQuantityRequest : IRequest<IActionResult>
{
    public CartDto CartItem { get; set; }
}