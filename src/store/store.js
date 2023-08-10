// Ваш store.js файл або еквівалентний файл
import axios from 'axios';
import api_url from './api_url';
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

let store = new Vuex.Store({

    state: {
        lists: [],
    },
    mutations: {
        SET_LISTS (state, lists) {
            state.lists = lists;
            console.log('mutation-state_lists=>', state.lists);
        },
        SET_CARDS(state,param){
            let list = state.lists.find(list => list.listId === param.listId);
            list.cards = param.cardsByListId;
        },
        /* CREATE_LIST (state, newList) {
            state.lists.push(newList);
        },*/
        UPDATE_LIST_TITLE (state, updatedList) {
            const list = state.lists.find(list => list.listId === updatedList.listId);
            if (list) {
                list.title = updatedList.title;
            }
        },
        /*CREATE_CARD(state,newCard){
            const list = state.lists.find(list=>list.listId===newCard.listId);
            list.cards.push(newCard);
        },*/
        UPDATE_CARD(state,newCard){
            const list = state.lists.find(list=>list.listId===newCard.listId);
            let card = list.cards.find(card=>card.cardId===newCard.cardId);
            if(card){
                card = newCard;
            }
        },
    },
    actions: {
        async getListsApi({ commit }) {
            try {
                const response = await axios.get(`${api_url.development.API_URL_getListsApi}`);
                commit('SET_LISTS', response.data.lists);
            } catch (error) {
                console.error(error);
            }
        },
        async createListApi({ dispatch }, newList) {
            try {
                const response = await axios.post(`${api_url.development.API_URL_createListApi}`, newList);
                if(response.data.list){
                    await dispatch('getListsApi');
                }        
            } catch (error) {
                console.error(error);
            }
        },

        async updateListTitleApi({ commit }, list) {
            try {
                const response = await axios.put(`${api_url.development.API_URL_updateListTitleApi}`, list);
                if(response.data.list){
                    commit('UPDATE_LIST_TITLE', response.data.list);
                }
            } catch (error) {
                console.error(error);
            }
        },

        async deleteListApi({ dispatch }, listId) {
            try {
                const response = await axios.delete(`${api_url.development.API_URL_deleteListApi+listId}`);
                if (response.data.ok) {       
                    await dispatch('getListsApi');
                }
            } catch (error) {
                console.error(error);
            }
        },

        async createCardApi({dispatch},card){
            try {
                const response = await axios.post(`${api_url.development.API_URL_createCardApi}`, card);
                if(response.data.card){
                    await dispatch('getCardsByListId',response.data.card.listId);
                }
            } catch (error) {
                console.error(error);
            }
        },
        async updateCardApi({dispatch},card){
            try {
                const response = await axios.put(`${api_url.development.API_URL_updateCardApi}`, card);
                if(response.data.card){
                    await dispatch('getCardsByListId',response.data.card.listId);
                }

            } catch (error) {
                console.error(error);
            }
        },
        async deleteCardApi({dispatch},card){
            try {
                const response = await axios.delete(`${api_url.development.API_URL_deleteCardApi+card.cardId}`);
                if (response.data.ok) {       
                    await dispatch('getCardsByListId',card.listId);
                }
            } catch (error) {
                console.error(error);
            }
        },
        async getCardsByListId({commit},listId){
            try {
                const response = await axios.get(`${api_url.development.API_URL_getCardsByListId+listId}`);
                if(response.data.cards){
                    const param ={
                        listId:listId,
                        cardsByListId:response.data.cards,
                    };
                    commit('SET_CARDS',param);
                }
                
            } catch (error) {
                console.error(error);
            }
        },
    },

});


export default store;



