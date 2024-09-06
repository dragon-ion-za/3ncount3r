using AutoMapper;
using DDD._3ncount3r.API.Models;
using DDD._3ncount3r.API.ViewModels;

namespace DDD._3ncount3r.API.MapperProfiles
{
  public class CreatureMapperProfile : Profile
  {
    public CreatureMapperProfile()
    {
      CreateMap<CreatureModel, CreatureViewModel>();
      CreateMap<ArmourClassModel, ArmourClassViewModel>();
      CreateMap<ChallengeRatingModel, ChallengeRatingViewModel>();
      CreateMap<ActionGroupModel, ActionGroupViewModel>();
      CreateMap<ItemModel, ItemViewModel>();
    }
  }
}
