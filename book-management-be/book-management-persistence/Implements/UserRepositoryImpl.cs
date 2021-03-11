using System.Collections.Generic;
using System.Linq;
using book_management_models;
using book_management_persistence.Contexts;
using book_management_persistence.Repositories;
using Microsoft.EntityFrameworkCore;

namespace book_management_persistence.Implements
{
    public class UserRepositoryImpl : BaseRepositoryImpl<User>, IUserRepository
    {
        public UserRepositoryImpl(AppDbContext context) : base(context)
        {
        }

        public IEnumerable<User> GetAllUserPaging(out int totalRow,string searchKey, string searchTitle, int page, int pageSize, string[] includes = null)
        {
            page = page - 1;

            int skipCount = page * pageSize;

            IQueryable<User> _resetSet;

            //HANDLE INCLUDES FOR ASSOCIATED OBJECTS IF APPLICABLE
            if (includes != null && includes.Count() > 0)
            {
                var query = Context.Users.Include(includes.First());
                foreach (var include in includes.Skip(1))
                    query = query.Include(include);
                _resetSet = query.AsQueryable();
            }
            else
            {
                _resetSet = Context.Users.AsQueryable();
            }

            if (searchTitle != null)
            {
                searchTitle = searchTitle.Trim();
                if (searchKey == "username")
                    _resetSet = _resetSet.Where(x => x.Username.Contains(searchTitle));
                else if (searchKey == "email")
                    _resetSet = _resetSet.Where(x => x.Email.Contains(searchTitle));
                else
                    _resetSet = _resetSet.Where(x => x.Role.Contains(searchTitle));
            }

            //var a = _resetSet.ToList();
            totalRow = _resetSet.Count();

            _resetSet = skipCount == 0 ? _resetSet.Take(pageSize) : _resetSet.Skip(skipCount).Take(pageSize);

            return _resetSet.AsQueryable();
        }
    }
}