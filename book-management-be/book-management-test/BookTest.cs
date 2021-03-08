using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using book_management_helpers;
using book_management_models;
using book_management_models.DTOs.BookDTOs;
using book_management_persistence.Contexts;
using book_management_persistence.Implements;
using book_management_persistence.Repositories;
using book_management_services.Implements;
using book_management_services.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Moq;
using Xunit;

namespace book_management_test
{
    public class BookTest : BaseTest
    {
        private AppDbContext _appContext;
        private IUnitOfWorks _unitOfWorks;
        private IBookService _bookService;
        private Mock<IBookService> _bookServiceMock;
        private Mock<IPhotoService> _photoService;
        private Mock<IMapper> _mapperMock;

        public BookTest() : base(new DbContextOptionsBuilder<AppDbContext>()
            .UseSqlServer("Data Source=DESKTOP-4HFPT5L;Initial Catalog=booksy;Integrated Security=True").Options)
        {
            _appContext = new AppDbContext(ContextOptions);
            _unitOfWorks = new UnitOfWorks(_appContext);
            _bookServiceMock = new Mock<IBookService>();
            _photoService = new Mock<IPhotoService>();
            _mapperMock = new Mock<IMapper>();
            _bookService = new BookServiceImpl(_unitOfWorks, _mapperMock.Object, _photoService.Object);
        }

        [Fact]
        public void GetAllBook_Test()
        {
            var result = _bookService.GetListBooks();

            Assert.NotNull(result);
        }

        [Fact]
        public void GetBookById_ShouldReturnBook()
        {
            Guid validBookId = new Guid("E5557AAE-AA11-4CC1-8D01-08D8DEC0C6D5");

            var result = _bookService.GetBookById(validBookId);

            Assert.NotNull(result);
        }

        [Fact]
        public void GetBookById_ShouldNotReturnBook()
        {
            Guid invalidBookId = new Guid();

            var result = _bookService.GetBookById(invalidBookId);

            Assert.Null(result);
        }

        [Fact]
        public void GetBookByCategory_ShouldReturnListBooks()
        {
            string categoryName = "Sách văn học";

            var result = _bookService.GetBooksByCategory(categoryName);
            
            Assert.NotNull(result);
        }

        [Fact]
        public void GetBookByCategory_ShouldNotReturnListBooks_1()
        {
            string invalidCategoryName = "Sách invalid";

            var result = _bookService.GetBooksByCategory(invalidCategoryName);
            
            Assert.Empty(result);
        }
        
        [Fact]
        public void GetBookByCategory_ShouldNotReturnListBooks_2()
        {
            string emptyCategoryName = "";

            var result = _bookService.GetBooksByCategory(emptyCategoryName);
            
            Assert.Empty(result);
        }

        [Fact]
        public async Task CreateBook_ShouldReturnNewBookId()
        {
            BookForCreateDTO validData = new BookForCreateDTO()
            {
                Title ="Test create book123",
                AuthorName = "NXB Kim Dong",
                Description = "ABC",
                Pages = 123,
                Price = 120312312,
                SKU = "123123",
                PublisherName = "NXB Kim Dong",
                Photos = new List<IFormFile>()
            };

            var result = await _bookService.AddNewBook(validData);

            
            //Make sure that book created
            var bookCreated = _bookService.GetBookById(result);
            
            Assert.NotNull(bookCreated);
        }

        [Fact]
        public async Task CreateBook_ShouldReturnEmptyGuid()
        {
            BookForCreateDTO bookWithTitleCreated = new BookForCreateDTO()
            {
                Title ="Test create book",
                AuthorName = "NXB Kim Dong",
                Description = "ABC",
                Pages = 123,
                Price = 120312312,
                SKU = "123123",
                PublisherName = "NXB Kim Dong",
                Photos = new List<IFormFile>()
            };
            
            var result = await _bookService.AddNewBook(bookWithTitleCreated);

            Assert.Equal(new Guid(), result);
        }

        [Fact]
        public async Task UpdateBook_WithInvalidId_ShouldReturnTrue()
        {
            BookForUpdateDto updateDto = new BookForUpdateDto()
            {
                Title = "update book",
                Description = "update description",
                SKU = "1239127398123",
                Price = 100000,
                Pages = 120
            };
            
            Guid updateId = new Guid("1002DC12-AA38-44D0-83CD-08D8E1517CF7");

            var result = await _bookService.UpdateBook(updateDto, updateId);

            Assert.False(result, "Should return false!");
        }
        
        [Fact]
        public async Task DeleteBook_ShouldReturnTrue()
        {
            BookForCreateDTO validData = new BookForCreateDTO()
            {
                Title ="Test create book 1",
                AuthorName = "NXB Kim Dong",
                Description = "ABC",
                Pages = 123,
                Price = 120312312,
                SKU = "123123",
                PublisherName = "NXB Kim Dong",
                Photos = new List<IFormFile>()
            };

            var newBookId = await _bookService.AddNewBook(validData);

            var result = await _bookService.DeleteBook(newBookId);
            
            Assert.True(result);
        }
        
        [Fact]
        public async Task DeleteBook_ShouldReturnFalse()
        {
            Guid bookId = new Guid("71A36AF3-B5D8-4D9E-D446-08D8DF14FB59");

            var result = await _bookService.DeleteBook(bookId);
            
            Assert.False(result);
        }
    }
}