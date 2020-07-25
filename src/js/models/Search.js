import axios from 'axios'
import {key, proxy} from '../config'

class Search {
    constructor(query){
        this.query=query
    }


    async getResult(){
        try{
            const res = await axios.get(`https://forkify-api.herokuapp.com/api/search?q=${this.query}`);
            this.result = res.data.recipes
            
        }catch(error){
            alert(error)
        }
    }
}

export default Search




