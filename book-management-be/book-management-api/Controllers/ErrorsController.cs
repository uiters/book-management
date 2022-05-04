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
            var exception = context?.Error;
            const int code = 500;
            
            Response.StatusCode = code;

            return new MyErrorResponse(exception);
        }
    }
}