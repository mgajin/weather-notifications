import Axios from 'axios';

const state = {
    services: [],
    weather: {}
};

const getters = {
    getServices: state => state.services,
    getWeather: state => state.weather
};

const actions = {
    LOAD_SERVICES({ commit }) {
        Axios.get('http://localhost:3000/user/service')
            .then(response => {
                let services = response.data.services;
                commit('load_services', services);
            })
            .catct(err => alert(err));
    },
    GET_WEATHER({ commit }, city) {
        Axios.get(`http://localhost:3000/user/service/weather/${city}`)
            .then(response => {
                commit('set_weather', response.data.weather);
            })
            .catch(err => alert(err));
    }
};

const mutations = {
    load_services: (state, services) => {
        state.services = services;
    },
    set_weather: (state, weather) => {
        state.weather = weather;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
