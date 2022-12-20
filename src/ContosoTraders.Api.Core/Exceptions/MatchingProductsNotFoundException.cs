namespace ContosoTraders.Api.Core.Exceptions;

public class MatchingProductsNotFoundException : ContosoTradersBaseException
{
    public MatchingProductsNotFoundException(string tags)
        : base($"No matching products found for tags :  {tags}")
    {
    }

    public override IActionResult ToActionResult()
    {
        return new NotFoundObjectResult(Message);
    }
}