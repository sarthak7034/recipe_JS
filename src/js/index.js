import Search from './models/Search'
import * as searchView from './views/searchView'
import {element, renderLoader, clearLoader} from './views/base'


const state = {}

const controlSearch = async () => {

    const query = searchView.getInput()

    if(query){

        state.search = new Search(query);

        searchView.clearInput();
        searchView.clearResults();
        renderLoader(element.searchRes)


        await state.search.getResult();

        clearLoader()

        searchView.renderResults(state.search.result);
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

