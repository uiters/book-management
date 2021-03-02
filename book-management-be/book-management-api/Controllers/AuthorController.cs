using AutoMapper;
using book_management_helpers.Configurations;
using book_management_helpers.CustomException;
using book_management_models;
using book_management_models.DTOs.AuthorDTOs;
using book_management_services.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace book_management_api.Controllers
{
    //[Authorize]
    [ApiController]
    [Route("/api/author/")]
    public class AuthorController : ControllerBase
    {
        private IAuthorService _authorService;
        private readonly IMapper _mapper;

        public AuthorController(IAuthorService authorService, IMapper mapper)
        {
            this._authorService = authorService;
            this._mapper = mapper;
        }

        [HttpPost("add")]
        public IActionResult Create([FromBody] AuthorModel model)
        {
            var author = _mapper.Map<Author>(model);

            try
            {
                // create user
                _authorService.Add(author);
                _authorService.SaveChanges();
                return Ok("Create Author Success");
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
            var authors = _authorService.GetAll();
            var model = _mapper.Map<List<AuthorViewModel>>(authors);
            if (model.Count == 0)
            {
                throw new MyEmptyResultException(HttpStatusCode.NotAcceptable, "Can't find Author in database!");
            }
            return Ok(model);
        }

        [HttpGet("getbyid/{id}")]
        public IActionResult GetById(Guid id)
        {
            var author = _authorService.GetById(id);
            if (author == null)
                throw new MyEmptyResultException(HttpStatusCode.NotAcceptable, "Can't find Author in database!");

            var model = _mapper.Map<AuthorModel>(author);
            return Ok(model);
        }

        [HttpGet("getallauthorbyname/{name}")]
        public IActionResult GetAllAuthorByName(string name)
        {
            var authors = _authorService.GetAllAuthorByName(name);
            var model = _mapper.Map<List<AuthorViewModel>>(authors);
            if (model.Count == 0)
            {
                throw new MyEmptyResultException(HttpStatusCode.NotAcceptable, "Can't find Author in database!");
            }
            return Ok(model);
        }

        [HttpPut("update/{id}")]
        public IActionResult Update(Guid id, [FromBody] AuthorModel model)
        {
            // map model to entity and set id
            var author = _mapper.Map<Author>(model);
            author.Id = id;

            try
            {
                // update user 
                _authorService.Update(author);
                _authorService.SaveChanges();
                return Ok("Update success");
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpDelete("delete/{id}")]
        public IActionResult Delete(Guid id)
        {
            try
            {
                _authorService.Delete(id);
                _authorService.SaveChanges();
                return Ok("Delete success");
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}
