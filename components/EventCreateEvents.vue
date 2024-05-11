<template>
    <div class="MainBox">
        <div v-if="showForm" class="FormBox">
            <h1>Buat Event Baru</h1>
            <div class="FormContent">
                <h2>Informasi Penting</h2>
                <div class="row">
                    <div class="col">
                        <b-form-group label="Judul Event" label-for="event-title">
                            <b-form-input id="event-title" v-model="eventform.eventTitle" required/>
                        </b-form-group>
                    </div>
                    <div class="col-8">
                        <b-form-group label="Subjudul" label-for="event-subtitle">
                            <b-form-input id="event-subtitle" v-model="eventform.eventSubtitle" required/>
                        </b-form-group>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <b-form-group label="Waktu Mulai" label-for="event-date">
                            <b-form-input id="event-date" v-model="eventform.eventStartTime" type="datetime-local" required/>
                        </b-form-group>
                    </div>
                    <div class="col">
                        <b-form-group label="Waktu Selesai" label-for="event-end-date">
                            <b-form-input id="event-end-date" v-model="eventform.eventEndTime" type="datetime-local" required/>
                        </b-form-group>
                    </div>
                    <div class="col-8">
                        <b-form-group label="Lokasi" label-for="event-location">
                            <b-form-input id="event-location" v-model="eventform.eventLocation" required/>
                        </b-form-group>
                    </div>
                </div>
            </div>

            <div class="FormContent">
                <h2>Kategori dan Harga Tiket</h2>
                <div v-for="(ticketCategory, index) in eventform.ticketCategories" :key="index" class="row">
                    <div class="col-8">
                        <b-form-group label="Nama Kategori Tiket">
                            <b-form-input v-model="ticketCategory.name" required />
                        </b-form-group>
                    </div>
                    <div class="col">
                        <b-form-group label="Jumlah Tiket">
                            <b-form-input v-model="ticketCategory.quantity" type="number" min=1 required/>
                        </b-form-group>
                    </div>
                    <div class="col">
                        <b-form-group label="Harga per Tiket">
                            <b-form-input v-model="ticketCategory.price" type="number" min=0 required/>
                        </b-form-group>
                        
                    </div>
                    <div class="RemoveButtonContainer"> 
                        <button class="RemoveButton" @click="removeTicketCategory(index)">-</button>
                    </div>
                </div>
                <b-button id="AddCategoryButton" @click="addTicketCategory">Tambah Kategori Tiket</b-button>
            </div>
            <div class="FormContent">
                <h2>Konten Promosional</h2>
                <div>
                    <label for="event-poster">Unggah Poster Event</label>
                    <div class="row">
                        <div class="col">
                            <div class="FileUpload">
                                <div
                                    class="UploadArea"
                                    @dragover.prevent
                                    @drop.prevent="handleDrop"
                                    @click="$refs.fileInput.click()"
                                >
                                    <b-icon-upload aria-setsize="lg"/>
                                    <p>Click or drag file to this area to upload</p>
                                    <p>Support for a single or bulk upload. Strictly prohibit from uploading NSFW images.</p>
                                </div>
                                <input
                                    ref="fileInput"
                                    type="file"
                                    accept=".png, .jpg, .jpeg, .gif"
                                    style="display: none"
                                    multiple
                                    @change="handleFileSelect"
                                />
                            </div>
                        </div>
                        <div class="col">
                            <b-form-group label="Tags" label-for="event-tag">
                                <b-form-input
                                    id="event-tag"
                                    v-model="selectedTags"
                                    placeholder="Masukkan tag (Tekan Enter untuk memasukkan tag)"
                                    @keydown.enter.prevent="addTag"
                                />
                            </b-form-group>
                            <div class="SelectedTags">
                                <span v-for="(tag, index) in eventform.eventTags" :key="index" class="TagItem">{{ tag }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <b-form-group label="Deskripsi Event">
                    <div class="AutoGenerateContainer">
                        <div class="RemainingChances">
                            Sisa {{ remainingChances }} kesempatan
                        </div>
                        <b-button size="sm" class="GenerateButton" @click="autoGenerateDesc">Auto Generate</b-button>
                    </div>
                    <wysiwyg v-model="eventform.eventDescription" />
                </b-form-group>
                <div>
                    <b-button @click="togglePreview">Lihat Preview</b-button>
                </div>
            </div>
        </div>
        <div v-if = "showForm" class="BottomButtons">
            <b-button class="CancelButton">Cancel</b-button>
            <b-button>Simpan</b-button>
        </div>
        <div v-if="!showForm" class="PreviewBox">
            <div class="FormBox">
                <h1>Preview Page</h1>
                <h3>Halaman di bawah ini merupakan tampilan yang akan dilihat oleh pembeli.</h3>
                <div id="BackButtonContainer">
                    <b-button class="BackButton" @click="togglePreview">Kembali</b-button>
                </div>
                
            </div>
            <div class="FormBox">
                <PreviewEvent :form-data="eventform" />
            </div>
            
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import wysiwyg from "vue-wysiwyg"; 
import "vue-wysiwyg/dist/vueWysiwyg.css";
import PreviewEvent from "./PreviewEvent.vue"

Vue.use(wysiwyg, {
    hideModules: { "hyperLink": true },
    forcePlainTextOnPaste: true,
    maxHeight: "30rem",
});
export default {
    name: 'EventCreateEvents',
    components: {
        PreviewEvent,
    },
    data() {
        
        return {
            eventform: {
                eventTitle:  '',
                eventSubtitle:  '',
                eventStartTime: '',
                eventEndTime:  '',
                eventLocation:  '',
                ticketCategories:  [
                    {
                        name:'',
                        quantity:1,
                        price:0,
                    },
                ],
                eventTags:  [],
                eventDescription:  null,
            },
            selectedTags:"",
            chances: 4,
            showForm:true,
            generatedContent:'',
        }
    },
    computed: {
        content() {
            return this.eventform.eventDescription;
        },
        remainingChances() {
            console.log("remaining", this.chances)
            return this.chances;
        
        }
    },
    watch: {
        'eventform.eventStartTime'(newValue, oldValue) {
            this.checkTimeValidity();
        },
        'eventform.eventEndTime'(newValue, oldValue) {
            this.checkTimeValidity();
        },
},
    methods:{
        checkTimeValidity() {
            if (new Date(this.eventform.eventStartTime) >= new Date(this.eventform.eventEndTime)) {
                alert("Waktu Mulai harus lebih awal dari Waktu Selesai.");
                this.eventform.eventStartTime = '';
                this.eventform.eventEndTime = '';
            }
        },
        addTicketCategory() {
            this.eventform.ticketCategories.push({
                name: '',
                quantity: 1,
                price: 0
            })
        },
        removeTicketCategory(index) {
            this.eventform.ticketCategories.splice(index, 1);
        },
        async autoGenerateDesc(){
            const userData = JSON.parse(localStorage.getItem('userData'));
            const userid = userData?.userId;
            let pureText = ''
            if(this.isHTML(this.eventform.eventDescription)){
                pureText = this.extractPureText(this.eventform.eventDescription);
            }
            else{
                pureText = this.eventform.eventDescription
            }
            if (pureText === '') {
                alert('No text to generate.'); // Handle empty content
                return;
            }

            try {
                // Make API request to ChatGPT with the pure text
                if(this.chances === 0){
                    alert("Kesempatan habis")
                }
                else{
                    const response = await this.$axios.post('api/generate_description/generate-description', { userId:userid, text: pureText });
                    this.generatedContent = response.data.message; // Assuming API response has a key 'generatedText'
                    this.chances--;
                    this.eventform.eventDescription += this.generatedContent
                    console.log(this.chances)
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error generating content. Please try again.');
            }
            
        },
        handleDrop(e) {
            this.handleFiles(e.dataTransfer.files);
        },
        handleFileSelect(e) {
            this.handleFiles(e.target.files);
        },
        handleFiles(files) {
            const allowedTypes = ['image/png', 'image/jpeg', 'image/gif'];
            const maxFileSize = 10 * 1024 * 1024; 
            for (let i = 0; i < files.length; i++) {
                if (!allowedTypes.includes(files[i].type)) {
                    alert('File type not supported. Please upload PNG, JPEG, or GIF files only.');
                    return;
                }
                if (files[i].size > maxFileSize) {
                    alert('File size exceeds the limit. Please upload files up to 10 MB.');
                    return;
                }
            }
            console.log(files);
        },
        addTag() {
            if (this.selectedTags && !this.eventform.eventTags.includes(this.selectedTags)) {
                this.eventform.eventTags.push(this.selectedTags);
                this.selectedTags = ''; // Clear the input after adding the tag
            }
        },
        togglePreview(){
            console.log("Preview", this.eventform)
            this.showForm = !this.showForm
            this.$emit('preview-event', this.eventform);
            // this.$router.push({ name: 'PreviewEvent', params: { formData: this.eventform } });
        },
        isHTML(txt) {
      // Check if eventDescription contains HTML tags
            const containsHTML = /<[a-z][\s\S]*>/i.test(txt);
            if (containsHTML) {
                return true
            } else {
                return false
            }
        },
        extractPureText(htmlContent) {
      // Use DOMParser to extract text from HTML
            const parser = new DOMParser();
            const parsedHtml = parser.parseFromString(htmlContent, 'text/html');
            return parsedHtml.body.textContent || ''; // Extract text content
        },
        
    },

}
</script>
<style scoped>
.MainBox{
    display: flex;
    width: 100%;
    justify-content: center;
    align-content: center;
    flex-direction: column;
    margin-bottom: 1rem;
}
.FormBox{
    width: 85%;
    max-width: 62.5rem; 
    margin: 0 auto;
    overflow-y: auto;
    background-color: white;
    padding: 20px;
    border:solid #f2f0e9 1px;
    border-radius: 0.5rem;
    margin-top:0.5rem;
    margin-bottom: 0.5rem;
}
.FormContent{
    margin:0.125rem;
    padding:0.5rem;
    border:solid #f2f0e9 1px;
    border-radius: 0.25rem;
}
h1{
    font-size: 1.5rem;   
}
h2{
    font-size: 1.25rem;
}
h3{
    font-size:1rem;
    color:#57576F ;
}
.row {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 10px;
}
.col {
    flex: 1;
    margin-right: 10px;
}
.col-8 {
    flex: 2;
    margin-right: 10px;
}
.RemoveButtonContainer {
    display:flex;
    align-items: flex-end;
    flex: 0.2;
    margin-right: 10px;
}
.RemoveButton{
    height: 2rem;
    align-self:flex-end;
    margin-bottom: 1.25rem;
    border-radius: 0.5rem;
}
#AddCategoryButton{
    color:#035037;
    background-color: transparent;
    border-color: #035037;
    width: 100%;
}
.BottomButtons {
    display: flex;
    justify-content: flex-end; 
    margin-top: 0.5rem;;
    width: 85%;
    max-width: 62.5rem; 
    margin: 0 auto;
    padding-right: 1.25rem;
    align-items: center;
    gap: 1rem;
}
.CancelButton{
    color: #035037;
    background-color: #f2f0e9;
    border-color: #035037;
}
.BackButton{
    background-color:#035037;
}
.AutoGenerateContainer{
    display: flex;
    justify-content: flex-end;
    gap:1rem;
    margin:0.5rem;
    width: 100%;
    max-width: 62.5rem;
    padding-right: 0.5rem;
}
.GenerateButton {
    background-color: #035037;
}
.RemainingChances {
    display: flex;
    align-items: center; 
}
.FileUpload {
  width: 100%;
  height: 200px;
  border: 2px dashed #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  cursor: pointer;
  background-color: #F1F1F5;
}

.UploadArea {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.UploadArea img {
  width: 50px;
  height: 50px;
  margin-bottom: 10px;
}
.SelectedTags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0.5rem;
}
.TagItem {
    color:#f2f0e9;
    background-color: #F1600D;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    cursor: pointer;
}
#BackButtonContainer{
    display: flex;
    justify-content: flex-end; 
    margin-top: 0.5rem;
    width:100%;
    max-width: 62.5rem; 
    margin: 0 auto;
    
}
</style>