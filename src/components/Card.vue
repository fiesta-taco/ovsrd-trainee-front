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
<style scoped>

.card {
  flex-wrap: nowrap;
  border-radius: 3px;
  min-width: 90%;
  padding: 8px 8px 4px 12px;
  height: min-content;
  box-sizing: border-box;
  transition: transform 0.2s ease;
  scroll-margin: 8px;
  background-color: var(--card-background-color);
  box-shadow: var(--ds-shadow-raised, 0 1px 1px #091e4240, 0 0 1px #091e424f);
  color: var(--ds-text, --card-color);
  cursor: pointer;
  margin-bottom: 8px;
}
.card:hover {
    background-color: var(--card-background-color-hover);
}


.card-title {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  text-align: left;
  color: var(--card-title-color);
  cursor: pointer;
  flex-wrap: nowrap;
  overflow: hidden;
}

.is-content {
  background-image: url("../assets/menu.svg");
  position: relative;
  display: block;
  width: 16px;
  height: 16px;
  border-bottom-left-radius: 1px;
  border-bottom-right-radius: 1px;
  margin-top: 4px;
  transition: transform 0.2s ease;
}

</style>

