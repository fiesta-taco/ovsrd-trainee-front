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
            <Card 
                v-for="card in list.cards" 
                :key="card.id" 
                :card="card" 
                @open-modal-card="openModalCard"
                @delete-card="deleteCard" 
            />
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

export default {
    name: 'ListV',
    components: {
        Card,
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
            editing: false,
            newListTitle: this.list.title,
        };
    },

   
    methods: {
       
        changeEditing() {
            if(this.editing){
                this.editing = false;
            }else{
                this.editing = true;
            }
        },
        addCard() {
            this.$emit('add-card', this.list.id, 'New Card');
 
        },
        openModalCard(cardId) {
            this.$emit('open-modal-card', this.list.id, cardId);
        },
        deleteCard(cardId) {
            this.$emit('delete-card', this.list.id, cardId);
        },
        deleteList() {
            this.$emit('delete-list', this.list.id);
        },
        saveListTitle() {
            if (this.newListTitle.trim() !== '') {
                this.editing = false;
                this.$emit('update-list-title', this.list.id, this.newListTitle);
                this.$refs.inputField.blur();
            }
        },
    },
};

</script>
<style src="../assets/trello.css">
</style>