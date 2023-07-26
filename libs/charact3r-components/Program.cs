using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using Charact3rComponents;
using Charact3rComponents.Pages;
using MudBlazor.Services;

var builder = WebAssemblyHostBuilder.CreateDefault(args);

//builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });
builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri("http://localhost:4202/") });
builder.Services.AddMudServices();

builder.RootComponents.RegisterCustomElement<AppRoot>("app-main");

await builder.Build().RunAsync();
