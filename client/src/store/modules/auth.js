import Axios from 'axios';

const state = {
    user: {}
};

const getters = {
    getUser: state => state.user
};

const actions = {
    // Login user
    SIGN_IN({ commit }, payload) {
        Axios.post('http://localhost:3000/user/auth/login', {
            email: payload.email,
            password: payload.password
        })
            .then(response => {
                localStorage.setItem(
                    'user',
                    JSON.stringify(response.data.user)
                );
                localStorage.setItem('jwt', response.data.token);
                commit('set_user', response.data.user);
            })
            .catch(err => alert(err));
    },
    // Register new user
    SIGN_UP({ commit }, payload) {
        Axios.post('http://localhost:3000/user/auth/register', {
            name: payload.name,
            email: payload.email,
            username: payload.username,
            password: payload.password,
            password2: payload.password2
        })
            .then(response => {
                localStorage.setItem(
                    'user',
                    JSON.stringify(response.data.user)
                );
                localStorage.setItem('jwt', response.data.token);

                commit('set_user', response.data.user);
            })
            .catch(err => alert(err));
    },
    SIGN_OUT({ commit }) {
        localStorage.setItem('jwt', null);
        localStorage.setItem('user', null);
        commit('set_user', null);
    },
    // Get logged user
    GET_USER({ commit }) {
        const user = JSON.parse(localStorage.getItem('user'));
        commit('set_user', user);
    }
};

const mutations = {
    set_user: (state, user) => {
        state.user = user;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
