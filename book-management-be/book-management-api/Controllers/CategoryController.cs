using System.Linq;
using System.Net;
using System.Reflection.Metadata.Ecma335;
using book_management_helpers.CustomException;
using book_management_services.Services;
using Microsoft.AspNetCore.Mvc;

namespace book_management_api.Controllers
{
    [ApiController]
    [Route("/api/category/")]
    public class CategoryController : ControllerBase
    {
        private ICategoryService _categoryService;

        public CategoryController(ICategoryService categoryService)
        {
            this._categoryService = categoryService;
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
    }
}