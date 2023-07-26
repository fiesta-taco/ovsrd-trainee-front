
<template>
    <div class="main">
        <div class="headline">
            <h1> Igorello</h1>
        </div>

        <div class="board">
            <List
                v-for="list in lists"
                :key="list.id"
                :list="list"
                @add-card="addCardToList"
                @update-list-title="updateListTitle"
                @delete-card="deleteCard"
                @delete-list="deleteList"
                @open-modal-card="openModalCard"
            />
            <div
                class="add-list"
                @click="addNewList"
            >
                + add list
            </div>
        </div>
        <CardModal
            v-if="isModalOpen"
            :card="modalCard"
            :list-id="modalListId"
            @close-modal="closeModal"
            @delete-card="deleteCard"
            @save-card="saveCard"
        />
        <div class="bottom-bar">
            <p> Produced by Ihor Bilash </p>
        </div>
    </div>
</template>

<script>
import List from './List.vue';
import CardModal from './CardModal.vue';


export default {
    name: 'BoardV',
    components: {
        List,
        CardModal,
    },
    data() {
        return {
            isModalOpen: false,
            modalCard: null,
            modalListId: '',
            editing: false,
            newListTitle: '',
            lists: [
                { id: 1, title: 'List 1', cards: [] },
                {
                    id: 2, title: 'List 4324', cards: [
                        { id: 1, title: 'AAA', text: ' some default text' },
                        { id: 2, title: 'bbb', text: ' some ------- text' },
                    ],
                },
            ],
        };
    },


    methods: {

        addCardToList(listId, cardTitle) {
            const list = this.lists.find(list => list.id === listId);
            if (list) {
                list.cards.push({ id: Date.now(), title: cardTitle, text: '' });
            }
            //  console.log("after add card to list===>>>", this.lists)
        },
        addNewList() {
            const newList = {
                id: this.lists.length + 1,
                title: 'New List',
                cards: [],
            };
            this.lists.push(newList);
            this.newListTitle = '';
        },
        updateListTitle(listId, newTitle) {
            const updatedList = this.lists.find((list) => list.id === listId);
            if (updatedList) {
                updatedList.title = newTitle;
            }
        },
        openModalCard(listId, cardId) {
            const updatedlist = this.lists.find(list => list.id === listId);
            const updatedCard = updatedlist.cards.find(card => card.id === cardId);
            this.modalCard = updatedCard;
            this.modalListId = listId;
            this.isModalOpen = true;
        },
        closeModal() {
            this.isModalOpen = false;
        },
        saveCard(listId, newCard) {
            const updatedlist = this.lists.find(list => list.id === listId);
            const updatedCard = updatedlist.cards.find(card => card.id === newCard.id);
            if (updatedCard) {
                updatedCard.title = newCard.title;
                updatedCard.text = newCard.text;
            }
            this.isModalOpen = false;
            //   console.log("save after modal card===>>>", this.lists)
        },
        deleteCard(listId, cardId) {
            const updatedList = this.lists.find(list => list.id === listId);
            const cards = updatedList.cards.filter(card => card.id !== cardId);
            if (cards) {
                const renamedIdCards = this.updateCardIds(cards);
                updatedList.cards = renamedIdCards;
            }
            this.isModalOpen = false;
            //  console.log("after delete card===>>>", this.lists)
        },
        deleteList(listId) {
            this.lists = this.lists.filter(list => list.id !== listId);
            this.updateListIds();
            //  console.log(" === out list====>>>", this.lists)
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
        },
    },
};

</script>
<style src="../assets/trello.css"></style>