
<template>
    <div class="main">
        <div class="headline">
            <h1> Igorello</h1>
        </div>

        <div class="board">
            <List v-for="list in lists" :key="list.id" :list="list" @addCard="addCardToList"
                @update-list-title="updateListTitle" @update-card-text="saveCardText" @update-card-title="saveCardTitle"
                @delete-card="deleteCard" @delete-list="deleteList" />
            <div class="list">
                <div class="add-list">
                    <input v-model="newListTitle" type="text" placeholder="Add new List Name" style="text-align: center;" />
                    <button @click="addNewList" class="button-list">+</button>
                </div>
            </div>
        </div>

        <div class="bottom-bar">
            <p> Produced by Ihor Bilash </p>
        </div>
    </div>
</template>

<script>
import List from './List.vue'
export default {
    name: "Board-v",
    components: {
        List,
    },
    data() {
        return {
            editing: false,
            newListTitle: "",
            lists: [
                { id: 1, title: "List 1", cards: [] },
                {
                    id: 2, title: "List 4324", cards: [
                        { id: 1, title: "AAA", text: ' some default text' },
                        { id: 2, title: "bbb", text: ' some ------- text' },
                    ]
                },
            ]
        }
    },
    methods: {
        addCardToList(listId, cardTitle) {
            const list = this.lists.find(list => list.id === listId);
            if (list) {
                list.cards.push({ id: Date.now(), title: cardTitle });
            }
        },
        addNewList() {
            const newList = {
                id: this.lists.length + 1,
                title: this.newListTitle === "" ? "New List" : this.newListTitle,
                cards: []
            }
            this.lists.push(newList);
            this.newListTitle = "";

        },
        updateListTitle(listId, newTitle) {
            const updatedList = this.lists.find((list) => list.id === listId)
            if (updatedList) {
                updatedList.title = newTitle;
            }
        },
        saveCardText(listId, cardId, newText) {
            const updatedlist = this.lists.find(list => list.id === listId)
            const updatedCard = updatedlist.cards.find(card => card.id === cardId);
            if (updatedCard) {
                updatedCard.text = newText;
            }
        },
        saveCardTitle(listId, cardId, newTitle) {
            const updatedlist = this.lists.find(list => list.id === listId)
            const updatedCard = updatedlist.cards.find(card => card.id === cardId);
            if (updatedCard) {
                updatedCard.title = newTitle;
            }
        },
        deleteCard(listId, cardId) {
            const updatedList = this.lists.find(list => list.id === listId);
            const cards = updatedList.cards.filter(card => card.id !== cardId);
            if (cards) {
                const renamedIdCards = this.updateCardIds(cards)
                updatedList.cards = renamedIdCards;
            }
            console.log("after delete card===>>>",this.lists)

        },
        deleteList(listId) {
            this.lists = this.lists.filter(list => list.id !== listId);
            this.updateListIds();
            console.log(" === out list====>>>", this.lists)
        },
        updateListIds() {
            this.lists.forEach((list, index) => {
                list.id = index + 1;
            });
        },
        updateCardIds(cards) {
            return cards.map((card, cardIndex) => {
                card.id = cardIndex + 1;
                return card;
            });
        }
    },

}

</script>
<style src="../assets/trello.css"></style>