using AutoMapper;
using book_management_models;
using book_management_models.DTOs.AuthorDTOs;
using book_management_models.DTOs.BookDTOs;
using book_management_models.DTOs.CartDTOs;
using book_management_models.DTOs.CartItemDTOs;
using book_management_models.DTOs.CategoryDTOs;
using book_management_models.DTOs.OrderDTOs;
using book_management_models.DTOs.OrderItemDTOs;
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
            CreateMap<Book, BookForCartDTO>().ReverseMap();
            CreateMap<BookForUpdateDto, Book>().ReverseMap();
            CreateMap<Book, BookForUpdateDto>().ReverseMap();
            
            CreateMap<User, UserModel>().ReverseMap();
            CreateMap<RegisterModel, User>().ReverseMap();
            CreateMap<UpdateModel, User>().ReverseMap();
            CreateMap<Author, AuthorForListDTO>();
            CreateMap<Publisher, PublisherForListDTO>();

            CreateMap<CategoryModel, Category>().ReverseMap();
            CreateMap<CategoryViewModel, Category>().ReverseMap();
            
            CreateMap<PublisherModel, Publisher>().ReverseMap();
            CreateMap<PublisherViewModel, Publisher>().ReverseMap();

            CreateMap<AuthorModel, Author>().ReverseMap();
            CreateMap<AuthorViewModel, Author>().ReverseMap();

            CreateMap<Cart, CartForListDTO>();
            CreateMap<CartItemForCreateDTO, CartItem>();
            CreateMap<CartItem, CartItemForListDTO>();

            CreateMap<Order, OrderDetailDTO>().ReverseMap();
            CreateMap<OrderItem, OrderItemForListDTO>().ReverseMap();
        }
    }
}