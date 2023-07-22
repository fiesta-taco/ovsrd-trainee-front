<template>
  <div ref="cardText" class="card">
    <div style="display: flex; justify-content: space-between;">
      <div style="display: grid;">
        <div class="card-title" v-if="!editingTitle" @click="editingTitle = true">{{ card.title }}</div>
        <input v-else v-model="newCardTitle" @keyup.enter="saveCardTitle" @blur="saveCardTitle" />
      </div>
      <b-button variant="danger" @click="deleteCard">delete</b-button>
    </div>

    <div  class="card-text" v-if="!editingText" @click="editingText = true">{{ newCardText }}</div>
    <input v-else v-model="newCardText" @keyup.enter="saveCardText" @blur="saveCardText" />

  </div>
</template>
  
<script>
export default {
  name: "Card-v",
  props: ['card'],
  data() {
    return {
      editingText: false,
      editingTitle: false,
      newCardText: this.card.text === undefined ?
        "click here for writing text" : this.card.text,
      newCardTitle: this.card.title,

    }
  },
  methods: {
    deleteCard(){
      this.$emit('delete-card', this.card.id)
    },
    saveCardText() {
      if (this.newCardText.trim() !== "") {
        this.editingText = false;
        this.$emit('update-card-text', this.card.id, this.newCardText)
        const element =this.$refs.cardText;
        element.style.backgroundColor = '#f3b6a6';
      }
    },
    saveCardTitle() {
      if (this.newCardTitle.trim() !== "") {
        this.editingTitle = false;
        this.$emit('update-card-title', this.card.id, this.newCardTitle)
      }
    }
  }
};
</script>
<style src="../assets/trello.css" ></style>

