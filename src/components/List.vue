<template>
    <div class="list">
        <div style="display: flex; justify-content: space-between;">
            <div>
                <h3 v-if="!editing" @click="editing = true" style="color: #095473; cursor: pointer;">{{ list.title }}</h3>
                <input v-else v-model="newListTitle" @keyup.enter="saveListTitle" @blur="saveListTitle" />
            </div>
            <div class="delete-button" @click="deleteList">delete</div>
        </div>
        <div class="card-box">
            <Card v-for="card in list.cards" :key="card.id" :card="card" @update-card-text="saveCardText"
                @update-card-title="saveCardTitle" @delete-card="deleteCard" />
        </div>
        <div class="add-card">
            <input v-model="newCardTitle" placeholder="Add new Card Title" style="text-align: center;" />
            <b-button pill variant="danger" @click="addCard">+</b-button>
        </div>

    </div>
</template>

<script>
import Card from "./Card.vue";
export default {
    name: "List-v",
    components: {
        Card,
    },
    props: ["list"],
    data() {
        return {
            editing: false,
            newCardTitle: "",
            newListTitle: this.list.title
        };
    },
    methods: {
        addCard() {
            if (this.newCardTitle.trim() !== "") {
                this.$emit("addCard", this.list.id, this.newCardTitle.trim());
                this.newCardTitle = "";
            }
        },
        deleteCard(cardId) {
            this.$emit('delete-card', this.list.id, cardId)
        },
        deleteList() {
            this.$emit('delete-list', this.list.id)
        },
        saveListTitle() {
            if (this.newListTitle.trim() !== "") {
                this.editing = false;
                this.$emit('update-list-title', this.list.id, this.newListTitle)
            }
        },
        saveCardText(cardId, newCardText) {
            this.$emit('update-card-text', this.list.id, cardId, newCardText)
        },
        saveCardTitle(cardId, newCardTitle) {
            this.$emit('update-card-title', this.list.id, cardId, newCardTitle)
        }
    }

}

</script>
<style src="../assets/trello.css"></style>