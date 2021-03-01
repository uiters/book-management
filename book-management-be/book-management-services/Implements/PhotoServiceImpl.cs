using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using book_management_helpers;
using book_management_models;
using book_management_persistence.Implements;
using book_management_persistence.Repositories;
using book_management_services.Services;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

namespace book_management_services.Implements
{
    public class PhotoServiceImpl : IPhotoService
    {
        private IOptions<CloudinarySettings> _cloudinaryConfig;
        private Cloudinary _cloudinary;
        private IUnitOfWorks _unitOfWorks;
        private PhotoRepositoryImpl _photoRepository;

        public PhotoServiceImpl(IOptions<CloudinarySettings> cloudinaryConfig, IUnitOfWorks unitOfWorks)
        {
            this._cloudinaryConfig = cloudinaryConfig;
            Account account = new Account(
                _cloudinaryConfig.Value.CloudName,
                _cloudinaryConfig.Value.ApiKey,
                _cloudinaryConfig.Value.ApiSecret
            );

            this._cloudinary = new Cloudinary(account);
            this._unitOfWorks = unitOfWorks;
            this._photoRepository = _unitOfWorks.PhotoRepository();
        }

        public async Task<IEnumerable<Photo>> UploadPhotos(List<IFormFile> photos)
        {
            ImageUploadResult uploadResult = new ImageUploadResult();
            List<Photo> photosForReturn = new List<Photo>();

            foreach (var image in photos)
            {
                if (image.Length > 0)
                {
                    using (var stream = image.OpenReadStream())
                    {
                        var uploadParams = new ImageUploadParams()
                        {
                            File = new FileDescription(image.Name, stream),
                            Transformation = new Transformation().Width(500).Height(500).Crop("fill").Gravity("face"),
                            Folder = "DE_Assignment",
                        };

                        uploadResult = _cloudinary.Upload(uploadParams);
                    }
                }

                var photo = new Photo();
                photo.Url = uploadResult.Url.ToString();
                photo.PublicId = uploadResult.PublicId;
                photo.CreatedAt = DateTime.Now;

                photosForReturn.Add(photo);
            }

            return photosForReturn;
        }
    }
}