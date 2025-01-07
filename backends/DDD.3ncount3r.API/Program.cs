using DDD._3ncount3r.API.Configurations;
using DDD._3ncount3r.API.MapperProfiles;
using DDD._3ncount3r.API.Models;
using DDD._3ncount3r.API.Services;
using DDD._3ncount3r.API.Validators;
using DDD._3ncount3r.API.ViewModels;
using DDD.Common.Configurations;
using DDD.Common.Services;
using FluentValidation;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

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

builder.Services.Configure<MongoDbConfig>(builder.Configuration.GetSection("3ncount3rContext"));
builder.Services.Configure<List<ByoapiConfig>>(builder.Configuration.GetSection("Byoapis"));

builder.Services.AddScoped<IDataService<EncounterModel>, EncountersService>();
builder.Services.AddScoped<IDataService<PartyModel>, PartiesService>();

builder.Services.AddAutoMapper(typeof(EncounterMapperProfile));
builder.Services.AddAutoMapper(typeof(PartyMapperProfile));

builder.Services.AddScoped<IValidator<EncounterViewModel>, EncounterValidator>();
builder.Services.AddScoped<IValidator<PartyViewModel>, PartyValidator>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
  app.UseSwagger();
  app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapControllers();

app.Run();
