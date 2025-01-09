using DDD.Byoapi.Integrations.Configurations;
using DDD.Byoapi.Integrations.Models;
using DDD.Byoapi.Integrations.Services;
using DDD.orch3strator.Converters;
using DDD.orch3strator.Models.CharacterService;
using DDD.orch3strator.Models.EncounterService;
using DDD.orch3strator.Models.PartyService;
using DDD.orch3strator.Services;
using DDD.orch3strator.Strategies.Characters;
using DDD.orch3strator.Strategies.Creatures;
using DDD.orch3strator.Strategies.Encounters;
using DDD.orch3strator.Strategies.Parties;
using DDD.orch3strator.ViewModels;
using DDD.orch3strator.ViewModels.DnD5e;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddCors(options => {
  options.AddPolicy(name: "Allow3ncount3r", policy =>
  {
    policy.WithOrigins(builder.Configuration["AllowedHosts"]).WithHeaders("*");
    policy.WithMethods("GET", "PUT", "POST");
  });
});
builder.Services.AddControllers();
builder.Services.AddAuthentication(options => {
  options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
  options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options => {
  options.Authority = builder.Configuration["Auth0:Authority"];
  options.Audience = builder.Configuration["Auth0:Audience"];
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(option =>
{
  option.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
  {
    In = ParameterLocation.Header,
    Description = "Please enter a valid token",
    Name = "Authorization",
    Type = SecuritySchemeType.Http,
    BearerFormat = "JWT",
    Scheme = "Bearer"
  });
  option.AddSecurityRequirement(new OpenApiSecurityRequirement
  {
    {
      new OpenApiSecurityScheme
      {
        Reference = new OpenApiReference
        {
          Type = ReferenceType.SecurityScheme,
          Id = "Bearer"
        }
      },
      new string[] { }
    }
  });
});

builder.Services.Configure<List<ByoapiConfig>>(builder.Configuration.GetSection("Byoapis"));
builder.Services.AddScoped<IByoapiService, ByoapiService>();
builder.Services.AddScoped<DataApiBaseService<EncounterModel>, EncounterService>((x) => { return new EncounterService(builder.Configuration.GetValue<string>("3ncount3rServiceBaseUrl")); });
builder.Services.AddScoped<DataApiBaseService<PartyModel>, PartyService>((x) => { return new PartyService(builder.Configuration.GetValue<string>("3ncount3rServiceBaseUrl")); });
builder.Services.AddScoped<DataApiBaseService<CharacterModel>, CharacterService>((x) => { return new CharacterService(builder.Configuration.GetValue<string>("charact3rServiceBaseUrl")); });

builder.Services.AddScoped<IModelConverterFactory, ModelConverterFactory>();
builder.Services.AddKeyedScoped<IModelConverter<CreatureModel, CreatureViewModel>, DnD5eCreatureModelConverter>("dnd5e");
builder.Services.AddKeyedScoped<IModelConverter<EncounterModel, EncounterViewModel>, Dnd5eEncounterModelConverter>("dnd5e");

builder.Services.AddKeyedScoped<EncounterBaseStrategy, DnD5eEncounterStrategy>("dnd5e");
builder.Services.AddKeyedScoped<CreatureBaseStrategy, DnD5eCreatureStrategy>("dnd5e");
builder.Services.AddKeyedScoped<PartyBaseStrategy, DnD5ePartyStrategy>("dnd5e");
builder.Services.AddKeyedScoped<CharacterBaseStrategy, DnD5eCharacterStrategy>("dnd5e");

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
  app.UseSwagger();
  app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("Allow3ncount3r");

app.UseAuthorization();
app.UseAuthorization();

app.MapControllers().RequireAuthorization();

app.Run();
