namespace ContosoTraders.Api.Core.Services.Interfaces;

internal interface IImageAnalysisService
{
    /// <summary>
    /// </summary>
    /// <param name="imageStream"></param>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    Task<IEnumerable<string>> AnalyzeImageAsync(Stream imageStream, CancellationToken cancellationToken = default);
}