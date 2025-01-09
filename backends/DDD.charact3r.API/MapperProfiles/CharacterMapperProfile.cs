using AutoMapper;
using DDD.charact3r.API.Models;
using DDD.charact3r.API.ViewModels;
using MongoDB.Bson;

namespace DDD.charact3r.API.MapperProfiles
{
  public class CharacterMapperProfile : Profile
  {
    public CharacterMapperProfile()
    {
      CreateMap<CharacterModel, CharacterViewModel>()
        .ReverseMap()
        .ForMember(dest => dest.Id, m => m.MapFrom(source => string.IsNullOrEmpty(source.Id) ? ObjectId.Empty : ObjectId.Parse(source.Id)));
      CreateMap<RaceModel, RaceViewModel>().ReverseMap();
      CreateMap<CharacterClassModel, CharacterClassViewModel>().ReverseMap();
      CreateMap<HitpointModel, HitpointViewModel>().ReverseMap();
      CreateMap<MovementSpeedModel, MovementSpeedViewModel>().ReverseMap();
      CreateMap<BonusModel, CharacterClassViewModel>().ReverseMap();
      CreateMap<FeatModel, FeatViewModel>().ReverseMap();
      CreateMap<EquipmentModel, EquipmentViewModel>().ReverseMap();
    }
  }
}
