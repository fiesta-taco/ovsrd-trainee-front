<template>
    <VueSlickCarousel 
        v-bind="settings"
        :key="lists.length"
    >   
        <List
            v-for="list in lists"
            :key="list.cardId"
            :list="list"
            :list-key="list.listId"
            :mobile="true"
            @add-card="addCardToListFromSwiperBoard"
            @update-list-title="updateListTitleSwiperBoard"
            @delete-card="deleteCardSwiper"
            @delete-list="deleteListSwiper"
            @open-modal-card="openModalCardSwiper"
            @drag-card="dragCard"
        />  
        <div
            class="add-list"
            @click="addNewList"
        >
            + add list
        </div>
    </VueSlickCarousel>
</template>

<script>
import List from './List.vue';
import VueSlickCarousel from 'vue-slick-carousel';
import 'vue-slick-carousel/dist/vue-slick-carousel.css';
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css';


        
export default {
    name: 'SwiperBoard',
    components: {
        List,
        VueSlickCarousel,
  
    },
    inject:['addNewList'],
    props:{
        lists:{
            type: Array,
            required: true,
            default: () => ([]),
        },
    },
    data() {
        return {
            swiper: null,
            isModalOpen: false,
            modalCard: null,
            modalListId: '',
            editing: false,
            newListTitle: '',
            settings:{
                edgeFriction: 0.35,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 1000,
                dots: true,
            },
        };
    },

    methods: {
    
       
        addCardToListFromSwiperBoard(listId,titleCard){
            this.$emit('add-card', listId, titleCard);
        },
        updateListTitleSwiperBoard(list){
            this.$emit('update-list-title', list);
        },
        deleteCardSwiper(cardId){
            this.$emit('delete-card', cardId);
        },
        deleteListSwiper(listId){
            this.$emit('delete-list', listId);
        },
        openModalCardSwiper(card){
            this.$emit('open-modal-card', card);
        },
        dragCard(movedCard){
            this.$emit('drag-card',movedCard);
        },

    },
};

</script>
<style>

</style>