<template>
    <div
        class="board"
    >
        <draggable 
            v-model="localLists"
            class="draggable-board" 
            :move="dragAndDropList" 
            :options="draggableOptions"
            @end="dropEndList"
        >
            <List
                v-for="list in localLists"
                :key="list.cardId"
                :list="list"
                :list-key="list.listId"
                :mobile="false"
                @add-card="addCardToListFromDeskBoard"
                @update-list-title="updateListTitleDeskBoard"  
                @delete-card="deleteCardDesk"  
                @delete-list="deleteListDesk"
                @open-modal-card="openModalCardDesk"
                @drag-card="dragCard"
            /> 
        </draggable>   
        <div
            class="add-list"
            @click="addNewList"
        >
            + add list
        </div>                
    </div>
</template>

<script>
import List from './List.vue';
import draggable from 'vuedraggable';


export default {
    name: 'DeskBoard',
    components: {
        List,
        draggable,
    },
    inject:['addNewList'],
    props:{
        lists:{
            type: Array,
            required: true,
            default: () => ([]),
        },
    },
    data(){
        return{
            localLists:this.lists,
            draggableOptions: {
                group: 'lists', 
                animation: 150, 
            },
            drList:null,
        };
    },
    watch: {
        'lists': function(newLists) {
            this.localLists = newLists;
        },
    },   
    methods:{
        dragAndDropList(event){        
            const futurePosition =event.draggedContext.futureIndex+1 ;
            const movedList = {
                listId: event.draggedContext.element.listId,
                title: event.draggedContext.element.title,
                position: futurePosition ,
            };
            this.drList = movedList;
        },
        dropEndList(){
            const movedList = this.drList;
            this.drList = null;
            this.$emit('drag-list',movedList);
        },

        addCardToListFromDeskBoard(listId,titleCard){
            this.$emit('add-card', listId, titleCard);
        },
        updateListTitleDeskBoard(list){
            this.$emit('update-list-title', list);
        },
        deleteCardDesk(cardId){
            this.$emit('delete-card', cardId);
        },
        deleteListDesk(listId){
            this.$emit('delete-list', listId);
        },
        openModalCardDesk(card){
            this.$emit('open-modal-card', card);
        },
        dragCard(movedCard){
            this.$emit('drag-card',movedCard);
        },
    },
  
};

</script>
<style scoped>
.board {
  height: 87%;
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  background-color: var(--board-background);
  max-width: 100%;
}
.draggable-board{
    display: flex;
}

</style>