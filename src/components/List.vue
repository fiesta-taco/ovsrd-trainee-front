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
                s3Key: event.draggedContext.element.s3Key,
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
<style scoped>

.title-block {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid var(--title-block-border-bottom);
}

.list {
  margin-top: 15px;
  margin-left: 5px;
  margin-right: 5px;
  padding: 10px;
  border: 1px solid var(--list-border);
  border-radius: 10px;
  min-width: 250px;
  border-color: var(--list-border-color);
  height: min-content;
  box-sizing: border-box;
  background: var(--list-background);
  max-height: 90%;
  display: flex;
  flex-direction: column;
}

.input-list-title{
  background: #0000;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 500;
    color: var(--list-title-color);
    cursor: pointer;
    position: relative;
    display: block;
    height: 18px;
    border-bottom-left-radius: 1px;
    border-bottom-right-radius: 1px;
    margin-top: 8px;
    margin-bottom: 16px;
    border-style: none;
    font-size: 16px;
}

.card-box {
  flex-grow: 1;
  flex-shrink: 1;
  overflow-y: auto;
  box-shadow: var(--ds-shadow-raised, 0 1px 1px #091e4240, 0 0 1px #091e424f);
  padding: 1px 4px 0;
  background-color: var(--card-box-background-color);
}
::-webkit-scrollbar {
  background-color: var(--scrollbar-background-color);
  border-radius: 20px;
  border: 4px solid var(--scrollbar-border);
  width: 10px;
  -webkit-transform: translateZ(0);
}

.add-card {
  margin: 5px 0;
  padding: 1px;
  background-color: var(--add-card-background-color);
  border-radius: 3px;
  position: relative;
  color: var(--list-text-color);
  display: flex;
  cursor: pointer;
  flex: 1 0 auto;
  transition: transform 0.2s ease;
}
.add-card:hover {
  transform: scale(1.04);
}

.addcard-text {
  font-family: Arial, Helvetica, sans-serif;
  margin-left: 20px;
  color: var(--add-card-text);
}

</style>