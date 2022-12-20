namespace ContosoTraders.Api.Core.Requests.Validators;

public class RemoveItemFromCartRequestValidator : AbstractValidator<RemoveItemFromCartRequest>
{
    public RemoveItemFromCartRequestValidator()
    {
        RuleFor(request => request)
            .NotNull();

        RuleFor(request => request.CartItem)
            .NotNull();

        RuleFor(request => request.CartItem.CartItemId)
            .NotEmpty()
            .WithMessage("CartItemId cannot be null/empty.");

        RuleFor(request => request.CartItem.Email)
            .NotEmpty()
            .WithMessage("Email cannot be null/empty.");
    }
}