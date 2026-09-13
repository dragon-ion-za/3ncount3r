using AutoMapper;
using DDD.charact3r.API.Models;
using DDD.Common.Contracts.Character;
using MongoDB.Bson;

namespace DDD.charact3r.API.MapperProfiles
{
  public class CharacterMapperProfile : Profile
  {
    public CharacterMapperProfile()
    {
      CreateMap<CharacterModel, CharacterContract>()
        .ReverseMap()
        .ForMember(dest => dest.Id, m => m.MapFrom(source => string.IsNullOrEmpty(source.Id) ? ObjectId.Empty : ObjectId.Parse(source.Id)));
      CreateMap<RaceModel, RaceContract>().ReverseMap();
      CreateMap<CharacterClassModel, CharacterClassContract>().ReverseMap();
      CreateMap<HitpointModel, HitpointContract>().ReverseMap();
      CreateMap<MovementSpeedModel, MovementSpeedContract>().ReverseMap();
      CreateMap<BonusModel, BonusContract>().ReverseMap();
      CreateMap<FeatModel, FeatContract>().ReverseMap();
      CreateMap<EquipmentModel, EquipmentContract>().ReverseMap();
      CreateMap<ProficiencyModel, ProficiencyContract>().ReverseMap();
      CreateMap<SkillProficiencyModel, SkillProficiencyContract>().ReverseMap();
      CreateMap<SpellcastingModel, SpellcastingContract>().ReverseMap();
      CreateMap<SpellcastingClassModel, SpellcastingClassContract>().ReverseMap();
      CreateMap<SpellRefModel, SpellRefContract>().ReverseMap();
      CreateMap<SlotTrackerModel, SlotTrackerContract>().ReverseMap();
      CreateMap<PactMagicModel, PactMagicContract>().ReverseMap();
    }
  }
}
