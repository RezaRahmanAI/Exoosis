using Exoosis.Application.DTOs.Brands;
using FluentValidation;

namespace Exoosis.Application.Validators;

public class CreateBrandRequestValidator : AbstractValidator<CreateBrandRequest>
{
    public CreateBrandRequestValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty()
            .MaximumLength(150);
        RuleFor(x => x.Description)
            .MaximumLength(500);
        RuleFor(x => x.LogoUrl)
            .MaximumLength(500);
        RuleFor(x => x.Category)
            .IsInEnum();
    }
}

public class UpdateBrandRequestValidator : AbstractValidator<UpdateBrandRequest>
{
    public UpdateBrandRequestValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty()
            .MaximumLength(150);
        RuleFor(x => x.Description)
            .MaximumLength(500);
        RuleFor(x => x.LogoUrl)
            .MaximumLength(500);
        RuleFor(x => x.Category)
            .IsInEnum();
    }
}
