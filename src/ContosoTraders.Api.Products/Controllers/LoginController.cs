using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using ContosoTraders.Api.Core.Constants;
using Microsoft.IdentityModel.Tokens;

namespace ContosoTraders.Api.Products.Controllers;

[Route("v1/[controller]")]
[Produces("application/json")]
public class LoginController : ContosoTradersControllerBase
{
    private readonly IConfiguration config;

    public LoginController(IConfiguration config, IMediator mediator) : base(mediator)
    {
        this.config = config;
    }

    [HttpPost]
    public IActionResult Login([FromBody] TokenRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Username) || string.IsNullOrWhiteSpace(request.Password)) return BadRequest("Could not verify username and password");

        return Ok(new
        {
            access_token = CreateAccessToken(request.Username),
            refresh_token = ""
        });
    }

    private AccessToken CreateAccessToken(string username)
    {
        var claims = new[]
        {
            new Claim(ClaimTypes.Name, username),
            new Claim(ClaimTypes.Sid, Guid.NewGuid().ToString())
        };

        // demo only, do not do this in real life!
        var securityKey = config["SecurityKey"] ?? AuthConstants.DefaultJwtSigningKey;
        var encoding = Encoding.UTF8.GetBytes(securityKey);
        var key = new SymmetricSecurityKey(encoding);
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var expiresInDays = 365;

        var token = new JwtSecurityToken(
            claims: claims,
            issuer: config["Issuer"] ?? "ContosoWebsite",
            expires: DateTime.Now.AddDays(expiresInDays),
            signingCredentials: creds);

        return new AccessToken
        {
            Token = new JwtSecurityTokenHandler().WriteToken(token),
            ExpiresIn = expiresInDays * 24 * 60 * 60,
            TokenType = "bearer"
        };
    }
}