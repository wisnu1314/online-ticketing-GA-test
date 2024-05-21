<template>
    <div class="EditBox">
        <div v-if="showForm" class="FormEditBox">
            <h1>Edit Event</h1>
            <div class="FormContent">
                <h2>Informasi Penting</h2>
                <div class="row">
                    <div class="col">
                        <b-form-group label="Judul Event" label-for="event-title">
                            <b-form-input id="event-title" v-model="editeventform.eventTitle" required/>
                        </b-form-group>
                    </div>
                    <div class="col-8">
                        <b-form-group label="Subjudul" label-for="event-subtitle">
                            <b-form-input id="event-subtitle" v-model="editeventform.subTitle" required/>
                        </b-form-group>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <b-form-group label="Waktu Mulai" label-for="event-date">
                            <b-form-input id="event-date" v-model="editeventform.startDate" type="datetime-local" required/>
                        </b-form-group>
                    </div>
                    <div class="col">
                        <b-form-group label="Waktu Selesai" label-for="event-end-date">
                            <b-form-input id="event-end-date" v-model="editeventform.endDate" type="datetime-local" required/>
                        </b-form-group>
                    </div>
                    <div class="col-8">
                        <b-form-group label="Lokasi" label-for="event-location">
                            <b-form-input id="event-location" v-model="editeventform.location" required/>
                        </b-form-group>
                    </div>
                </div>
            </div>

            <div class="FormContent">
                <h2>Kategori dan Harga Tiket</h2>
                <div v-for="(ticketCategory, index) in editeventform.tickets" :key="index" class="row">
                    <div class="col-8">
                        <b-form-group label="Nama Kategori Tiket">
                            <b-form-input v-model="ticketCategory.categoryName" required />
                        </b-form-group>
                    </div>
                    <div class="col">
                        <b-form-group label="Jumlah Tiket">
                            <b-form-input v-model="ticketCategory.totalTickets" type="number" min=1 required/>
                        </b-form-group>
                    </div>
                    <div class="col">
                        <b-form-group label="Harga per Tiket">
                            <b-form-input v-model="ticketCategory.pricePerTicket" type="number" min=0 required/>
                        </b-form-group>

                    </div>
                    <div class="RemoveButtonContainer">
                        <button v-if="index !== 0" class="RemoveButton" @click="removeTicketCategory(index)">-</button>
                        <button v-if="index == 0" class="Unclickable" @click="removeTicketCategory(index)">-</button>
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
                                    <p>Support for a single upload. Strictly prohibit from uploading NSFW images.</p>
                                </div>
                                <input
                                    ref="fileInput"
                                    type="file"
                                    accept=".png, .jpg, .jpeg, .gif"
                                    style="display: none"
                                    @change="handleFileSelect"
                                />

                            </div>
                            <div v-if="!uploadedFile && editeventform.promotionalContent.posterImageUrl" class="UploadedFile">
                                <img :src="fileBeforeEdit" alt="Uploaded Image" style="max-width: 200px;">
                                <!-- <b-icon-trash style="cursor: pointer; color:red" @click="eraseFile"/> -->
                            </div>
                            <div v-if="uploadedFile" class="UploadedFile">
                                <p>{{ uploadedFile.name }}</p>
                                <b-icon-trash style="cursor: pointer; color:red" @click="eraseFile"/>
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
                                <span v-for="(tag, index) in editeventform.promotionalContent.tags" :key="index" class="TagItem">{{ tag }}</span>
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
                    <wysiwyg v-model="editeventform.promotionalContent.description" aria-required="true"/>
                </b-form-group>
                <div>
                    <b-button @click="togglePreview">Lihat Preview</b-button>
                </div>
            </div>
        </div>
        <div v-if = "showForm" class="BottomButtons">
            <b-button class="CancelButton" @click="Cancel">Cancel</b-button>
            <b-button @click="editEvent">Simpan</b-button>
        </div>
        <div v-if="!showForm" class="PreviewEditBox">
            <div class="FormEditBox">
                <h1>Preview Page</h1>
                <h3>Halaman di bawah ini merupakan tampilan yang akan dilihat oleh pembeli.</h3>
                <div id="BackButtonContainer">
                    <b-button class="BackButton" @click="togglePreview">Kembali</b-button>
                </div>

            </div>
            <div class="FormEditBox">
                <PreviewEvent :form-data="editeventform" :eo-data="eoData"/>
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
    hideModules: { "hyperLink": true, "InsertImage":true },
    forcePlainTextOnPaste: true,
    maxHeight: "30rem",
});


