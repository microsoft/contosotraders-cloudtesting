namespace ContosoTraders.Api.Core.Requests.Definitions;

public class GetProfileRequest : IRequest<IActionResult>
{
    public string Email { get; set; }
}