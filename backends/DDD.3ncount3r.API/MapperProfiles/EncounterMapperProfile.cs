using AutoMapper;
using DDD._3ncount3r.API.Models;
using DDD._3ncount3r.API.ViewModels;
using MongoDB.Bson;

namespace DDD._3ncount3r.API.MapperProfiles
{
  public class EncounterMapperProfile : Profile
  {
    public EncounterMapperProfile()
    {
      CreateMap<EncounterModel, EncounterViewModel>()
        .ReverseMap()
        .ForMember(dest => dest.Id, m => m.MapFrom(source => string.IsNullOrEmpty(source.Id) ? ObjectId.Empty : ObjectId.Parse(source.Id)));
      CreateMap<EncounterCreatureModel, EncounterCreatureViewModel>().ReverseMap();
    }
  }
}
