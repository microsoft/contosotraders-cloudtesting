namespace ContosoTraders.Api.Core.Requests.Validators;

public class PostImageRequestValidator : AbstractValidator<PostImageRequest>
{
    public PostImageRequestValidator()
    {
        RuleFor(request => request)
            .NotNull();

        RuleFor(request => request.File)
            .NotNull();
    }
}