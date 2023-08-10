<template>
    <div   
        ref="swiper" 
        class="swiper"
    >
        <div class="swiper-wrapper">
            <List
                v-for="list in lists"
                :key="list.cardId"
                :list="list"
                :mobile="true"
                @add-card="addCardToListFromSwiperBoard"
                @update-list-title="updateListTitleSwiperBoard"
                @delete-card="deleteCardSwiper"
                @delete-list="deleteListSwiper"
                @open-modal-card="openModalCardSwiper"
            />   
            <div class="swiper-slide">
                <div
                    class="add-list"
                    @click="addNewList"
                >
                    + add list
                </div>
            </div>
        </div>
        <!-- If we need pagination -->
        <div class="swiper-pagination" />
        <!-- If we need navigation buttons -->
        <div class="swiper-button-prev" />
        <div class="swiper-button-next" />
        <!-- If we need scrollbar -->
        <div class="swiper-scrollbar" />
    </div>
</template>

<script>
import List from './List.vue';
import Swiper from 'swiper/bundle'; 

import 'swiper/swiper-bundle.css';


        
export default {
    name: 'SwiperBoard',
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
    data() {
        return {
            swiper: null,
            isModalOpen: false,
            modalCard: null,
            modalListId: '',
            editing: false,
            newListTitle: '',
        };
    },
    mounted(){
        this.initSwiper();
    },
    beforeDestroy() {
        this.swiper.destroy();
       
    },

    methods: {
        initSwiper() {
            this.swiper =  new Swiper(this.$refs.swiper, {
                loop: true,
                autoHeight: true,
                zoom: true,
                keyboard: { enabled: true },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
            });
        },
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

    },
};

</script>
<style src="../assets/trello.css"></style>