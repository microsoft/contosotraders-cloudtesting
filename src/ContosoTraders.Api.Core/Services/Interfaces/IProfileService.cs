using Profile = ContosoTraders.Api.Core.Models.Implementations.Dao.Profile;

namespace ContosoTraders.Api.Core.Services.Interfaces;

internal interface IProfileService
{
    IEnumerable<Profile> GetAllProfiles();

    Profile GetProfile(string email);
}