
<template>
    <div class="main">
        <div class="headline">
            <h1> Igorello</h1>
        </div>
        
        <SwiperBoard 
            v-if="useSwiper"
            :lists="lists"
            @add-card="addCardToList"
            @update-list-title="updateListTitle"
            @delete-card="deleteCard"
            @delete-list="deleteList"
            @open-modal-card="openModalCard"  
        />
        <DeskBoard 
            v-else
            :lists="lists"
            @add-card="addCardToList"
            @update-list-title="updateListTitle"
            @delete-card="deleteCard"
            @delete-list="deleteList"
            @open-modal-card="openModalCard"  
            @drag-card="dragCard"           
        />
        
        <CardModal
            v-if="isModalOpen"
            :card="modalCard"
            @close-modal="closeModal"
            @update-card="updateCard"
        />
        <div class="bottom-bar">
            <p> Produced by Ihor Bilash </p>
        </div>
    </div>
</template>

<script>
import CardModal from './CardModal.vue';
import SwiperBoard from './SwiperBoard.vue';
import DeskBoard from './DeskBoard.vue';
import {mapActions ,mapState}from 'vuex';

export default {
    name: 'BoardV',
    components: {
        CardModal,
        SwiperBoard,
        DeskBoard,
    },
    provide(){
        return {
            addNewList:this.addNewList,
        };
    },
    data() {
        return {
            useSwiper:false,
            isModalOpen: false,
            modalCard: null,
            editing: false,
        };
    },
    computed:mapState({
        lists:state=>state.lists,
    }), 
    mounted() {
        if(window.innerWidth < 676){
            this.useSwiper = true;
        }
        this.getListsApi();
        window.addEventListener('resize', this.handleResize);
    },

    methods: {
        ...mapActions(['getListsApi','createListApi','updateListTitleApi',
            'deleteListApi','createCardApi','updateCardApi','deleteCardApi','dragAndDropCardApi']),
        handleResize() {
            if (window.innerWidth < 767) {
                this.useSwiper = true;
            } else if (window.innerWidth > 767) {
                this.useSwiper = false;
            }
        },
        
        addCardToList(listId, cardTitle) {
            const cardsLengthInThisList = this.getCardsLengthByList(listId);
            const newPosition = cardsLengthInThisList+1;
            const list = {
                listId:listId,
                title:cardTitle,
                cardText:'',
                position:newPosition,
            };
            this.createCardApi(list);
        },
        getCardsLengthByList(listId){
            const list = this.lists.find(list=>list.listId===listId);
            if(list.cards){
                return list.cards.length;
            }else{
                return 0;
            }
        },
        addNewList() {
            const newList = {
                position: this.lists.length + 1,
                title: 'New List',
            };
            this.createListApi(newList);
        },
        updateListTitle(list) {
            this.updateListTitleApi(list);
        },
        openModalCard(currentCard) {
            const updatedlist = this.lists.find(list => list.listId === currentCard.listId);
            const updatedCard = updatedlist.cards.find(card => card.cardId === currentCard.cardId);
            this.modalCard = updatedCard;
            this.isModalOpen = true;
        },
        closeModal() {
            this.isModalOpen = false;
        },
        async updateCard(newCard) {
            await this.updateCardApi(newCard);
            this.isModalOpen = false;
        },
        async deleteCard(card) {
            await this.deleteCardApi(card);
            this.isModalOpen = false;
        },
        deleteList(listId) {
            this.deleteListApi(listId);
        },
        dragCard(options,movedCard){
            
            const data={}
            this.dragAndDropCardApi(data);
        },

    },
};

</script>
<style src="../assets/trello.css"></style>