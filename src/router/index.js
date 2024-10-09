import { createRouter, createWebHistory } from 'vue-router';
import ProductList from '../components/ListProducts.vue'; // Assurez-vous d'importer votre composant de liste de produits
import ProductEdit from '../components/ProductEdit.vue'; // Votre composant de mise à jour

const routes = [
  { path: '/', component: ProductList },
  { path: '/edit/:id', component: ProductEdit },
  // Ajoutez d'autres routes ici
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
