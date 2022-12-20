namespace ContosoTraders.Api.Core.Requests.Definitions;

public class SearchTextRequest : IRequest<IActionResult>
{
    public string Text { get; set; }
}