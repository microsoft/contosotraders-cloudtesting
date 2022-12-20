namespace ContosoTraders.Api.Core.Exceptions;

public class ProfileNotFoundException : ContosoTradersBaseException
{
    public ProfileNotFoundException(string email)
        : base($"Profile for email '{email}' could not be found.")
    {
    }

    public override IActionResult ToActionResult()
    {
        return new NotFoundObjectResult(Message);
    }
}