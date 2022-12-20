using MediatR.Pipeline;

namespace ContosoTraders.Api.Core.Requests.Handlers;

internal class GetProfilesRequestHandler : RequestHandler<GetProfilesRequest, IActionResult>, IRequestPreProcessor<GetProfilesRequest>
{
    private readonly IProfileService _profileService;

    public GetProfilesRequestHandler(IProfileService profileService)
    {
        _profileService = profileService;
    }

    public async Task Process(GetProfilesRequest request, CancellationToken cancellationToken)
    {
        var validator = new GetProfilesRequestValidator();

        await validator.ValidateAndThrowAsync(request, cancellationToken);
    }

    protected override IActionResult Handle(GetProfilesRequest request)
    {
        var profileDtos = _profileService.GetAllProfiles();

        return new OkObjectResult(profileDtos);
    }
}