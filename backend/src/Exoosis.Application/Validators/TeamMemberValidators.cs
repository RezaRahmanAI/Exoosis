using Exoosis.Application.DTOs.TeamMembers;
using FluentValidation;

namespace Exoosis.Application.Validators;

public class CreateTeamMemberRequestValidator : AbstractValidator<CreateTeamMemberRequest>
{
    public CreateTeamMemberRequestValidator()
    {
        RuleFor(x => x.Name).NotEmpty().MaximumLength(150);
        RuleFor(x => x.Role).NotEmpty().MaximumLength(150);
        RuleFor(x => x.Bio).MaximumLength(2000);
        RuleFor(x => x.Quote).MaximumLength(500);
        RuleFor(x => x.ImageUrl).MaximumLength(500);
        RuleFor(x => x.LinkedInUrl).MaximumLength(500);
    }
}

public class UpdateTeamMemberRequestValidator : AbstractValidator<UpdateTeamMemberRequest>
{
    public UpdateTeamMemberRequestValidator()
    {
        RuleFor(x => x.Name).NotEmpty().MaximumLength(150);
        RuleFor(x => x.Role).NotEmpty().MaximumLength(150);
        RuleFor(x => x.Bio).MaximumLength(2000);
        RuleFor(x => x.Quote).MaximumLength(500);
        RuleFor(x => x.ImageUrl).MaximumLength(500);
        RuleFor(x => x.LinkedInUrl).MaximumLength(500);
    }
}
