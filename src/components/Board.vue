
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
            @save-file-by-card="saveFileByCard"
        />
        <Spinner 
            :loading="isLoading"
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
import Spinner from './Spinner.vue';
import {mapActions ,mapState}from 'vuex';

export default {
    name: 'BoardV',
    components: {
        CardModal,
        SwiperBoard,
        DeskBoard,
        Spinner,
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
            isLoading: false,
        };
    },
    computed:mapState({
        lists:state=>state.lists,
    }), 
    mounted() {
        if(window.innerWidth < 676){
            this.useSwiper = true;
        }
        this.getLists();
        window.addEventListener('resize', this.handleResize);
    },

    methods: {
        ...mapActions([
            'getListsApi','createListApi','updateListTitleApi','deleteListApi',
            'createCardApi','updateCardApi','deleteCardApi','dragAndDropCardApi',
            'saveFileByCardApi',
        ]),
        handleResize() {
            if (window.innerWidth < 767) {
                this.useSwiper = true;
            } else if (window.innerWidth > 767) {
                this.useSwiper = false;
            }
        },
        async getLists(){
            this.isLoading = true;
            await this.getListsApi();
            this.isLoading = false;
        },
        
        async addCardToList(listId, cardTitle) {
            this.isLoading = true;
            const cardsLengthInThisList = this.getCardsLengthByList(listId);
            const newPosition = cardsLengthInThisList+1;
            const card = {
                listId:listId,
                title:cardTitle,
                cardText:'',
                position:newPosition,
                imageURL:'',
            };
            await this.createCardApi(card);
            this.isLoading = false;
        },
        getCardsLengthByList(listId){
            const list = this.lists.find(list=>list.listId===listId);
            if(list.cards){
                return list.cards.length;
            }else{
                return 0;
            }
        },
        async addNewList() {
            this.isLoading = true;
            const newList = {
                position: this.lists.length + 1,
                title: 'New List',
            };
            await this.createListApi(newList);
            this.isLoading = false;
        },
        async updateListTitle(list) {
            this.isLoading = true;
            await this.updateListTitleApi(list);
            this.isLoading = false;
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
            this.isLoading = true;
            this.isModalOpen = false;
            await this.updateCardApi(newCard);
            this.isLoading = false;
            
        },
        async deleteCard(card) {
            this.isLoading = true;
            await this.deleteCardApi(card);
            this.isLoading = false;
        },
        async deleteList(listId) {
            this.isLoading = true;
            await this.deleteListApi(listId);
            this.isLoading = false;
        },
        async dragCard(movedCard){        
            this.isLoading = true; 
            await this.dragAndDropCardApi(movedCard);
            this.isLoading = false;
        },
        async saveFileByCard(card,formData){
            this.isLoading = true; 
            await this.saveFileByCardApi({card,formData});
            this.isLoading = false;
        },

    },
};

</script>
<style src="../assets/trello.css"></style>