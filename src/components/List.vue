<template>
    <!-- <div class="swiper-container">
        <div class="swiper-wrapper">-->
    <div class="list">
        <div class="title-block">
            <div>
                <div
                    v-if="!editing"
                    class="list-title"
                    @click="editing = true"
                >
                    {{ list.title }}
                </div>
                <input
                    v-else
                    v-model="newListTitle"
                    @keyup.enter="saveListTitle"
                    @blur="saveListTitle"
                >
            </div>
            <div
                class="delete-button"
                @click="deleteList"
            >
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
                    v-if="!addCardIsActive"
                    class="add-card"
                    @click="activateAddSpace"
                >
                    <!-- -->
                    <div class="addcard-text">
                        +
                    </div>
                    <div class="addcard-text">
                        Add Card
                    </div>
                </div>
                <div
                    v-else
                    class="card"
                >
                    <div style="display: flex; justify-content: space-between;">
                        <input
                            v-model="newCardTitle"
                            class="input-card"
                            placeholder="add title"
                            @blur="addCardIsActive = false"
                            @keyup.enter="addCard"
                        >
                        <b-button
                            class="input-btn"
                            @click="addCard"
                        >
                            +
                        </b-button>
                    </div>
                </div>
            </div>
        <!-- </div>
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
    </div>-->
        </div>
    </div>
</template>

<script>
import Card from './Card.vue';
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

export default {
    name: 'ListV',
    components: {
        Card,
    },

    props: ['list'],
    data() {
        return {
            addCardIsActive: false,
            swiper: null,
            editing: false,
            newCardTitle: '',
            newListTitle: this.list.title,
        };
    },

    mounted() {
        if (window.innerWidth <= 767) {
            this.initSwiper();
        }
        window.addEventListener('resize', this.handleResize);
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.handleResize);
        if (this.swiper) {
            this.swiper = null;
        }
    },

    methods: {
        initSwiper() {
            const swiperOptions = {
                modules: [Navigation],
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
            };
            this.swiper = new Swiper('.swiper-container', swiperOptions);
        },
        handleResize() {
            if (window.innerWidth <= 767 && !this.swiper) {
                this.initSwiper();
            } else if (window.innerWidth > 767 && this.swiper) {
                this.swiper = null;
            }
        },
        activateAddSpace() {
            this.addCardIsActive = true;
        },
        addCard() {
            if (this.newCardTitle.trim() !== '') {
                this.addCardIsActive = false;
                this.$emit('add-card', this.list.id, this.newCardTitle.trim());
                this.newCardTitle = '';
            }

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
            }
        },
    },
};

</script>
<style src="../assets/trello.css"></style>