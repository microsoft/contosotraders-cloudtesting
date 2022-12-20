namespace ContosoTraders.Api.Core.Exceptions;

public abstract class ContosoTradersBaseException : Exception
{
    protected ContosoTradersBaseException(string message) : base(message)
    {
    }

    public abstract IActionResult ToActionResult();
}