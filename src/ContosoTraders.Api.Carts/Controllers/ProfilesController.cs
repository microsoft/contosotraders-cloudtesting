namespace ContosoTraders.Api.Carts.Controllers;

[Route("v1/[controller]")]
public class ProfilesController : ContosoTradersControllerBase
{
    public ProfilesController(IMediator mediator) : base(mediator)
    {
    }

    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetProfiles()
    {
        var request = new GetProfilesRequest();

        return await ProcessHttpRequestAsync(request);
    }

    [HttpGet("me")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetProfile([FromHeader(Name = RequestHeaderConstants.HeaderNameUserEmail)] string userEmail)
    {
        var request = new GetProfileRequest
        {
            Email = userEmail
        };

        return await ProcessHttpRequestAsync(request);
    }
}