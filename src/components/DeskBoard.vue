<template>
    <div
        class="board"
    >
        <List
            v-for="list in lists"
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


export default {
    name: 'DeskBoard',
    components: {
        List,
    },
    inject:['addNewList'],
    props:{
        lists:{
            type: Array,
            required: true,
            default: () => ([]),
        },
    },
    methods:{
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
  height: 80%;
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  background-color: var(--board-background);
  max-width: 100%;
}

</style>