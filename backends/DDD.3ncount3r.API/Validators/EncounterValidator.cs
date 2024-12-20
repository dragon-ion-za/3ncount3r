using DDD._3ncount3r.API.ViewModels;
using FluentValidation;

namespace DDD._3ncount3r.API.Validators
{
  public class EncounterValidator : AbstractValidator<EncounterViewModel>
  {
    public EncounterValidator()
    {
      RuleFor(x => x.UserId).NotEmpty();
      RuleFor(x => x.Name).NotEmpty();
      RuleFor(x => x.Campaign).NotEmpty();
      RuleFor(x => x.Location).NotEmpty();
      RuleForEach(x => x.Creatures).ChildRules(x =>
      {
        x.RuleFor(y => y.Name).NotEmpty();
        x.RuleFor(y => y.HitpointMax).NotNull();
        x.RuleFor(y => y.Initiative).NotNull();
        x.RuleFor(y => y.ByoapiId).NotEmpty();
        x.RuleFor(y => y.CurrentHitpoints).NotNull();
        x.RuleFor(y => y.SourceId).NotNull();
      });
    }
  }
}
