﻿using Microsoft.AspNetCore.Mvc;
using Restaurant_menu.Models;
using Restaurant_menu.Services.Interfaces;
using Restaurant_menu.Models.DTO;
using System;

namespace Restaurant_menu.ControllerBase
{
    [ApiController]
    [Route("api/[controller]")]
    public class DishController : Controller
    {
        public DishController([FromServices] IDishService dishService)
        {
            _dishService = dishService;
        }

        private IDishService _dishService;

        [HttpGet]
        public IActionResult GetAll([FromQuery] SortParamsDto sortParams, [FromQuery] FilterParamsDto filterParams)
        {
            if (sortParams.FieldName == null)
            {
                var dishes = _dishService.Filter(filterParams);
                return Json(dishes);
            }
            else
            {
                var dishes = _dishService.FilterAndSort(filterParams, sortParams);
                return Json(dishes);
            }
        }

        [HttpGet("{id}")]
        public IActionResult Get(long id)
        {
            Dish dish;

            try
            {
                dish = _dishService.GetById(id);
            }
            catch (NullReferenceException)
            {
                return NotFound();
            }

            return Json(_dishService.GetById(id));
        }

        [HttpPost]
        public IActionResult Update([FromBody] Dish dish)
        {
            try
            {
                _dishService.UpdateDish(dish);
            }
            catch (NullReferenceException)
            {
                return NotFound();
            }

            return Ok();
        }

        [HttpPut]
        public IActionResult Create([FromBody] Dish dish)
        {
            if (string.IsNullOrWhiteSpace(dish.Name))
            {
                ModelState.AddModelError("Name", "Name is null or empty or white space");
            }

            if (dish.Name.Length > 255)
            {
                ModelState.AddModelError("Name", "Name length is over 255 symbols");
            }

            if (string.IsNullOrWhiteSpace(dish.Description))
            {
                ModelState.AddModelError("Description", "Description is null or empty or white space");
            }

            if (dish.Description.Length > 500)
            {
                ModelState.AddModelError("Description", "Description length is over 500 symbols");
            }

            if (dish.Cost == null)
            {
                ModelState.AddModelError("Cost", "Cost is null");
            }

            if (dish.Cost < 0)
            {
                ModelState.AddModelError("Cost", "Cost is less than zero");
            }

            if (dish.Weight == null)
            {
                ModelState.AddModelError("Weight", "Weight is null");
            }

            if (dish.Weight < 0)
            {
                ModelState.AddModelError("Weight", "Weight is less than zero");
            }

            if (dish.Calories == null)
            {
                ModelState.AddModelError("Calories", "Calories is null");
            }

            if (dish.Calories < 0)
            {
                ModelState.AddModelError("Calories", "Calories is less than zero");
            }

            if (dish.CoockingTime == null)
            {
                ModelState.AddModelError("CoockingTime", "CoockingTime is null");
            }

            if (dish.CoockingTime < 0)
            {
                ModelState.AddModelError("CoockingTime", "CoockingTime is less than zero");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _dishService.CreateDish(dish);
            return Ok();
        }

        [HttpDelete]
        public IActionResult Delete([FromBody] long id)
        {
            try
            {
                _dishService.DeleteDish(id);
            }
            catch (NullReferenceException)
            {
                NotFound();
            }

            return Ok();
        }
    }
}
