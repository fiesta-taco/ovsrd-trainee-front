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
                @click="deleteCard"
            />
        </div>

        <div
            v-if="card.text!==''"
            class="is-content"
        />
    </div>
</template>
  
<script>

export default {
    name: 'CardV',
    props: ['card'],
    methods: {
        openModalCard() {
            this.$emit('open-modal-card', this.card.id);
        },
        closeModal() {
            this.isModalOpen = false;
        },
        deleteCard() {
            this.$emit('delete-card', this.card.id);
        },

    },
};
</script>
<style src="../assets/trello.css"></style>

