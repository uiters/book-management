using AutoMapper;
using book_management_helpers.Configurations;
using book_management_helpers.CustomException;
using book_management_models;
using book_management_models.DTOs.PublisherDTOs;
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
    [Route("/api/publisher/")]
    public class PublisherController : ControllerBase
    {
        private IPublisherService _publisherService;
        private readonly IMapper _mapper;

        public PublisherController(IPublisherService publisherService, IMapper mapper)
        {
            this._publisherService = publisherService;
            this._mapper = mapper;
        }

        [HttpPost("add")]
        public IActionResult Create([FromBody] PublisherModel model)
        {
            var publisher = _mapper.Map<Publisher>(model);

            try
            {
                // create user
                _publisherService.Add(publisher);
                _publisherService.SaveChanges();
                return Ok("Create Publisher Success");
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
            var publishers = _publisherService.GetAll();
            var model = _mapper.Map<List<PublisherViewModel>>(publishers);
            if (model.Count == 0)
            {
                throw new MyEmptyResultException(HttpStatusCode.NotAcceptable, "Can't find Publisher in database!");
            }
            return Ok(model);
        }

        [HttpGet("getbyid/{id}")]
        public IActionResult GetById(Guid id)
        {
            var publisher = _publisherService.GetById(id);
            if (publisher == null)
                throw new MyEmptyResultException(HttpStatusCode.NotAcceptable, "Can't find Publisher in database!");

            var model = _mapper.Map<PublisherModel>(publisher);
            return Ok(model);
        }

        [HttpGet("getallpublisherbyname/{name}")]
        public IActionResult GetAllPublisherByName(string name)
        {
            var publishers = _publisherService.GetAllPublisherByName(name);
            var model = _mapper.Map<List<PublisherViewModel>>(publishers);
            if (model.Count == 0)
            {
                throw new MyEmptyResultException(HttpStatusCode.NotAcceptable, "Can't find Publisher in database!");
            }
            return Ok(model);
        }

        [HttpPut("update/{id}")]
        public IActionResult Update(Guid id, [FromBody] PublisherModel model)
        {
            // map model to entity and set id
            var publisher = _mapper.Map<Publisher>(model);
            publisher.Id = id;

            try
            {
                // update user 
                _publisherService.Update(publisher);
                _publisherService.SaveChanges();
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
                _publisherService.Delete(id);
                _publisherService.SaveChanges();
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
