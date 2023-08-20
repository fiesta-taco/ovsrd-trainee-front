<template>
    <div  
        class="list"
    >
        <div class="title-block">
            <div>     
                <input   
                    ref="inputField"                     
                    v-model="newListTitle"
                    class="input-list-title" 
                    @keyup.enter="saveListTitle" 
                    @blur="saveListTitle"
                >  
            </div>
            <div 
                class="delete-button" 
                @click="deleteList"
            /> 
        </div>
        <div class="card-box">
            <draggable 
                v-model="localCards" 
                :move="dragAndDropCard" 
                :options="draggableOptions"
                @end="dropEnd"
            >
                <Card 
                    v-for="card in localCards" 
                    :key="card.cardId" 
                    :card="card" 
                    @open-modal-card="openModalCard"
                    @delete-card="deleteCard" 
                />
            </draggable>
        </div>
        <div 
            class="add-card"
            @click="addCard"
        >
            <div class="addcard-text">
                +
            </div>
            <div 
                class="addcard-text"
            >
                Add Card
            </div>
        </div> 
    </div>
</template>

<script>
import Card from './Card.vue';
import draggable from 'vuedraggable';


export default {
    name: 'ListV',
    components: {
        Card,
        draggable,
     
    },
    props: {
        mobile:{
            type:Boolean,
        },
        list: {
            type: Object,
            required: true,
            default: () => ({}),
        },
    },
    data() {
        return {
            newListTitle: this.list.title,
            localCards: this.list.cards,
            draggableOptions: {
                group: 'lists', 
                animation: 550, 
            },
            drCard:null,
            isLoading:false,
        };
    },
    watch: {
        'list.title': function(newTitle) {
            this.newListTitle = newTitle;
        },
        'list.cards': function(newCards){//localCard to Crad added for instant transfer
            this.localCards = newCards;
        },
    },   
    methods: {
        dragAndDropCard(event){        
            const futureListId = event.to.parentNode.parentNode.getAttribute('list-key');
            const futurePosition =event.draggedContext.futureIndex + 1;
            const movedCard = {
                listId: futureListId,
                cardId: event.draggedContext.element.cardId,
                title: event.draggedContext.element.title,
                cardText: event.draggedContext.element.cardText,
                position: futurePosition ,
            };
            this.drCard = movedCard;
        },
        dropEnd(){
            const movedCard = this.drCard;
            this.drCard = null;
            this.$emit('drag-card',movedCard);
            
        },
       
        addCard() {
            this.$emit('add-card', this.list.listId, 'New Card');
 
        },
        openModalCard(card) {
            this.$emit('open-modal-card', card);
        },
        deleteCard(card) {
            this.$emit('delete-card', card);
        },
        deleteList() {
            this.$emit('delete-list', this.list.listId);
        },
        saveListTitle() {
            if (this.newListTitle.trim() !== '') {
                const list={
                    listId:this.list.listId,
                    title:this.newListTitle,
                    position:this.list.position,
                };
                this.$emit('update-list-title', list);
                this.$refs.inputField.blur();
            }
        },
    },
};

</script>
<style src="../assets/trello.css">
</style>