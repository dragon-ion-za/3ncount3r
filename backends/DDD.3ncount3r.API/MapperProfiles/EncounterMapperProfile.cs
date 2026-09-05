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
        .ForMember(dest => dest.SelectedParty, m => m.MapFrom(source => source.Parties.Any() ? source.Parties.First().Name : ""))
        .ReverseMap()
        .ForMember(dest => dest.Id, m => m.MapFrom(source => string.IsNullOrEmpty(source.Id) ? ObjectId.Empty : ObjectId.Parse(source.Id)))
        .ForMember(dest => dest.PartyId, m => m.MapFrom(source => string.IsNullOrEmpty(source.PartyId) ? ObjectId.Empty : ObjectId.Parse(source.PartyId)));
      CreateMap<EncounterCreatureModel, EncounterCreatureViewModel>().ReverseMap();
      CreateMap<HitpointModel, HitpointViewModel>().ReverseMap();
    }
  }
}
