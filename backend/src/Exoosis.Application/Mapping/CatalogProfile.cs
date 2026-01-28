using AutoMapper;
using Exoosis.Application.DTOs.Brands;
using Exoosis.Application.DTOs.Categories;
using Exoosis.Application.DTOs.Hero;
using Exoosis.Application.DTOs.Products;
using Exoosis.Application.DTOs.Jobs;
using Exoosis.Application.DTOs.Solutions;
using Exoosis.Application.DTOs.TeamMembers;
using Exoosis.Domain.Entities;

namespace Exoosis.Application.Mapping;

public class CatalogProfile : Profile
{
    public CatalogProfile()
    {
        CreateMap<Category, CategoryDto>();
        CreateMap<CreateCategoryRequest, Category>();
        CreateMap<UpdateCategoryRequest, Category>();

        CreateMap<Brand, BrandDto>();
        CreateMap<CreateBrandRequest, Brand>();
        CreateMap<UpdateBrandRequest, Brand>();

        CreateMap<Product, ProductDto>()
            .ForMember(dest => dest.CategoryName, opt => opt.MapFrom(src => src.Category != null ? src.Category.Name : null))
            .ForMember(dest => dest.BrandName, opt => opt.MapFrom(src => src.Brand != null ? src.Brand.Name : null));
        CreateMap<CreateProductRequest, Product>();
        CreateMap<UpdateProductRequest, Product>();

        CreateMap<TeamMember, TeamMemberDto>();
        CreateMap<CreateTeamMemberRequest, TeamMember>();
        CreateMap<UpdateTeamMemberRequest, TeamMember>();

        CreateMap<Job, JobDto>();
        CreateMap<CreateJobRequest, Job>();
        CreateMap<UpdateJobRequest, Job>();

        CreateMap<Solution, SolutionDto>();
        CreateMap<CreateSolutionRequest, Solution>();
        CreateMap<UpdateSolutionRequest, Solution>();

        CreateMap<HeroContent, HeroContentDto>();
        CreateMap<CreateHeroContentRequest, HeroContent>();
        CreateMap<UpdateHeroContentRequest, HeroContent>();
    }
}
