import axios from "axios";
import { BACKEND_URL } from "../utils/backend";

export const produitsService = {
  async createProduit(newProduit) {
    try {
      const response = await axios.post(`${BACKEND_URL}/produits`, newProduit);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la création du produit :", error);
      throw error;
    }
  },

  async getAllProduits() {
    try {
      const response = await axios.get(`${BACKEND_URL}/produits`);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des produits :", error);
      throw error;
    }
  },

  async getProduitById(id) {
    try {
      const response = await axios.get(`${BACKEND_URL}/produits/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération du produit ID ${id} :`, error);
      throw error;
    }
  },

  async updateProduit(id, updatedData) {
    try {
      const response = await axios.put(`${BACKEND_URL}/produits/${id}`, updatedData);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la mise à jour du produit ID ${id} :`, error);
      throw error;
    }
  },

  async deleteProduit(id) {
    try {
      const response = await axios.delete(`${BACKEND_URL}/produits/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la suppression du produit ID ${id} :`, error);
      throw error;
    }
  },
};
