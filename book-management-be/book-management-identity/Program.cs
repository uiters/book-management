using book_management_helpers.Configurations;
using Duende.IdentityServer.EntityFramework.DbContexts;
using Duende.IdentityServer.EntityFramework.Mappers;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddIdentityServer(options =>
    {
        options.Events.RaiseErrorEvents = true;
        options.Events.RaiseInformationEvents = true;
        options.Events.RaiseFailureEvents = true;
        options.Events.RaiseSuccessEvents = true;
    })
    .AddDeveloperSigningCredential()
    .AddInMemoryIdentityResources(IdentityConfig.IdentityResources)
    .AddInMemoryApiResources(IdentityConfig.ApiResources)
    .AddInMemoryClients(IdentityConfig.Clients)
    .AddConfigurationStore(options =>
    {
        options.ConfigureDbContext = b => b.UseSqlServer(builder.Configuration.GetConnectionString("IdentityDatabase")
            , sql => sql.MigrationsAssembly("book-management-identity"));
    })
    .AddOperationalStore(options =>
    {
        options.ConfigureDbContext = b => b.UseSqlServer(builder.Configuration.GetConnectionString("IdentityDatabase")
        ,sql => sql.MigrationsAssembly("book-management-identity"));
    });



var app = builder.Build();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

InitializeDatabase(app);

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

void InitializeDatabase(IApplicationBuilder app)
{
    using var serviceScope = app.ApplicationServices.GetService<IServiceScopeFactory>()?.CreateScope();
    serviceScope?.ServiceProvider.GetRequiredService<PersistedGrantDbContext>().Database.Migrate();

    var context = serviceScope?.ServiceProvider.GetRequiredService<ConfigurationDbContext>();
    context?.Database.Migrate();
    if (context != null && !context.Clients.Any())
    {
        foreach (var client in IdentityConfig.Clients)
        {
            context.Clients.Add(client.ToEntity());
        }
        context.SaveChanges();
    }

    if (context != null && !context.IdentityResources.Any())
    {
        foreach (var resource in IdentityConfig.IdentityResources)
        {
            context.IdentityResources.Add(resource.ToEntity());
        }
        context.SaveChanges();
    }

    if (context == null || context.ApiScopes.Any()) return;
    {
        foreach (var resource in IdentityConfig.ApiScopes)
        {
            context.ApiScopes.Add(resource.ToEntity());
        }
        context.SaveChanges();
    }
}