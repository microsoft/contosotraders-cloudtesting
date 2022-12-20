namespace ContosoTraders.Api.Core.Requests.Validators;

public class UpdateCartItemQuantityRequestValidator : AbstractValidator<UpdateCartItemQuantityRequest>
{
    public UpdateCartItemQuantityRequestValidator()
    {
        RuleFor(request => request)
            .NotNull();

        RuleFor(request => request.CartItem)
            .NotNull();

        RuleFor(request => request.CartItem.CartItemId)
            .NotNull()
            .WithMessage("CartItemId cannot be null/empty.");

        RuleFor(request => request.CartItem.Quantity)
            .NotNull()
            .WithMessage("Quantity cannot be null/empty.");
    }
}