import Vue from 'vue';
import App from './App.vue';

// Importando e configurando Element UI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// Importando e configurando Vue Apollo (GraphQL Client)
import VueApollo from 'vue-apollo';
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core';

Vue.use(ElementUI);
Vue.use(VueApollo);

// Configuração do cliente Apollo
const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql', // URL do nosso backend
});

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
});

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  apolloProvider, // Injetando o Apollo na nossa aplicação
}).$mount('#app');