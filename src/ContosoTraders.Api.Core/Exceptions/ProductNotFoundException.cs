namespace ContosoTraders.Api.Core.Exceptions;

public class ProductNotFoundException : ContosoTradersBaseException
{
    public ProductNotFoundException(int productId)
        : base($"Product with id '{productId}' could not be found.")
    {
    }

    public override IActionResult ToActionResult()
    {
        return new NotFoundObjectResult(Message);
    }
}