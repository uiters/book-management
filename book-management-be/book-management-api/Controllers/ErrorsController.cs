using book_management_models.DTOs.Response;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;

namespace book_management_api.Controllers
{
    public class ErrorsController : ControllerBase
    {
        [ApiExplorerSettings(IgnoreApi = true)]
        [Route("error")]
        public MyErrorResponse Error()
        {
            var context = HttpContext.Features.Get<IExceptionHandlerFeature>();
            var exception = context.Error;
            var code = 500;

            // if      (exception is MyNotFoundException) code = 404; // Not Found
            // else if (exception is MyUnauthException)   code = 401; // Unauthorized
            // else if (exception is MyException)         code = 400; // Bad Request

            Response.StatusCode = code;

            return new MyErrorResponse(exception);
        }
    }
}