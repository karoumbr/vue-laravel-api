<template>
  <div class="container">
    <form @submit.prevent="insertData">
      <div class="form-group">
        <label for="reference">Référence</label>
        <input
          type="text"
          name="reference"
          class="form-control"
          v-model="product.reference"
        />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input
          type="text"
          name="description"
          class="form-control"
          v-model="product.description"
        />
      </div>
      <div class="form-group">
        <label for="quantite">Quantité</label>
        <input
          type="text"
          name="quantite"
          class="form-control"
          v-model="product.quantite"
        />
      </div>
      <div class="form-group">
        <label for="prix">Prix</label>
        <input
          type="text"
          name="prix"
          class="form-control"
          v-model="product.prix"
        />
      </div>
      <div class="form-group">
        <button type="submit" class="btn btn-dark btn-sm mt-4">Valider</button>
        </div>
    
    </form>

    <hr />
    <h1>Liste des produits</h1>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Référence</th>
          <th scope="col">Description</th>
          <th scope="col">Quantité</th>
          <th scope="col">Prix</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="prod in products" :key="prod.id">
          <th scope="row">{{ prod.id }}</th>
          <td>{{ prod.reference }}</td>
          <td>{{ prod.description }}</td>
          <td>{{ prod.quantite }}</td>
          <td>{{ prod.prix }}</td>
          <td>
            <button class="btn btn-danger btn-sm" @click="deleteData(prod.id)">Supprimer</button>
            <router-link :to="`/edit/${prod.id}`" class="btn btn-warning btn-sm mx-2">
    Mise à jour
  </router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';


export default {
  data() {
    return {
      product: {
        reference: '',
        description: '',
        quantite: '',
        prix: '',
      },
      products: [],
    };
  },
  mounted() {
    this.getProducts();
  },
  methods: {
    getProducts() {
      axios
        .get('http://localhost:8000/api/products')
        .then((response) => {
          this.products = response.data;
        })
        .catch((error) => {
          console.error('Error fetching products:', error);
        });
    },
    insertData() {
      axios
        .post('http://localhost:8000/api/addProduct', this.product)
        .then((response) => {
          this.products.push(response.data); // Update the products list
          this.product = { reference: '', description: '', quantite: '', prix: '' }; // Reset form
        })
        .catch((error) => {
          console.error('Error inserting product:', error);
        });
    },
    deleteData(id) {
      axios
        .delete(`http://localhost:8000/api/deleteProduct/${id}`)
        .then(() => {
          this.products = this.products.filter(prod => prod.id !== id); // Update the products list
        })
        .catch((error) => {
          console.error('Error deleting product:', error);
        });
    },
  },
};
</script>

<style scoped>
.form-group  {
  text-align: left; /* Assurez-vous que le texte est aligné à gauche */
  display: block;   /* Assurez-vous que l'étiquette prend toute la largeur disponible */
}

</style>
