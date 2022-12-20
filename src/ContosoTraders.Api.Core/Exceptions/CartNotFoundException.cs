namespace ContosoTraders.Api.Core.Exceptions;

public class CartNotFoundException : ContosoTradersBaseException
{
    public CartNotFoundException(string email)
        : base($"Shopping Cart for '{email}' could not be found.")
    {
    }

    public override IActionResult ToActionResult()
    {
        return new NotFoundObjectResult(Message);
    }
}