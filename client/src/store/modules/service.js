import Axios from 'axios';

const state = {
    weather: {},
    weathers: []
};

const getters = {
    getWeather: state => state.weather,
    getWeathers: state => state.weathers
};

const actions = {
    // Get weather data
    GET_WEATHER({ commit }, city) {
        Axios.get(`http://localhost:3000/user/v1/service/weather/${city}`)
            .then(response => {
                commit('set_weather', response.data.weather);
            })
            .catch(err => alert(err));
    },
    // Get all weathers from database
    GET_ALL({ commit }) {
        Axios.get('http://localhost:3000/weather/v1')
            .then(response => {
                commit('set_all', response.data.weathers);
            })
            .catch(err => alert(err));
    }
};

const mutations = {
    set_weather: (state, weather) => {
        state.weather = weather;
    },
    set_all: (state, weathers) => {
        state.weathers = weathers;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
