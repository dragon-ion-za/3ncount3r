using AutoMapper;
using DDD._3ncount3r.API.Models;
using DDD._3ncount3r.API.ViewModels;
using MongoDB.Bson;

namespace DDD._3ncount3r.API.MapperProfiles
{
  public class PartyMapperProfile : Profile
  {
    public PartyMapperProfile()
    {
      CreateMap<PartyModel, PartyViewModel>()
        .ReverseMap()
        .ForMember(dest => dest.Id, m => m.MapFrom(source => string.IsNullOrEmpty(source.Id) ? ObjectId.Empty : ObjectId.Parse(source.Id)));
    }
  }
}
