import {element} from './base';


export const getInput = () => element.searchInput.value;

export const clearInput = () =>{
     element.searchInput.value ='';
    }

export const clearResults = () => {
    element.searchResList.innerHTML = '';
    element.searchResPages.innerHTML = '';
}
//Built algo to limit name on website
const renderRecipeTitle = (title, limit) => {
    const newTitle = [];
    if(title.length > limit){
        title.split(' ').reduce((acc,cur) => {
            if(acc+cur.length <= limit){
                newTitle.push(cur)
            }
            return acc + cur.length;
        }, 0)

        return `${newTitle.join(' ')}...`
    }
    return title;

}


const renderRecipe = recipe => {
    const markup = ` 
    <li>
        <a class="results__link" href="#${recipe.recipe_id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="${recipe.title}">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${renderRecipeTitle(recipe.title,20)}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>
    `;
    element.searchResList.insertAdjacentHTML('beforeend',markup)
}

const createButton = (page, type) => `
        <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
            <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
                <svg class="search__icon">
                    <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
                </svg>
        </button>

`
// Very important part of pagination
const renderButtons = (page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults/resPerPage)
    let button
    if(page ===1 && pages>1){
    
         button = createButton(page,'next')

    }else if(page < pages){

        button = `${createButton(page,'next')}
                ${createButton(page,'prev')}`


    }else if(page === pages && pages > 1){

        button = createButton(page,'prev')

    }

    element.searchResPages.insertAdjacentHTML('afterbegin',button)
}

export const renderResults = (recipes, page = 1, resPerPage=10) => {
    //render results of current page
    const start = (page-1)*resPerPage  
    const end =  page * resPerPage

    recipes.slice(start,end).forEach(renderRecipe)

    //render pagination buttons
    renderButtons(page,recipes.length,resPerPage)
}

