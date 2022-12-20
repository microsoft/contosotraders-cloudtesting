using MediatR.Pipeline;

namespace ContosoTraders.Api.Core.Requests.Handlers;

internal class PostImageRequestHandler : IRequestPreProcessor<PostImageRequest>, IRequestHandler<PostImageRequest, IActionResult>
{
    private readonly IImageSearchService _imageSearchService;

    public PostImageRequestHandler(IImageSearchService imageSearchService)
    {
        _imageSearchService = imageSearchService;
    }

    public async Task<IActionResult> Handle(PostImageRequest request, CancellationToken cancellationToken = default)
    {
        if (!request.File.ContentType.Contains("image"))
            return new BadRequestObjectResult("Invalid file type.");

        var products = await _imageSearchService.GetSimilarProductsAsync(request.File.OpenReadStream(), cancellationToken);

        return new OkObjectResult(products);
    }

    public async Task Process(PostImageRequest request, CancellationToken cancellationToken)
    {
        var validator = new PostImageRequestValidator();

        await validator.ValidateAndThrowAsync(request, cancellationToken);
    }
}