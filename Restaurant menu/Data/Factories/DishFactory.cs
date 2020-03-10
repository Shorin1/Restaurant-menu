﻿using Microsoft.AspNetCore.Mvc;
using Restaurant_menu.Data.Interfaces.Factories;
using Restaurant_menu.Models;
using System;
using System.Collections.Generic;

namespace Restaurant_menu.Data.Factories
{
    public class DishFactory : IDishFactory
    {
        public DishFactory()
        {
        }

        public Dish CreateDish(string name, string description, int cost, int weight, int calories, int coockingTime, Ingredient[] ingredients)
        {
            Dish dish = CreateDish(0, name, description, cost, weight, calories, coockingTime, ingredients);
            return dish;
        }

        //public Dish CreateDish(long id, string name, string description, int cost, int weight, int calories, int coockingTime)
        //{
        //    var ingredients = _ingredientsFactory.GetIngredients();
        //    Dish createdDish = CreateDish(id, name, description, cost, weight, calories, coockingTime, ingredients);
        //    return createdDish;
        //}

        public Dish CreateDish(long id, string name, string description, int cost, int weight, int calories, int coockingTime, Ingredient[] ingredients)
        {
            Dish createdDish = new Dish()
            {
                Id = id,
                CreateDate = DateTime.Now,
                Name = name,
                Description = description,
                Cost = cost,
                Weight = weight,
                Calories = calories,
                CoockingTime = coockingTime,
            };

            createdDish.Ingredients = new List<Ingredient>();
            createdDish.Ingredients.AddRange(ingredients);

            return createdDish;
        }
    }
}