export default {
    name: 'EventEditEvents',
    components: {
        PreviewEvent
    },
    data() {
        return {
            editeventform: {
                eventTitle:  '',
                subTitle:  '',
                startDate: '',
                endDate:  '',
                location:  '',
                tickets:  [
                    {
                        categoryName:'Nama Tiket',
                        totalTickets:1,
                        pricePerTicket:1,
                    },
                ],
                promotionalContent:{
                    tags:  [],
                    description:null,
                    posterImageUrl:''
                },
            },
            selectedTags:"",
            chances: 1,
            showForm:true,
            generatedContent:'',
            uploadedFile:null,
            fileBeforeEdit:'',
            baseURL:'',
            eoData:null,
        }
    },
    computed: {
        content() {
            return this.editeventform.description;
        },
        remainingChances() {

            return this.chances;
        }
    },
    watch: {
        'editeventform.startDate'(newValue, oldValue) {
            this.checkTimeValidity();
        },
        'editeventform.endDate'(newValue, oldValue) {
            this.checkTimeValidity();
        },
    },
    mounted(){
        this.loadEventData()
        this.loadEOData();
        this.loadGPTTokenData()

    },
    created() {

        if(this.$config.axios.baseURL.endsWith('/')){
            this.baseURL = this.$config.axios.baseURL.substring(0, this.$config.axios.baseURL.length - 1);
        }
        else{
            this.baseURL = this.$config.axios.baseURL;
        }
    },
    methods:{
        formatDateForInput(dateString) {
        // Create a new Date object from the database datetime string
            const date = new Date(dateString);

            // Extract the date components
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');

            // Extract the time components
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');

            // Format the datetime string to match the datepicker input format
            return `${year}-${month}-${day}T${hours}:${minutes}`;
        },
        async loadEventData(){
            const eventId = this.$route.params.id
            try{
                const response = await this.$axios.get(`/api/events/${eventId}`)
                const eventData = response.data.data.event;
                this.eoData = response.data.data.organizer
                this.fileBeforeEdit= eventData.promotionalContent.posterImageUrl
                const { _id, __v, ownerId, createdAt, updatedAt, tickets, ...filteredEventData } = eventData;
                const filteredTickets = tickets.map(({ _id, ...ticket }) => ticket);
                this.editeventform = {
                    ...filteredEventData,
                    tickets: filteredTickets,
                    startDate: this.formatDateForInput(eventData.startDate),
                    endDate: this.formatDateForInput(eventData.endDate),
                };

            } catch (error){
                console.error('Error message:', error.message);
            }

        },
        async loadEOData() {
            const userData = JSON.parse(localStorage.getItem('userData'));
            if (userData) {
                try {
                    const bearerToken = userData?.token;
                    console.log('User ID:', userData.userId);
                    console.log('Bearer Token:', bearerToken);

                    if (userData?.role === 'eo') {
                        const response = await this.$axios.get(`/api/profile/eo/${userData.userId}`, {
                            headers: {
                            'Authorization': `Bearer ${bearerToken}`,
                            },
                        });
                    console.log('Response:', response);

                    if (response.data.code === 200 && response.data.status === 'OK') {
                        this.eoData = response.data.data;
                        userData.gptAccessTokenQuota = this.eoData.gptAccessTokenQuota;
                        localStorage.setItem('userData', JSON.stringify(userData));
                    } else {
                        console.error('Failed to load EO data:', response.data);
                    }
                    }
                } catch (error) {
                    if (error.response) {
                        console.error('Error response:', error.response);
                        console.error('Error status:', error.response.status);
                        console.error('Error headers:', error.response.headers);
                    } else if (error.request) {
                        console.error('Error request:', error.request);
                    } else {
                    console.error('Error message:', error.message);
                    }
                }
            } else {
                console.error('No user data found in localStorage');
            }
        },
        loadGPTTokenData() {
            const userData = JSON.parse(localStorage.getItem('userData'));
            if (userData && userData.gptAccessTokenQuota !== undefined) {
                this.chances = userData.gptAccessTokenQuota;
            }
        },
        checkTimeValidity() {
            if (new Date(this.editeventform.startDate) >= new Date(this.editeventform.endDate)) {
                alert("Waktu Mulai harus lebih awal dari Waktu Selesai.");
                this.editeventform.startDate = '';
                this.editeventform.endDate = '';
            }
        },
        addTicketCategory() {
           console.log('check',this.baseURL)
            this.editeventform.tickets.push({
                categoryName:'Nama Tiket',
                totalTickets:1,
                pricePerTicket:1,
            })
        },
        removeTicketCategory(index) {
            this.editeventform.tickets.splice(index, 1);
        },
        async autoGenerateDesc(){
            const userData = JSON.parse(localStorage.getItem('userData'));
            const bearerToken = userData?.token;
            let pureText = ''
            if(this.isHTML(this.editeventform.promotionalContent.description)){
                pureText = this.extractPureText(this.editeventform.promotionalContent.description);
            }
            else{
                pureText = this.editeventform.promotionalContent.description
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

                    const response = await this.$axios.post('api/generate-description', { text: pureText }, {
                        headers: {
                            'Authorization': `Bearer ${bearerToken}`,
                        },
                    });
                    if (response.data.code === 200 && response.data.status === 'OK'){
                        this.generatedContent = response.data.data.generatedDescription;
                        this.chances = response.data.data.gptQuota;
                        this.editeventform.promotionalContent.description += `&nbsp;<div>${this.generatedContent}</div>`
                        // Update local storage data
                        userData.gptAccessTokenQuota = this.chances;
                        localStorage.setItem('userData', JSON.stringify(userData));

                    }

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
        // async if the API integrated
        async handleFiles(files) {
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
            // Sambungkan dengan backend dan taruh link gambar di eventPoster

            try {
                const formData = new FormData();
                const userData = JSON.parse(localStorage.getItem('userData'));
                const bearerToken = userData?.token;
                formData.append('file', files[0]);

                // Make the API request to upload the file
                const response = await this.$axios.post('api/posters', formData, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${bearerToken}`,
                    },
                });


                if (response.data.code === 201 && response.data.status === 'OK') {
                    const baseUrl = this.baseURL ?? 'http://localhost:5000'

                    this.editeventform.promotionalContent.posterImageUrl = baseUrl + response.data.data.file.url;
                    if (files.length > 0) {
                        this.uploadedFile = files[0];
                    }
                    console.log("drop", this.uploadedFile);
                    alert('File uploaded successfully.');
                } else {
                    alert('Failed to upload file. Please try again.');
                }
            } catch (error) {
                console.error('Error uploading file:', error);
                alert('Error uploading file. Please try again.');
            }
        },
        eraseFile() {
            this.uploadedFile = null;
            this.editeventform.promotionalContent.posterImageUrl = this.fileBeforeEdit
            // Clear the file input if needed
            this.$refs.fileInput.value = '';
        },
        addTag() {
            if (this.selectedTags && !this.editeventform.promotionalContent.tags.includes(this.selectedTags)) {
                this.editeventform.promotionalContent.tags.push(this.selectedTags);
                this.selectedTags = ''; // Clear the input after adding the tag
            }
        },
        togglePreview(){

            this.showForm = !this.showForm
            this.$emit('preview-event', this.editeventform);

        },
        isHTML(txt) {
      // Check if description contains HTML tags
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
        async editEvent(){
            const userData = JSON.parse(localStorage.getItem('userData'));
            const bearerToken = userData?.token;
            const eventId = this.$route.params.id
            this.editeventform.startDate = this.editeventform.startDate+"+07:00";
            this.editeventform.endDate = this.editeventform.endDate+"+07:00";
            try{
                const response = await this.$axios.put(`api/events/${eventId}`, this.editeventform, {
                    headers: {
                            'Authorization': `Bearer ${bearerToken}`,
                        },
                })

                if (response.data.code === 200 && response.data.status === 'OK') {
                    alert(`${response.data.message}`);
                    this.$router.push('/myevents/list')
                }

            } catch (error){
                console.log('EditEvent', error);
            }
        },
        Cancel(){
            this.$router.push('/myevents/list');
        }

    },
  }
</script>
<style scoped>
.EditBox{
    display: flex;
    width: 100%;
    justify-content: center;
    align-content: center;
    flex-direction: column;
    margin-bottom: 1rem;
}
.FormEditBox{
    width: 90%;
    max-width: 70rem;
    margin: 0 auto;
    overflow-y: auto;
    background-color: white;
    padding: 20px;
    border:solid #f2f0e9 1px;
    border-radius: 0.5rem;
    margin-top:0.5rem;
    margin-bottom: 0.5rem;
}
.PreviewEditBox{
    width: 85%;
    max-width: 67.5rem;
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
    background-color: #035037;
    color: white;
}
.Unclickable {
    height: 2rem;
    align-self:flex-end;
    margin-bottom: 1.25rem;
    border-radius: 0.5rem;
    color: white;
    cursor: not-allowed; /* Show not-allowed cursor */
    opacity: 0.6; /* Reduce opacity to indicate it's disabled */
    pointer-events: none; /* Disable pointer events to prevent clicks */
    background-color:#57576F;
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
    max-width: 70rem;
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
    max-width: 67.5rem;
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
.UploadedFile {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  gap:0.5rem;
}
.UploadedFile p{
    margin: 0;
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
    max-width: 67.5rem;
    margin: 0 auto;

}
</style>
