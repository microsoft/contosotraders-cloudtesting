using Newtonsoft.Json;

namespace ContosoTraders.Api.Core.Models.Implementations.Dto;

public class TokenRequest
{
    public string Username { get; set; }

    public string Password { get; set; }

    [JsonProperty(PropertyName = "grant_type")]
    public string GrantType { get; set; }
}