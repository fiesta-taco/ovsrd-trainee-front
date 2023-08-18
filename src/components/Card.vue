<template>
    <div
        ref="cardText"
        class="card"
        @click="openModalCard"
    >
        <div style="display: flex; justify-content: space-between;">
            <div style="display: grid;">
                <div class="card-title">
                    {{ card.title }}
                </div>
            </div>
            <div
                class="delete-button"
                @click.stop="deleteCard"
            />
        </div>

        <div
            v-if="card.cardText!==''"
            class="is-content"
        /> 
    </div>
</template>
  
<script>

export default {
    name: 'CardV',
    props: {
        card:{
            type:Object,
            required:true,
            default:()=>({}),
        },
    },

    methods: {
        openModalCard() {
            this.$emit('open-modal-card', this.card);
        },
        closeModal() {
            this.isModalOpen = false;
        },
        deleteCard() {
            this.$emit('delete-card', this.card);
        },

    },
};
</script>
<style src="../assets/trello.css"></style>

