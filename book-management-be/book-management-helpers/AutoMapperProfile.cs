using AutoMapper;
using book_management_models;
using book_management_models.DTOs.BookDTOs;
using book_management_models.DTOs.UserDTOs;

namespace book_management_helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Book, BookForListDTO>().ReverseMap();
            CreateMap<User, UserModel>();
            CreateMap<RegisterModel, User>();
            CreateMap<UpdateModel, User>();
        }
    }
}