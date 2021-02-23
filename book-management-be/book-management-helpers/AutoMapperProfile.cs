using AutoMapper;
using book_management_models;
using book_management_models.DTOs.AuthorDTOs;
using book_management_models.DTOs.BookDTOs;
using book_management_models.DTOs.CategoryDTOs;
using book_management_models.DTOs.PublisherDTOs;
using book_management_models.DTOs.UserDTOs;

namespace book_management_helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Book, BookForListDTO>().ReverseMap();
            CreateMap<Book, BookForCreateDTO>().ReverseMap();
            CreateMap<User, UserModel>().ReverseMap();
            CreateMap<RegisterModel, User>().ReverseMap();
            CreateMap<UpdateModel, User>().ReverseMap();
            CreateMap<Author, AuthorForListDTO>();
            CreateMap<Publisher, PublisherForListDTO>();
            CreateMap<CategoryModel, Category>().ReverseMap();
            CreateMap<CategoryViewModel, Category>().ReverseMap();
        }
    }
}