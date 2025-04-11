import axios from "axios";
import { BACKEND_URL } from "../utils/backend";

export const categoriesService = {
  async createCategorie(newCategorie) {
    try {
      const response = await axios.post(`${BACKEND_URL}/categories`, newCategorie);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la création du categorie :", error);
      throw error;
    }
  },

  async getAllCategories() {
    try {
      const response = await axios.get(`${BACKEND_URL}/categories`);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des categories :", error);
      throw error;
    }
  },

  async getCategorieById(id) {
    try {
      const response = await axios.get(`${BACKEND_URL}/categories/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération du categorie ID ${id} :`, error);
      throw error;
    }
  },

  async updateCategorie(id, updatedData) {
    try {
      const response = await axios.put(`${BACKEND_URL}/categories/${id}`, updatedData);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la mise à jour du categorie ID ${id} :`, error);
      throw error;
    }
  },

  async deleteCategorie(id) {
    try {
      const response = await axios.delete(`${BACKEND_URL}/categories/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la suppression du categorie ID ${id} :`, error);
      throw error;
    }
  },
};
