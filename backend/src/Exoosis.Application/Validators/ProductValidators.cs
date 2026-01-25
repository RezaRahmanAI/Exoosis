using Exoosis.Application.DTOs.Products;
using FluentValidation;

namespace Exoosis.Application.Validators;

public class CreateProductRequestValidator : AbstractValidator<CreateProductRequest>
{
    public CreateProductRequestValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty()
            .MaximumLength(200);
        RuleFor(x => x.Description)
            .MaximumLength(2000);
        RuleFor(x => x.Price)
            .GreaterThanOrEqualTo(0);
        RuleFor(x => x.StockQuantity)
            .GreaterThanOrEqualTo(0);
        RuleFor(x => x.ImageUrls)
            .MaximumLength(2000);
    }
}

public class UpdateProductRequestValidator : AbstractValidator<UpdateProductRequest>
{
    public UpdateProductRequestValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty()
            .MaximumLength(200);
        RuleFor(x => x.Description)
            .MaximumLength(2000);
        RuleFor(x => x.Price)
            .GreaterThanOrEqualTo(0);
        RuleFor(x => x.StockQuantity)
            .GreaterThanOrEqualTo(0);
        RuleFor(x => x.ImageUrls)
            .MaximumLength(2000);
    }
}
