using AutoMapper;
using DDD.charact3r.API.Models;
using DDD.charact3r.API.ViewModels;

namespace DDD.charact3r.API.MapperProfiles
{
  public class CharacterMapperProfile : Profile
  {
    public CharacterMapperProfile()
    {
      CreateMap<CharacterModel, CharacterViewModel>();
      CreateMap<CharacterClassModel, CharacterClassViewModel>();
      CreateMap<EquipmentModel, EquipmentViewModel>();
    }
  }
}
