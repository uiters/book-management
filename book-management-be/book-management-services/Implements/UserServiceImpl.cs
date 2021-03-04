using book_management_helpers.Configurations;
using book_management_helpers.Helpers;
using book_management_models;
using book_management_persistence.Contexts;
using book_management_services.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace book_management_services.Implements
{
    public class UserServiceImpl : IUserService
    {
        private AppDbContext _context;
        private ICartService _cartService;

        public UserServiceImpl(AppDbContext context, ICartService cartService)
        {
            _context = context;
            this._cartService = cartService;
        }

        public User Authenticate(string username, string password, string email)
        {
            if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password) || string.IsNullOrEmpty(email))
                return null;

            var user = _context.Users.SingleOrDefault(x => x.Username == username);

            // check if username exists
            if (user == null)
                throw new AppException("User is not exist");

            // check if password is correct
            if (!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
                throw new AppException("Wrong Password. Please check again!");

            if (email == null)
            {
                throw new AppException("Email is required");
            }
            else if (ValidateUser.IsValidEmail(user.Email) == false)
            {
                throw new AppException("Email is not in right format");
            }

            // authentication successful
            return user;
        }

        public IEnumerable<User> GetAll()
        {
            return _context.Users;
        }

        public User GetById(Guid id)
        {
            return _context.Users.Find(id);
        }

        public User Create(User user, string password)
        {
            // validation
            if (string.IsNullOrWhiteSpace(password))
            {
                throw new AppException("Password is required");
            }
            else if (ValidateUser.ValidatePassword(user.Password) == false)
            {
                throw new AppException(
                    "Password have length in range 8-15 character and have at least 1 uppercase, 1 lowercase, 1 digit");
            }

            if (_context.Users.Any(x => x.Username == user.Username))
                throw new AppException("Username \"" + user.Username + "\" is already taken");

            if (user.Email == null)
            {
                throw new AppException("Email is required");
            }
            else if (_context.Users.Any(x => x.Email == user.Email))
            {
                throw new AppException("Email \"" + user.Email + "\" is already taken");
            }
            else if (ValidateUser.IsValidEmail(user.Email) == false)
            {
                throw new AppException("Email is not in right format");
            }

            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(password, out passwordHash, out passwordSalt);

            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            _context.Users.Add(user);
            _context.SaveChanges();

            _cartService.AddCart(new Cart() {UserId = user.Id});

            return user;
        }

        public void Update(User userParam, string password = null)
        {
            var user = _context.Users.Find(userParam.Id);

            if (user == null)
                throw new AppException("User not found");

            // update username if it has changed
            if (!string.IsNullOrWhiteSpace(userParam.Username) && userParam.Username != user.Username)
            {
                // throw error if the new username is already taken
                if (_context.Users.Any(x => x.Username == userParam.Username))
                    throw new AppException("Username " + userParam.Username + " is already taken");

                user.Username = userParam.Username;
            }

            // update user properties if provided
            if (!string.IsNullOrWhiteSpace(userParam.Name))
                user.Name = userParam.Name;

            // update password if provided
            if (!string.IsNullOrWhiteSpace(password))
            {
                byte[] passwordHash, passwordSalt;

                if (ValidateUser.ValidatePassword(user.Password) == false)
                    throw new AppException(
                        "Password have length in range 8-15 character and have at least 1 uppercase, 1 lowercase, 1 digit");

                CreatePasswordHash(password, out passwordHash, out passwordSalt);

                user.PasswordHash = passwordHash;
                user.PasswordSalt = passwordSalt;
            }

            _context.Users.Update(user);
            _context.SaveChanges();
        }

        public void Delete(Guid id)
        {
            var user = _context.Users.Find(id);
            if (user == null)
                throw new AppException("User not found");

            _context.Users.Remove(user);
            _context.SaveChanges();
        }

        // private helper methods

        private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            if (password == null) throw new ArgumentNullException("password");
            if (string.IsNullOrWhiteSpace(password))
                throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");

            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        private static bool VerifyPasswordHash(string password, byte[] storedHash, byte[] storedSalt)
        {
            if (password == null) throw new ArgumentNullException("password");
            if (string.IsNullOrWhiteSpace(password))
                throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");
            if (storedHash.Length != 64)
                throw new ArgumentException("Invalid length of password hash (64 bytes expected).", "passwordHash");
            if (storedSalt.Length != 128)
                throw new ArgumentException("Invalid length of password salt (128 bytes expected).", "passwordHash");

            using (var hmac = new System.Security.Cryptography.HMACSHA512(storedSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != storedHash[i]) return false;
                }
            }

            return true;
        }
    }
}