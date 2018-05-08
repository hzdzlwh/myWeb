import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        isLogin: false,
        openDialog: false
    },
    mutations: {
        SET_ISLOGIN: (state, isLogin) => {
            state.isLogin = isLogin;
        },
        SET_OPENDIALOG: (state, open) => {
            state.openDialog = open;
        }
    }
});

export default store;
