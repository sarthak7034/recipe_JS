import {key, proxy} from '../config'
import axios from 'axios';



export default class Recipe{
    constructor(id){
        this.id = id
    }

    async getRecipe() {
        try{
            const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.img = res.data.recipe.image_url;
            this.ingredients = res.data.recipe.ingredients;
        }catch(error){
            console.log(error)
            alert('something went wrong')
        }
    }

    calcTime(){
        // Assuming that we need 15 min for each 3 ingredients
        const numImg = this.ingredients.length;
        const periods = Math.ceil(numImg/3)
        this.time = periods*15 
    }

    calcServings() {
        this.servings = 4
    }

    parseIngredients() {
        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
        const units = [...unitsShort, 'kg', 'g'];

        const newIngredient = this.ingredients.map(el => {
            //replace longs units by short  ( Manage Units )    [Nice method]

            let ingredient = el.toLowerCase()
            unitsLong.forEach((unit,i) => {
                ingredient = ingredient.replace(unit, unitsShort[i])
            })
            
            // Remove parenthesis
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

            //Parse ingredients into count
            const arrIng = ingredient.split(' ');
            const unitIndex = arrIng.findIndex(el2 => units.includes(el2))

            let objIng
            if(unitIndex > -1){
            
                const arrCount = arrIng.slice(0,unitIndex)

                let count 
                if(arrCount.length === 1){
                    count = eval(arrIng[0].replace('-','+'))
                }else{
                    count = eval(arrIng.slice(0, unitIndex).join('+'))
                }

                objIng = {
                    count,
                    unit:arrIng[unitIndex],
                    ingredient:arrIng.slice(unitIndex + 1).join(' ')
                }

            }else if(parseInt(arrIng[0],10)){
               objIng = {
                   count:parseInt(arrIng[0], 10),
                   unit: '',
                   ingredient: arrIng.slice(1).join(' ')
               } 

            }else if(unitIndex === -1){

                objIng = {
                    count:1,
                    unit: '',
                    ingredient
                }
            }

            return objIng

        })
        this.ingredients =  newIngredient
    }   

    updateServings(type){

        //Servings
        const newServings = type === 'dec' ? this.servings - 1 : this.servings + 1;

        //Ingredients
        this.ingredients.forEach(ing => {
            ing.count *= (newServings /this.servings)
        })
    }



}