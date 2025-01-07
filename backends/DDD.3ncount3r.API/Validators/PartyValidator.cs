using DDD._3ncount3r.API.ViewModels;
using FluentValidation;

namespace DDD._3ncount3r.API.Validators
{
  public class PartyValidator : AbstractValidator<PartyViewModel>
  {
    public PartyValidator()
    {
      RuleFor(x => x.UserId).NotEmpty();
      RuleFor(x => x.Name).NotEmpty();
      RuleFor(x => x.CharacterIds).NotEmpty();
    }
  }
}
