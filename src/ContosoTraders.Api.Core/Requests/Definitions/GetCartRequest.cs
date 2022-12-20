namespace ContosoTraders.Api.Core.Requests.Definitions;

public class GetCartRequest : IRequest<IActionResult>
{
    public string Email { get; set; }
}