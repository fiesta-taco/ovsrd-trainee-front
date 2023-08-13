<template>
    <div  
        :class="{'swiper-slide':mobile, 'list':!mobile}"
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
                v-model="localList" 
                :move="dragAndDropCard" 
                :options="draggableOptions"
            >
                <Card 
                    v-for="card in list.cards" 
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
            localList: this.list.cards,
            draggableOptions: {
                group: 'lists', 
                animation: 150, 
            },
        };
    },
    watch: {
        'list.title': function(newTitle) {
            this.newListTitle = newTitle;
        },
    },   
    methods: {
        dragAndDropCard(event){
            
            const movedCard = event.draggedContext.element;
            const options={
                oldIndexArray : event.draggedContext.index,
                oldListId : this.list.listId,
                futureIndexArray: event.draggedContext.futureIndex,
                toList : event.to.parentNode.parentNode.getAttribute('list-key'),
            };
          
            

            this.$emit('drag-card',options,movedCard);

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