namespace ContosoTraders.Api.Core.Requests.Validators;

public class AddItemToCartRequestValidator : AbstractValidator<AddItemToCartRequest>
{
    public AddItemToCartRequestValidator()
    {
        RuleFor(request => request)
            .NotNull();

        RuleFor(request => request.CartItem)
            .NotNull();

        RuleFor(request => request.CartItem.CartItemId)
            .NotEmpty()
            .WithMessage("CartItemId cannot be empty/null");
    }
}