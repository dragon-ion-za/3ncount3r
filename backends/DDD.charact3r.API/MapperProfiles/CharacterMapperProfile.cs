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

      CreateMap<CharacterViewModel, CharacterModel>()
        .ForMember(x => x.Attributes, y => y.MapFrom(z => TranslateAttributesToKeyValuePair(z)));
    }

    private Dictionary<string, int> TranslateAttributesToKeyValuePair(CharacterViewModel viewModel)
    {
      return new Dictionary<string, int>() {
        { "STR", viewModel.AttributeStr },
        { "DEX", viewModel.AttributeDex },
        { "CON", viewModel.AttributeCon },
        { "WIS", viewModel.AttributeWis },
        { "INT", viewModel.AttributeInt },
        { "CHA", viewModel.AttributeCha }
      };
    }
  }
}
