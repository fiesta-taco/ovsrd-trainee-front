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
                <div class="upload-tools">
                    <div 
                        v-if="isOpenLoadFile" 
                        style="display: flex;"
                    >
                        <image-uploader
                            class="add-file"
                            :preview="false"  
                            :max-widht="300"
                            :max-height="300"
                            capture="environment"
                            :debug="0"
                            :auto-rotate="true"
                            do-not-resize="['gif', 'svg']"
                            output-format="verbose"
                            :quality="0.7"
                            accept="image/*"
                            @input="uploadFile"
                        />  
                    </div>
                    <div 
                        v-if="isLoaded"
                        class="save-file-btn" 
                        @click="saveFileByCard" 
                    >
                        Save File
                    </div> 
                </div>
                <div class="tools">
                    <div style="display: flex;">
                        <div 
                            v-if="!isOpenLoadFile"
                            class="load-file-btn" 
                            @click="openLoadBtnAndCloseOpenBtn" 
                        >
                            Upload File
                        </div>
                        <div 
                            v-if="showOpenImage" 
                            class="open-image-btn" 
                            @click="openFile"
                        >
                            Download File
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

import ImageUploader from 'vue-image-upload-resize';

export default {
    components: {
        ImageUploader,
    },
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
            isURL:this.card.s3Key===''?false:true,
            showOpenImage:false,
        };
    },
    mounted(){
        this.changeUrlStatus();
    },
    
    methods: {
        closeModal() {
            this.$emit('close-modal');
        },
        
        updateCard() {
            const title = this.$refs.cardTitle.innerText;
            const text = this.$refs.cardText.innerText;
            if (title.trim() !== '' ) {
                const newCard = {
                    cardId: this.card.cardId,
                    title: title,
                    cardText: text.trim(),
                    position:this.card.position,
                    s3Key:this.card.s3Key,
                };
                this.$emit('update-card',newCard);
            }
        },
        async openFile(){
            const key = this.card.s3Key;
            this.$emit('open-file',key);          
            
        },
        resetModal(){
            this.$nextTick(() => {
                this.$refs.cardTitle.textContent = this.card.title;
                this.$refs.cardText.textContent = this.card.cardText;
            });
            this.isOpenLoadFile = false;
            this.file='';
            this.isLoaded=false;
            this.changeUrlStatus();
        },
        openLoadBtnAndCloseOpenBtn(){
            this.isOpenLoadFile = true;
            this.showOpenImage =false;
        },
        changeUrlStatus(){
            if(!this.isLoaded&&this.isURL){
                this.showOpenImage = true;
            }else{
                this.showOpenImage = false;
            }
        },
        async uploadFile(output){
            const fileName = output.info.name.split('.')[0];
            const keyName = `${this.card.cardId}_${fileName}.jpeg`;
            const newFile = await this.createNewImage(output.dataUrl,fileName);
            this.file = {keyName,newFile};
            this.isLoaded = true;

        },
        saveFileByCard(){
            this.$emit('save-file-by-card',this.card, this.file);
            this.closeModal();
            this.file='';
            this.isOpenLoadFile = false;
            this.isLoaded = false;
            this.isOpenLoadFile=false;
        },
        async createNewImage(dataUrl,fileName){       
            const img = new Image();
            img.crossOrigin = 'Anonymous';
            img.src = dataUrl;
            const newImage = await new Promise((resolve)=>{
                img.onload = function () {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img, 0, 0);
                    canvas.toBlob(function (blob) {
                        const file = new File([blob], `${fileName}`, { type: 'image/jpeg' });
                        resolve(file);
                    }, 'image/jpeg');
                };
            });
            return newImage;
        },
    },
};
</script>
  
<style scoped>

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
    min-width: 300px;
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
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 150%;
    text-align: left;
    color: var(--card-modal-title-color);
    margin-left: 5%;
    margin-top: 3px;
    margin-bottom: 15px;
    /*border-bottom: 1px solid var(--card-modal-title-border-bottom);*/
    max-width: 230px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.main-text-tools {

    justify-content: space-between;
    height: max-content;
}

.main-text {
    width: 90%;
    border-radius: 5px;
    background-color: var(--main-text-modal-background-color);
    /*padding: 8px;*/
    white-space: pre-wrap;
    overflow-wrap: break-word;
    font-size: 14px;
    line-height: 1;
    text-align: left;
    margin-left: 5%;
}

.tools {
    display: flex;
    justify-content: space-between;
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


.reset-card-btn {
    background-color: var(--btn-save);
    position: relative;
    display: block;
    cursor: pointer;
    padding-left:4px;
    padding-right: 4px;
    border-radius: 5px;
    margin-top: 18px;  
    margin-bottom: 6px;
    margin-right: 5px;
}
.reset-card-btn:hover {
    background-color: var(--btn-save-hover);
}

.load-file-btn{
    background-color: var(--btn-save);
    position: relative;
    display: block;
    cursor: pointer;
    padding-left:4px;
    padding-right: 4px;
    border-radius: 5px;
    margin-top:18px ;
    margin-bottom: 6px;
    margin-right: 5px;
}
.save-file-btn{
    background-color: var(--btn-save);
    position: relative;
    display: block;
    cursor: pointer;
    padding-left:4px;
    padding-right: 4px;
    border-bottom-left-radius: 1px;
    border-bottom-right-radius: 1px;
    border-radius: 5px;
    margin-top:18px ;
    margin-bottom: 6px;
}
.save-file-btn:hover {
    background-color: var(--btn-save-hover);
}

.load-file-btn:hover {
    background-color: var(--btn-save-hover);
}

.save-card-btn {
    background-color: var(--btn-save);
    position: relative;
    display: block;
    cursor: pointer;
    padding-left:4px;
    padding-right: 4px;
    border-radius: 5px;
    margin-top: 18px;
    margin-bottom: 6px;
}

.save-card-btn:hover {
    background-color: var(--btn-save-hover);
}
.open-image-btn{
    background-color: var(--btn-save);
    position: relative;
    display: block;
    cursor: pointer;
    padding-left:4px;
    padding-right: 4px;
    border-radius: 5px;
    margin-top: 18px;
    margin-bottom:6px;
    margin-right: 5px;
}
.open-image-btn:hover {
    background-color: var(--btn-save-hover);
}
.input-in-module {
    width: 100%;
    min-height: 120px;
    max-height: 300px;
    overflow-y: auto;
    border-radius: 5px;
    white-space: pre-wrap;
    overflow-wrap: break-word;
    font-size: 14px;
    line-height: 1.5;
}


.add-file{
    display: inline-block;
    color: white;
    padding: 1px 1px;
    margin-top: 18px;
    margin-bottom: 6px;
    border-radius: 5px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: small;
    background-image: linear-gradient(to right, var(--board-background)0%, var(--header-background-color) 51%, var(--list-background) 100%);
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    width: 200px;
    height: auto;
}
.upload-tools{
    display: flex;
    justify-content: space-between;
    margin-left: 5%;
    margin-right: 5%;
}
</style>