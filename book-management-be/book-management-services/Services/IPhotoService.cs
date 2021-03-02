using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using book_management_models;
using Microsoft.AspNetCore.Http;

namespace book_management_services.Services
{
    public interface IPhotoService
    {
        Task<IEnumerable<Photo>> UploadPhotos(List<IFormFile> photos);
    }
}