namespace ContosoTraders.Api.Core.Controllers;

[ApiController]
public class ContosoTradersControllerBase : ControllerBase
{
    private readonly IMediator _mediator;

    protected ContosoTradersControllerBase(IMediator mediator)
    {
        _mediator = mediator;
    }

    protected async Task<IActionResult> ProcessHttpRequestAsync(IRequest<IActionResult> request)
    {
        try
        {
            return await _mediator.Send(request);
        }
        catch (ContosoTradersBaseException contosoTradersBaseException)
        {
            return contosoTradersBaseException.ToActionResult();
        }
        catch (ValidationException validationException)
        {
            return new BadRequestObjectResult(validationException.Message);
        }
    }
}