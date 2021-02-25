using System;
using System.Collections.Generic;
using System.Linq;
using book_management_models;
using book_management_persistence.Contexts;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace book_management_helpers
{
    public class SeedMockData
    {
        public static void SeedBook(AppDbContext context)
        {
            if (context.Books.Any()) return;

            var bookData =
                System.IO.File.ReadAllText(
                    "D:/source/DE_assignment/book-management-be/book-management-helpers/MockData/BookData.json");
                    //"D:/Project VS/.net core/samples/DE_assignment-main/DE_assignment/book-management-be/book-management-helpers/MockData/BookData.json");
            var books = JsonConvert.DeserializeObject<List<Book>>(bookData);

            foreach (var book in books)
            {
                book.CreatedAt = DateTime.Now;
                Author randomAuthor = context.Authors.OrderBy(a => Guid.NewGuid()).First();
                Publisher randomPublisher = context.Publishers.OrderBy((p => Guid.NewGuid())).First();
                List<Category> categories = context.Categories.Take(4).ToList();

                book.AuthorId = randomAuthor.Id;
                book.PublisherId = randomPublisher.Id;
                book.Categories = new List<Category>();
                foreach (var category in categories)
                {
                    book.Categories.Add(category);
                }

                context.Books.Add(book);
            }

            context.SaveChanges();
        }

        public static void SeedAuthor(AppDbContext context)
        {
            if (context.Authors.Any()) return;

            var authorData = System.IO.File.ReadAllText(
                //"D:/source/DE_assignment/book-management-be/book-management-helpers/MockData/AuthorData.json");
                "D:/Project VS/.net core/samples/DE_assignment-main/DE_assignment/book-management-be/book-management-helpers/MockData/AuthorData.json");

            var authors = JsonConvert.DeserializeObject<List<Author>>(authorData);

            foreach (var author in authors)
            {
                author.CreatedAt = DateTime.Now;
                context.Authors.Add(author);
            }

            context.SaveChanges();
        }

        public static void SeedCategory(AppDbContext context)
        {
            if (context.Categories.Any()) return;

            var categoryData = System.IO.File.ReadAllText(
                //"D:/source/DE_assignment/book-management-be/book-management-helpers/MockData/CategoryData.json");
                "D:/Project VS/.net core/samples/DE_assignment-main/DE_assignment/book-management-be/book-management-helpers/MockData/CategoryData.json");
            var categories = JsonConvert.DeserializeObject<List<Category>>(categoryData);

            foreach (var category in categories)
            {
                category.CreatedAt = DateTime.Now;
                context.Categories.Add(category);
            }

            context.SaveChanges();
        }

        public static void SeedPublisher(AppDbContext context)
        {
            if (context.Publishers.Any()) return;

            var publisherData = System.IO.File.ReadAllText(
            //"D:/source/DE_assignment/book-management-be/book-management-helpers/MockData/PublisherData.json");
            "D:/Project VS/.net core/samples/DE_assignment-main/DE_assignment/book-management-be/book-management-helpers/MockData/PublisherData.json");
            var publishers = JsonConvert.DeserializeObject<List<Publisher>>(publisherData);

            foreach (var publisher in publishers)
            {
                publisher.CreatedAt = DateTime.Now;
                context.Publishers.Add(publisher);
            }

            context.SaveChanges();
        }

        public static void SeedData(AppDbContext context)
        {
            SeedAuthor(context);
            SeedPublisher(context);
            SeedCategory(context);
            SeedBook(context);
        }
    }
}