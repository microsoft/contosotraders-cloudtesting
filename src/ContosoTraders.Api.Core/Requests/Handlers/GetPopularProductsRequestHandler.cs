using MediatR.Pipeline;

namespace ContosoTraders.Api.Core.Requests.Handlers;

internal class GetPopularProductsRequestHandler : IRequestPreProcessor<GetPopularProductsRequest>, IRequestHandler<GetPopularProductsRequest, IActionResult>
{
    /// <remarks>
    ///     @TODO: To be implemented later.
    /// </remarks>
    public async Task<IActionResult> Handle(GetPopularProductsRequest request, CancellationToken cancellationToken)
    {
        var result = new OkResult();

        return await Task.FromResult(result);
    }

    public async Task Process(GetPopularProductsRequest request, CancellationToken cancellationToken)
    {
        var validator = new GetPopularProductsRequestValidator();

        await validator.ValidateAndThrowAsync(request, cancellationToken);
    }
}