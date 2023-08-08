
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
        />
        
        <CardModal
            v-if="isModalOpen"
            :card="modalCard"
            @close-modal="closeModal"
            @delete-card="deleteCard"
            @save-card="saveCard"
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
    computed:{
        ...mapState(['lists']),
        
    },
    mounted() {
        this.getListsApi();
        if(window.innerWidth < 676){
            this.useSwiper = true;
        }
        window.addEventListener('resize', this.handleResize);
    },

    methods: {
        ...mapActions(['getListsApi','createListApi','updateListTitleApi','deleteListApi']),
        handleResize() {
            if (window.innerWidth < 767) {
                this.useSwiper = true;
            } else if (window.innerWidth > 767) {
                this.useSwiper = false;
            }
        },
        
        addCardToList(listId, cardTitle) {
            const list = this.lists.find(list => list.id === listId);
            if (list) {
                list.cards.push({ id: Date.now(), title: cardTitle, text: '' });
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
        saveCard(newCard) {
            const updatedlist = this.lists.find(list => list.listId === newCard.listId);
            const updatedCard = updatedlist.cards.find(card => card.cardId === newCard.cardId);
            if (updatedCard) {
                updatedCard.title = newCard.title;
                updatedCard.text = newCard.text;
            }
            this.isModalOpen = false;
            //   console.log("save after modal card===>>>", this.lists)
        },
        deleteCard(card) {
            const updatedList = this.lists.find(list => list.listId === card.listId);
            const cards = updatedList.cards.filter(card => card.cardId !== card.cardId);
            if (cards) {
                const renamedPositionCards = this.updateCardIds(cards);
                updatedList.cards = renamedPositionCards;
            }
            this.isModalOpen = false;
            //  console.log("after delete card===>>>", this.lists)
        },
        deleteList(listId) {
            this.deleteListApi(listId);
            //this.updateListIds();
            //  console.log(" === out list====>>>", this.lists)
        },
        updateListIds() {
            this.lists.forEach((list, index) => {
                list.listId = index + 1;
            });
        },
        updateCardIds(cards) {
            return cards.map((card, cardIndex) => {
                card.position = cardIndex + 1;
                return card;
            });
            
        },
    },
};

</script>
<style src="../assets/trello.css"></style>