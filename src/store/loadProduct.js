import { defineStore } from "pinia";
import axios from "axios";

const API_URL = "https://dev-su.eda1.ru/test_task/products.php";

export const useLoadProduct = defineStore("load", {
  state: () => {
    return {
      items: [],
    };
  },
  getters: {},

  actions: {
    async loadProducts() {
      try {
        const response = await axios.get(`${API_URL}`);

        console.log(response.data.products);
        this.items = response.data.products;
        console.log(this.items);
      } catch (error) {
        console.log(error);
      }
    },
  },
});
