using Exoosis.Application.DTOs.Solutions;
using FluentValidation;

namespace Exoosis.Application.Validators;

public class CreateSolutionRequestValidator : AbstractValidator<CreateSolutionRequest>
{
    public CreateSolutionRequestValidator()
    {
        RuleFor(x => x.Name).NotEmpty().MaximumLength(200);
        RuleFor(x => x.Summary).MaximumLength(500);
        RuleFor(x => x.Description).MaximumLength(4000);
        RuleFor(x => x.Category).IsInEnum();
        RuleFor(x => x.ImageUrl).MaximumLength(500);
    }
}

public class UpdateSolutionRequestValidator : AbstractValidator<UpdateSolutionRequest>
{
    public UpdateSolutionRequestValidator()
    {
        RuleFor(x => x.Name).NotEmpty().MaximumLength(200);
        RuleFor(x => x.Summary).MaximumLength(500);
        RuleFor(x => x.Description).MaximumLength(4000);
        RuleFor(x => x.Category).IsInEnum();
        RuleFor(x => x.ImageUrl).MaximumLength(500);
    }
}
