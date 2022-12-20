namespace ContosoTraders.Api.Core.Requests.Validators;

public class GetStockRequestValidator : AbstractValidator<GetStockRequest>
{
    public GetStockRequestValidator()
    {
        RuleFor(request => request)
            .NotNull();

        RuleFor(request => request.ProductId)
            .GreaterThan(0);
    }
}