using Exoosis.Application.DTOs.Jobs;
using FluentValidation;

namespace Exoosis.Application.Validators;

public class CreateJobRequestValidator : AbstractValidator<CreateJobRequest>
{
    public CreateJobRequestValidator()
    {
        RuleFor(x => x.Title).NotEmpty().MaximumLength(200);
        RuleFor(x => x.Location).NotEmpty().MaximumLength(150);
        RuleFor(x => x.Type).NotEmpty().MaximumLength(50);
        RuleFor(x => x.TypeIcon).NotEmpty().MaximumLength(100);
        RuleFor(x => x.Category).NotEmpty().MaximumLength(150);
        RuleFor(x => x.Description).MaximumLength(4000);
        RuleFor(x => x.Team).MaximumLength(150);
        RuleFor(x => x.Salary).MaximumLength(150);
        RuleFor(x => x.DatePosted).MaximumLength(50);
    }
}

public class UpdateJobRequestValidator : AbstractValidator<UpdateJobRequest>
{
    public UpdateJobRequestValidator()
    {
        RuleFor(x => x.Title).NotEmpty().MaximumLength(200);
        RuleFor(x => x.Location).NotEmpty().MaximumLength(150);
        RuleFor(x => x.Type).NotEmpty().MaximumLength(50);
        RuleFor(x => x.TypeIcon).NotEmpty().MaximumLength(100);
        RuleFor(x => x.Category).NotEmpty().MaximumLength(150);
        RuleFor(x => x.Description).MaximumLength(4000);
        RuleFor(x => x.Team).MaximumLength(150);
        RuleFor(x => x.Salary).MaximumLength(150);
        RuleFor(x => x.DatePosted).MaximumLength(50);
    }
}
