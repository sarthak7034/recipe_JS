import Search from './models/Search'
import Recipe from './models/Recipe'
import * as searchView from './views/searchView'
import * as recipeView from './views/recipeView'
import {element, renderLoader, clearLoader} from './views/base'


const state = {}

/* SEARCH CONTROLLER */
const controlSearch = async () => {

    //Input 
    const query = searchView.getInput()


    if(query){

        state.search = new Search(query);

        searchView.clearInput();
        searchView.clearResults();
        renderLoader(element.searchRes)

        try{

            await state.search.getResult()          

            clearLoader()
            searchView.renderResults(state.search.result);
        }catch(err){
            alert('Something wrong again!!!')
            clearLoader()
        }
    }
}

element.searchForm.addEventListener('submit',e => {
    
    e.preventDefault()
    controlSearch()

})


element.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline')
    console.log(btn)
    if(btn){
       const goToPage = parseInt(btn.dataset.goto, 10)
       searchView.clearResults();
       searchView.renderResults(state.search.result, goToPage);

    }
})

/* RECIPE CONTROLLER*/

const controlRecipe = async () =>{
    const id = window.location.hash.replace('#','')
    console.log(id)
    if(id){

        //prepare UI for change
        recipeView.clearRecipe()
        renderLoader(element.recipe);

        //Highlight the recipe
        if(state.search) searchView.highlightSelected(id)
        
        //Create new recipe object
        state.recipe = new Recipe(id)

        try{
            //Get recipe data
            await state.recipe.getRecipe()
            state.recipe.parseIngredients()

            //Calculate servings and time
            state.recipe.calcTime()
            state.recipe.calcServings()             

            //Render recipe
            clearLoader()
            recipeView.renderRecipe(state.recipe)

        }catch(err){

            alert ('Error processing recipe')
        }
    }
}

['hashchange', 'load'].forEach(event => window.addEventListener(event,controlRecipe))



element.recipe.addEventListener('click',e =>{
    if(e.target.matches('.btn-decrease,.btn-decrease *')){

        if(state.recipe.servings >1){
            state.recipe.updateServings('dec')
            recipeView.updateServingsIngredients(state.recipe)
        }

    }else if (e.target.matches('.btn-increase,.btn-increase *')){
        //Increase button is clicked
        state.recipe.updateServings('inc')
        recipeView.updateServingsIngredients(state.recipe)
    }
    console.log(state.recipe)
} )
