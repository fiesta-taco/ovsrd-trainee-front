// Ваш store.js файл або еквівалентний файл
import axios from 'axios';

import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

let store = new Vuex.Store({

    state: {
        lists: [],
        // інші стани...
    },
    mutations: {
        SET_LISTS: (state, lists) => {
            state.lists = lists.lists
                .sort((a, b) => a.position - b.position);
            console.log('mutation-state_lists=>', lists.lists);
        },
        CREATE_LIST: (state, newList) => {
            state.lists.push(newList);
        },
        UPDATE_LIST: (state, updatedList) => {
            const index = state.lists.findIndex(list => list.listId === updatedList.listId);
            console.log('update list=>', updatedList);
            if (index !== -1) {
                state.lists.splice(index, 1, updatedList);
            }
        },
    },
    actions: {
        async getListsApi({ commit }) {
            try {
                const response = await axios.get('https://pi4rmhjdmj.execute-api.us-east-1.amazonaws.com/dev/lists');
                commit('SET_LISTS', response.data);
            } catch (error) {
                console.error(error);
            }
        },
        async createListApi({ commit }, newList) {
            try {
                const response = await axios.post('https://pi4rmhjdmj.execute-api.us-east-1.amazonaws.com/dev/list', newList);
                commit('CREATE_LIST', response.data.list);
            } catch (error) {
                console.error(error);
            }
        },

        async updateListTitleApi({ commit }, list) {
            try {
                const response = await axios.put('https://pi4rmhjdmj.execute-api.us-east-1.amazonaws.com/dev/list', list);
                commit('UPDATE_LIST', response.data.list);
            } catch (error) {
                console.error(error);
                throw error;
            }
        },

        async deleteListApi({ dispatch }, listId) {
            try {
                const response = await axios.delete(`https://pi4rmhjdmj.execute-api.us-east-1.amazonaws.com/dev/list/${listId}`)
                if (response.data.ok) {
                    await dispatch('getListsApi');
                }
                console.log('2 after delete=>', this.state.lists);
            } catch (error) {
                console.error(error);
                throw error;
            }
        },

    },

});


export default store;



