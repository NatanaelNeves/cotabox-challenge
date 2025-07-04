import Vue from 'vue';
import App from './App.vue';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import VueApollo from 'vue-apollo';
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core';

Vue.use(ElementUI);
Vue.use(VueApollo);

const graphqlEndpoint = process.env.VUE_APP_GRAPHQL_ENDPOINT || 'http://localhost:4000/graphql';

const httpLink = createHttpLink({
  uri: graphqlEndpoint,
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
  apolloProvider,
}).$mount('#app');
