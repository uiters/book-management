using System.Collections.Generic;
using Duende.IdentityServer.Models;

namespace book_management_helpers.Configurations;

public static class IdentityConfig
{
    public static IEnumerable<IdentityResource> IdentityResources =>
        new List<IdentityResource>
        {
            new IdentityResources.OpenId(),
            new IdentityResources.Profile(),
        };

    public static IEnumerable<ApiScope> ApiScopes =>
        new List<ApiScope>
        { 
            new ApiScope("api1", "My API") 
        };

    public static IEnumerable<ApiResource> ApiResources =>
        new List<ApiResource>
        {
            new ApiResource("identity.api", "Identity API"),
            new ApiResource("test.api", "Test API")
        };

    public static IEnumerable<Client> Clients =>
        new List<Client>
        {
            // machine to machine client
            new Client
            {
                ClientId = "client",

                // no interactive user, use the clientid/secret for authentication
                AllowedGrantTypes = GrantTypes.ClientCredentials,

                // secret for authentication
                ClientSecrets =
                {
                    new Secret("secret".Sha256())
                },

                // scopes that client has access to
                AllowedScopes = { "api1" }
            }
        };
}