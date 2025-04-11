import axios from "axios"
import { BACKEND_URL } from "../utils/backend"

export const  authService = {

    async register(utilisateur){
     
      try {
        const response =  await axios.post(`${BACKEND_URL}/utilisateurs` , utilisateur)
        const data = response.data
        
        return data
      } catch (error) {
        throw error
      }
    },
    async login(email , mot_de_passe){

        try {
            const response =   await axios.post(`${BACKEND_URL}/login`, {email: email ,
                mot_de_passe: mot_de_passe
             })
             const data = response.data
        
             return data

        } catch (error) {
            throw error 
        }
    }
}