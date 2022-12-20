namespace ContosoTraders.Api.Core.Requests.Validators;

public class GetCartRequestValidator : AbstractValidator<GetCartRequest>
{
    public GetCartRequestValidator()
    {
        RuleFor(request => request)
            .NotNull();

        RuleFor(request => request.Email)
            .NotEmpty()
            .WithMessage("Email cannot be null/empty.");

        RuleFor(request => request.Email)
            .EmailAddress()
            .WithMessage("Incorrect format for Email.");
    }
}