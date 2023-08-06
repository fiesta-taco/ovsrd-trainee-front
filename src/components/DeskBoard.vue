<template>
    <div
        class="board"
    >
        <List
            v-for="list in lists"
            :key="list.id"
            :list="list"
            :mobile="false"
            @add-card="addCardToListFromDeskBoard"
            @update-list-title="updateListTitleDeskBoard"  
            @delete-card="deleteCardDesk"  
            @delete-list="deleteListDesk"
            @open-modal-card="openModalCardDesk"
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
        updateListTitleDeskBoard(listId,newListTitle){
            this.$emit('update-list-title', listId, newListTitle);
        },
        deleteCardDesk(listId,cardId){
            this.$emit('delete-card', listId, cardId);
        },
        deleteListDesk(listId){
            this.$emit('delete-list', listId);
        },
        openModalCardDesk(listId,cardId){
            this.$emit('open-modal-card', listId,cardId);
        },
    },
  
};

</script>
<style src="../assets/trello.css"></style>