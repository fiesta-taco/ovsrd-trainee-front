import axios from 'axios';
import BASE_URL from './base_url';
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
                const response = await axios.get(`${BASE_URL}/dev/lists`);
                commit('SET_LISTS', response.data.lists);
            } catch (error) {
                console.error(error);
            }
        },
        async createListApi({ dispatch }, newList) {
            try {
                const response = await axios.post(`${BASE_URL}/dev/list`, newList);
                if(response.data.list){
                    await dispatch('getListsApi');
                }        
            } catch (error) {
                console.error(error);
            }
        },

        async updateListTitleApi({ commit }, list) {
            try {
                const response = await axios.put(`${BASE_URL}/dev/list`, list);
                if(response.data.list){
                    commit('UPDATE_LIST_TITLE', response.data.list);
                }
            } catch (error) {
                console.error(error);
            }
        },

        async deleteListApi({ dispatch }, listId) {
            try {
                const response = await axios.delete(`${BASE_URL}/dev/list/${listId}`);
                if (response.data.ok) {       
                    await dispatch('getListsApi');
                }
            } catch (error) {
                console.error(error);
            }
        },

        async createCardApi({dispatch},card){
            try {
                const response = await axios.post(`${BASE_URL}/dev/card`, card);
                if(response.data.card){
                    await dispatch('getCardsByListId',response.data.card.listId);
                }
            } catch (error) {
                console.error(error);
            }
        },
        async updateCardApi({dispatch},card){
            try {
                const response = await axios.put(`${BASE_URL}/dev/card`, card);
                if(response.data.card){
                    await dispatch('getCardsByListId',response.data.card.listId);
                }

            } catch (error) {
                console.error(error);
            }
        },
        async deleteCardApi({dispatch},card){
            try {
                const response = await axios.delete(`${BASE_URL}/dev/card/${card.cardId}`);
                if (response.data.ok) {       
                    await dispatch('getCardsByListId',card.listId);
                }
            } catch (error) {
                console.error(error);
            }
        },
        async getCardsByListId({commit},listId){
            try {
                const response = await axios.get(`${BASE_URL}/dev/cards/${listId}`);
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
        dragAndDropCardApi({commit},data){

        },
    },

});


export default store;



