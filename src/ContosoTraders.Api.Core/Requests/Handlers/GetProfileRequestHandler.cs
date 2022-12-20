using MediatR.Pipeline;

namespace ContosoTraders.Api.Core.Requests.Handlers;

internal class GetProfileRequestHandler : RequestHandler<GetProfileRequest, IActionResult>, IRequestPreProcessor<GetProfileRequest>
{
    private readonly IProfileService _profileService;

    public GetProfileRequestHandler(IProfileService profileService)
    {
        _profileService = profileService;
    }

    public async Task Process(GetProfileRequest request, CancellationToken cancellationToken)
    {
        var validator = new GetProfileRequestValidator();

        await validator.ValidateAndThrowAsync(request, cancellationToken);
    }

    protected override IActionResult Handle(GetProfileRequest request)
    {
        var profileDto = _profileService.GetProfile(request.Email);

        return new OkObjectResult(profileDto);
    }
}