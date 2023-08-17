<template>
    <div class="modal">
        <div class="modal-content">
            <img 
                src="" 
                alt=""
            >
            <div class="modal-title-block">
                <div
                    ref="cardTitle"
                    class="card-modal-title" 
                    contenteditable="true" 
                >
                    {{ modalTitle }}
                </div>
                <div 
                    class="close-modal"
                    @click="closeModal"
                />
            </div>
            <div class="main-text-tools">
                <div class="main-text">
                    <div
                        ref="cardText"
                        class="input-in-module" 
                        contenteditable="true"
                    >
                        {{ modalText }}
                    </div>
                </div>
                <div 
                    v-if="isURL" 
                    class="url-block"
                >
                    Card Image : 
                    <a 
                        :href="card.imageURL" 
                        target="_blank"
                    > 
                        {{ card.imageURL }}
                    </a>
                </div>
                <div class="tools">
                    <div>
                        <div 
                            v-if="!isOpenLoadFile"
                            class="load-file-btn" 
                            @click="isOpenLoadFile=true" 
                        >
                            Load File
                        </div>
                        <div 
                            v-else 
                            style="display: flex;"
                        >
                            <input 
                                ref="imageInput"
                                class="add-file" 
                                type="file" 
                                @change="uploadFile"
                            >
                            <div 
                                v-if="isLoaded"
                                class="load-file-btn" 
                                @click="saveFileByCard" 
                            >
                                Save File
                            </div>
                        </div>
                    </div>
                    
                    <div style="display: flex;">
                        <div 
                            class="reset-card-btn" 
                            @click="resetModal" 
                        >
                            Reset
                        </div>
                        <div 
                            class="save-card-btn" 
                            @click="updateCard" 
                        >   
                            Save
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>


export default {

    props: {
        card: {
            type: Object,
            required: true,
            default: () => ({}),
        },
    },
    data() {
        return {
            modalTitle: this.card.title,
            modalText: this.card.cardText,
            isOpenLoadFile:false,
            isLoaded:false,
            file:'',
            isURL:this.card.imageURL===''?false:true,

        };
    },
    
    methods: {
        closeModal() {
            this.$emit('close-modal');
        },
        
        updateCard() {
            const title = this.$refs.cardTitle.textContent;
            const text = this.$refs.cardText.textContent;
            if (title.trim() !== '' /*&& text.trim() !== ''*/) {
                const newCard = {
                    cardId: this.card.cardId,
                    title: title,
                    cardText: text.trim(),
                    position:this.card.position,
                    imageURL:this.card.imageURL,
                };
                this.$emit('update-card',newCard);
            }
        },
        resetModal(){
            this.$nextTick(() => {
                this.$refs.cardTitle.textContent = this.card.title;
                this.$refs.cardText.textContent = this.card.cardText;
            });
        },
        uploadFile(){
            this.file = this.$refs.imageInput.files[0];
            this.isLoaded = true;
        },
        saveFileByCard(){
            let formData = new FormData();
            formData.append('image',this.file);
            this.$emit('save-file-by-card',this.card, formData);
            this.closeModal();
            this.isLoaded = false;
            this.isOpenLoadFile=false;
        },
    },
};
</script>
  
<style scoped>
@import url(../assets/variable.css);

.modal {
    position: absolute;
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
    background-color: var(--list-background);
    border-radius: 2%;
    margin: auto;
    padding: 10px;
    width: 30%;
    max-height: 70%;
    min-width: 350px;
    min-height: 220px;
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
      background: #0000;
    font-weight: 600;
    position: relative;
    border-style: none;
    font-size: 16px;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 150%;
    text-align: left;
    color: var(--card-modal-title-color);
    margin: 5%;
    border-bottom: 1px solid var(--card-modal-title-border-bottom);
}

.main-text-tools {

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
    margin-left: 5%;
}

.tools {
    /* background-color: #b8b5b8;*/
    display: flex;
    justify-content: space-between;
    border-radius: 5px;
    margin-left: 5%;
    margin-right: 5%;
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
    cursor: pointer;
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

.reset-card-btn {
    background-color: var(--btn-save);
    position: relative;
    display: block;
    cursor: pointer;
    width: 50px;
    border-bottom-left-radius: 1px;
    border-bottom-right-radius: 1px;
    border-radius: 5px;
    margin: 12px;
    
}

.load-file-btn{
    background-color: var(--btn-save);
    position: relative;
    display: block;
    cursor: pointer;
    width: 80px;
    border-bottom-left-radius: 1px;
    border-bottom-right-radius: 1px;
    border-radius: 5px;
    margin-top:12px ;
    margin-bottom: 12px;
}

.reset-card-btn:hover {
    background-color: var(--btn-save-hover);
}

.save-card-btn {
    background-color: var(--btn-save);
    position: relative;
    display: block;
    cursor: pointer;
    width: 50px;
    border-bottom-left-radius: 1px;
    border-bottom-right-radius: 1px;
    border-radius: 5px;
    margin-top: 12px;
    margin-bottom: 12px;
}

.save-card-btn:hover {
    background-color: var(--btn-save-hover);
}

.input-in-module {
    width: 100%;
    min-height: 120px;
    border-radius: 5px;
    background-color: #b8b5b882;
    padding: 8px;
    white-space: pre-wrap;
    overflow-wrap: break-word;
    font-size: 14px;
    line-height: 1.5;

}
.url-block{
    display: flex;
    margin-left: 5%;
}
</style>