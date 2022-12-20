namespace ContosoTraders.Api.Core.Requests.Validators;

public class SearchTextRequestValidator : AbstractValidator<SearchTextRequest>
{
    public SearchTextRequestValidator()
    {
        RuleFor(request => request)
            .NotNull();

        RuleFor(request => request.Text)
            .NotNull();
    }
}