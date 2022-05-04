using AutoMapper;
using book_management_helpers.Configurations;
using book_management_models;
using book_management_models.DTOs;
using book_management_models.DTOs.UserDTOs;
using book_management_services.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace book_management_api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/users")]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IMapper _mapper;
        private readonly AppSettings _appSettings;

        public UsersController(
            IUserService userService,
            IMapper mapper,
            IOptions<AppSettings> appSettings)
        {
            _userService = userService;
            _mapper = mapper;
            _appSettings = appSettings.Value;
        }


        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Authenticate([FromBody] AuthenticateModel model)
        {
            try
            {
                var user = await _userService.Authenticate(model.Username, model.Password);

                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim(ClaimTypes.Name, user.Id.ToString())
                    }),
                    Expires = DateTime.UtcNow.AddHours(2),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };
                var token = tokenHandler.CreateToken(tokenDescriptor);
                var tokenString = tokenHandler.WriteToken(token);

                // return basic user info and authentication token
                return Ok(new
                {
                    Id = user.Id,
                    Username = user.Username,
                    Name = user.Name,
                    Email = user.Email,
                    Address = user.Address,
                    Phone = user.Phone,
                    Token = tokenString,
                    Role = user.Role
                });
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> RegisterAsync([FromBody] RegisterModel model)
        {
            var user = _mapper.Map<User>(model);

            try
            {
                // create user
                await _userService.CreateAsync(user, model.Password);
                return Ok("Create User Success");
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("getall")]
        public IActionResult GetAll()
        {
            var users = _userService.GetAll();
            var model = _mapper.Map<List<UserModel>>(users);
            return Ok(model);
        }

        [HttpGet("getbyid/{id:guid}")]
        public IActionResult GetById(Guid id)
        {
            var user = _userService.GetById(id);
            var model = _mapper.Map<UserModel>(user);
            return Ok(model);
        }

        [HttpPut("update/{id}")]
        public IActionResult Update(Guid id, [FromBody] UpdateModel model)
        {
            // map model to entity and set id
            var user = _mapper.Map<User>(model);
            user.Id = id;

            try
            {
                // update user 
                _userService.Update(user, model.Password);
                return Ok("Update success");
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpDelete("delete/{id:guid}")]
        public IActionResult Delete(Guid id)
        {
            try
            {
                _userService.Delete(id);
                return Ok("Delete success");
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("getbyfilter")]
        public IActionResult GetByFilter(string searchKey, string searchTitle, int page, int countPerPage)
        {
            try
            {
                var categories = _userService.GetAllPaging(out var totalRow, searchKey, searchTitle, page, countPerPage);

                var model = _mapper.Map<List<UserModel>>(categories);

                var a = totalRow;
                int totalPage = (int)Math.Ceiling((double)totalRow / countPerPage);
                var paginationSet = new PaginationSet<UserModel>()
                {
                    Items = model,
                    MaxPage = 5,
                    Page = page,
                    TotalCount = totalRow,
                    TotalPage = totalPage
                };
                return Ok(paginationSet);

            }
            catch (AppException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}
