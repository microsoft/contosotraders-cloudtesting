namespace ContosoTraders.Api.Core.Requests.Definitions;

public class PostImageRequest : IRequest<IActionResult>
{
    public IFormFile File { get; set; }
}