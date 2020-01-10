import Vue from 'vue';
import Vuex from 'vuex';
import styles from '../assets/theme/main.scss';
import auth from './modules/auth';
import service from './modules/service';

Vue.use(styles);
Vue.use(Vuex);

export default new Vuex.Store({
    modules: { auth, service }
});
