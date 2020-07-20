import axios from 'axios'

class Search {
    constructor(query){
        this.query=query
    }


    async getResult(){
        const proxy = 'https://cors-anywhere.herokuapp.com/';
        const key = 'b5fe632c76msh74525fe485cf152p15eb4ajsn41ad825d4731';
        try{
            const res = await axios.get(`https://forkify-api.herokuapp.com/api/search?q=${this.query}`);
            this.result = res.data.recipes
            
        }catch(error){
            alert(error)
        }
    }
}

export default Search




