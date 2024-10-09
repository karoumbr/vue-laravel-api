import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'; // Importez le routeur

createApp(App)
  .use(router) // Utilisez le routeur
  .mount('#app');