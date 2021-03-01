using book_management_models;
using book_management_persistence.Contexts;
using book_management_persistence.Repositories;

namespace book_management_persistence.Implements
{
    public class PhotoRepositoryImpl : BaseRepositoryImpl<Photo>, IPhotoRepository
    {
        public PhotoRepositoryImpl(AppDbContext context) : base(context)
        {
        }
    }
}