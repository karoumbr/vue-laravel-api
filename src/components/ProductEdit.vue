<template>
    <div class="container">
      <h1>Mise à jour du produit</h1>
      <form @submit.prevent="updateProduct">
        <div class="form-group">
          <label for="reference">Référence</label>
          <input
            type="text"
            id="reference"
            v-model="product.reference"
            class="form-control"
            required
          />
        </div>
  
        <div class="form-group">
          <label for="description">Description</label>
          <input
            type="text"
            id="description"
            v-model="product.description"
            class="form-control"
            required
          />
        </div>
  
        <div class="form-group">
          <label for="quantite">Quantité</label>
          <input
            type="number"
            id="quantite"
            v-model="product.quantite"
            class="form-control"
            required
          />
        </div>
  
        <div class="form-group">
          <label for="prix">Prix</label>
          <input
            type="number"
            id="prix"
            v-model="product.prix"
            class="form-control"
            required
          />
        </div>
  
        <button type="submit" class="btn btn-dark">Valider</button>
        <router-link to="/" class="btn btn-secondary ml-2">Annuler</router-link>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { ref, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  
  export default {
    setup() {
      const product = ref({
        reference: '',
        description: '',
        quantite: '',
        prix: ''
      });
  
      const route = useRoute();
      const router = useRouter();
  
      // Fonction pour récupérer le produit à partir de l'API
      const fetchProduct = async () => {
        const id = route.params.id;
        try {
          const response = await axios.get(`http://localhost:8000/api/product/${id}`);
          product.value = response.data; // Remplit les champs du formulaire
        } catch (error) {
          console.error('Erreur lors de la récupération du produit:', error);
        }
      };
  
      // Fonction pour mettre à jour le produit
      const updateProduct = async () => {
        const id = route.params.id;
        try {
          await axios.put(`http://localhost:8000/api/updateProduct/${id}`, product.value);
          router.push('/'); // Redirige vers la liste des produits après mise à jour
        } catch (error) {
          console.error('Erreur lors de la mise à jour du produit:', error);
        }
      };
  
      onMounted(fetchProduct); // Appelle la fonction lors du chargement du composant
  
      return {
        product,
        updateProduct
      };
    }
  };
  </script>
  
  <style scoped>
  .container {
    margin-top: 20px;
  }
  </style>
  