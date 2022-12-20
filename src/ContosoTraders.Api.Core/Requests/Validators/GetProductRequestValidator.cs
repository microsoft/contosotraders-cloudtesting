namespace ContosoTraders.Api.Core.Requests.Validators;

public class GetProductRequestValidator : AbstractValidator<GetProductRequest>
{
    public GetProductRequestValidator()
    {
        RuleFor(request => request)
            .NotNull();

        RuleFor(request => request.ProductId)
            .GreaterThan(0);
    }
}