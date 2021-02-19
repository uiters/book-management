using AutoMapper;
using book_management_models;
using book_management_models.DTOs.BookDTOs;

namespace book_management_helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Book, BookForListDTO>().ReverseMap();
        }
    }
}