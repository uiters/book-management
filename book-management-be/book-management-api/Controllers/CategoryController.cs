using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Reflection.Metadata.Ecma335;
using AutoMapper;
using book_management_helpers.Configurations;
using book_management_helpers.CustomException;
using book_management_models;
using book_management_models.DTOs;
using book_management_models.DTOs.CategoryDTOs;
using book_management_services.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace book_management_api.Controllers
{
    //[Authorize]
    [ApiController]
    [Route("/api/category/")]
    public class CategoryController : ControllerBase
    {
        private ICategoryService _categoryService;
        private readonly IMapper _mapper;

        public CategoryController(ICategoryService categoryService, IMapper mapper)
        {
            this._categoryService = categoryService;
            this._mapper = mapper;
        }

        [HttpGet("all")]
        public IActionResult GetAllCategory()
        {
            var result = _categoryService.GetAllCategory();

            if (result.Count() < 1)
            {
                throw new MyEmptyResultException(HttpStatusCode.NotAcceptable, "Cant find category");
            }

            return Ok(result);
        }

        [HttpPost("add")]
        public IActionResult Create([FromBody] CategoryModel model)
        {
            var category = _mapper.Map<Category>(model);

            try
            {
                // create user
                _categoryService.Add(category);
                _categoryService.SaveChanges();
                return Ok("Create Category Success");
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
            var categorys = _categoryService.GetAll();
            var model = _mapper.Map<List<CategoryViewModel>>(categorys);
            if (model.Count == 0)
            {
                throw new MyEmptyResultException(HttpStatusCode.NotAcceptable, "Can't find Category in database!");
            }
            return Ok(model);
        }

        [HttpGet("getbyfilter")]
        public IActionResult GetByFilter(int searchKey, string searchTitle, int page, int countPerPage)
        {
            try
            {
                int totalRow = 0;
                var categorys = _categoryService.GetAllPaging( out totalRow, searchKey, searchTitle, page, countPerPage);
            
                var model = _mapper.Map<List<CategoryViewModel>>(categorys);
            
                var a = totalRow;
                int totalPage = (int)Math.Ceiling((double)totalRow / countPerPage);
                var paginationSet = new PaginationSet<CategoryViewModel>()
                {
                    Items = model,
                    MaxPage = 5,
                    Page = page,
                    TotalCount = totalRow,
                    TotalPage = totalPage
                };
                return Ok(paginationSet);

            }
            catch(AppException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("getbyid/{id}")]
        public IActionResult GetById(Guid id)
        {
            var category = _categoryService.GetById(id);
            
            if (category == null)
                throw new MyEmptyResultException(HttpStatusCode.NotAcceptable, "Can't find Category in database!");

            var model = _mapper.Map<CategoryModel>(category);
            return Ok(model);
        }

        [HttpGet("getcategorybyname/{name}")]
        public IActionResult GetCategoryByName(string name)
        {
            var categorys = _categoryService.GetCategoryByName(name);
            var model = _mapper.Map<List<CategoryViewModel>>(categorys);
            if (model.Count == 0)
            {
                throw new MyEmptyResultException(HttpStatusCode.NotAcceptable, "Can't find Category in database!");
            }
            return Ok(model);
        }

        [HttpPut("update/{id}")]
        public IActionResult Update(Guid id, [FromBody] CategoryModel model)
        {
            // map model to entity and set id
            var category = _mapper.Map<Category>(model);
            category.Id = id;

            try
            {
                // update user 
                _categoryService.Update(category);
                _categoryService.SaveChanges();
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
                _categoryService.Delete(id);
                _categoryService.SaveChanges();
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