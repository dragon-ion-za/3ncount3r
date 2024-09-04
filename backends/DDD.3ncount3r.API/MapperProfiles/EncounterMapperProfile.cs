using AutoMapper;
using DDD._3ncount3r.API.Models;
using DDD._3ncount3r.API.ViewModels;

namespace DDD._3ncount3r.API.MapperProfiles
{
  public class EncounterMapperProfile : Profile
  {
    public EncounterMapperProfile()
    {
      CreateMap<EncounterModel, EncounterViewModel>();
      CreateMap<EncounterCreatureModel, EncounterCreatureViewModel>();
    }
  }
}
