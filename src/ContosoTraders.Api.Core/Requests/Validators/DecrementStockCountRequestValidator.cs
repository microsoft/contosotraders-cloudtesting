namespace ContosoTraders.Api.Core.Requests.Validators;

public class DecrementStockCountRequestValidator : AbstractValidator<DecrementStockCountRequest>
{
    public DecrementStockCountRequestValidator()
    {
        RuleFor(request => request)
            .NotNull();

        RuleFor(request => request.ProductId)
            .GreaterThan(0);
    }
}