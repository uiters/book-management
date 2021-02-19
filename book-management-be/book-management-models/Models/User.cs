using System;
using System.Collections.Generic;

namespace book_management_models
{
    public class User : BaseModel
    {
        public string Name { get; set; }
        public string Username { get; set; }
        public DateTime DateofBirth { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public ICollection<Review> Reviews { get; set; }
        public Cart Cart { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
    }
}