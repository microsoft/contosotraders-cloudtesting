using Newtonsoft.Json;

namespace ContosoTraders.Api.Core.Models.Implementations.Dto;

public class AccessToken
{
    [JsonProperty(PropertyName = "token")] public string Token { get; set; }

    [JsonProperty(PropertyName = "token_type")]
    public string TokenType { get; set; }

    [JsonProperty(PropertyName = "expires_in")]
    public int ExpiresIn { get; set; }
}