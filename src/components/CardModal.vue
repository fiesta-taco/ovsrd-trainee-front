<template>
    <div class="modal">
        <div class="modal-content">
            <img src="" alt="">
            <div class="modal-title-block">
                <div class="card-modal-title" :contenteditable=this.isEditText @input="updateModalTitle">
                    {{ this.modalTitle }}</div>
                <div class="close-modal" @click="closeModal"></div>
            </div>
            <div class="main-text-tools">
                <div class="main-text">
                    <textarea class="input-in-module" v-if="isEditText" v-model="modalText"
                        @input="updateModalText"></textarea>
                    <p v-else>{{ modalText }}</p>
                </div>
                <div class="tools">
                    <div class="edit-text-btn" @click="openTextEdit"></div>
                    <div class="remove-card-btn" @click="deleteModalCard"></div>
                    <div class="save-card-btn" @click="saveCard"></div>
                </div>
            </div>

        </div>
    </div>
</template>
  
<script>
export default {

    props: ['card', 'listId'],
    data() {
        return {
            isEditText: false,
            modalTitle: this.card.title,
            modalText: this.card.text,

        }
    },
    methods: {
        closeModal() {
            this.$emit('close-modal');
        },
        openTextEdit() {
            if (this.isEditText) {
                this.isEditText = false;
            } else {
                this.isEditText = true;
            }
        },
        deleteModalCard() {
            this.$emit('delete-card', this.listId, this.card.id)
        },
        saveCard() {
          //  console.log("before save ==>",this.modalTitle," == ", this.modalText)
            if (this.modalTitle.trim() !== "" && this.modalText.trim() !== "") {
                const newCard = {
                    id: this.card.id,
                    title: this.modalTitle,
                    text: this.modalText
                }
                this.$emit('save-card', this.listId, newCard);
            }
        },
        updateModalTitle(event) {
            this.modalTitle = event.target.innerText;
        },
        updateModalText() {
          console.log(" -update modal text---> ", this.modalText )
        },

    },
};
</script>
  
<style scoped>
@import url(../assets/variable.css);
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--modal-background-color);
    display: flex;
    justify-content: center;
    align-items: center;
}

/* Modal Content   */
.modal-content {
    background-color: var(--modal-content-background-color);
    border-radius: 2%;
    margin: auto;
    padding: 10px;
    width: 30%;
    max-height: 70%;
    text-align: center;
    display: flex;
    flex-direction: column;
}

.modal-title-block {
    display: flex;
    justify-content: space-between;
    border-bottom-left-radius: 1px;
    border-bottom-right-radius: 1px;
    transition: transform 0.2s ease;
}

.card-modal-title {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 150%;
    text-align: left;
    color: var(--card-modal-title-color);
    flex-wrap: nowrap;
    overflow: hidden;
    margin: 5%;
    border-bottom: 1px solid var(--card-modal-title-border-bottom);
}

.main-text-tools {
    display: flex;
    justify-content: space-between;
    height: max-content;
}

.main-text {
    width: 90%;
    border-radius: 5px;
    background-color: var(--main-text-modal-background-color);
    padding: 8px;
    white-space: pre-wrap;
    overflow-wrap: break-word;
    font-size: 14px;
    line-height: 1;
    text-align: left;
}

.tools {
    /* background-color: #b8b5b8;*/
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    border-radius: 5px;
}

.fill-text-btn {
    background-image: url("../assets/file-add.svg");
    position: relative;
    display: block;
    width: 24px;
    height: 24px;
    border-bottom-left-radius: 1px;
    border-bottom-right-radius: 1px;
    margin-top: 4px;
    transition: transform 0.2s ease;
}

.fill-text-btn:hover {
    transform: scale(1.05);
}

.close-modal {
    background-image: url("../assets/close.svg");
    position: relative;
    display: block;
    width: 24px;
    height: 24px;
    border-bottom-left-radius: 1px;
    border-bottom-right-radius: 1px;
    margin-top: 4px;
    transition: transform 0.2s ease;
}

.close-modal:hover {
    transform: scale(1.05);
}

.edit-text-btn {
    background-image: url("../assets/pen.svg");
    position: relative;
    display: block;
    width: 24px;
    height: 24px;
    border-bottom-left-radius: 1px;
    border-bottom-right-radius: 1px;
    margin-top: 4px;
    transition: transform 0.2s ease;
}

.edit-text-btn:hover {
    transform: scale(1.08);
}

.remove-card-btn {
    background-image: url("../assets/remove.svg");
    position: relative;
    display: block;
    width: 24px;
    height: 24px;
    border-bottom-left-radius: 1px;
    border-bottom-right-radius: 1px;
    margin-top: 4px;
    transition: transform 0.2s ease;
}
.remove-card-btn:hover {
    transform: scale(1.08);
}

.save-card-btn {
    background-image: url("../assets/enter.svg");
    position: relative;
    display: block;
    width: 24px;
    height: 24px;
    border-bottom-left-radius: 1px;
    border-bottom-right-radius: 1px;
    margin-top: 4px;
    transition: transform 0.2s ease;
}

.save-card-btn:hover {
    transform: scale(1.08);
}

.input-in-module {
    width: 90%;
    height: 80%;
    border-radius: 5px;
    background-color: #b8b5b882;
    padding: 8px;
    white-space: pre-wrap;
    overflow-wrap: break-word;
    font-size: 12px;
    line-height: 1.5;
    
}
</style>