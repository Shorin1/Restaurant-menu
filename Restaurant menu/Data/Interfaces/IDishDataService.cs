﻿using Restaurant_menu.Models;
using Restaurant_menu.Models.DTO;
using System.Linq;

namespace Restaurant_menu.Data.Interfaces
{
    public interface IDishDataService
    {
        Dish Get(long id);
        int GetCountDishes();
        IQueryable<Dish> GetAll();
        void Create(Dish dish);
        void Delete(long id);
        void Update(Dish dish);
        IQueryable<Dish> Sort(string fieldName);
        IQueryable<Dish> SortDescending(string fieldName);
        IQueryable<Dish> Filter(FilterParamsDto filterParams);
    }
}
