<template>
    <div class="MainBox">
        <div class="FormBox">
            <h1>Buat Event Baru</h1>
            <div class="row">
                <div class="col">
                    <b-form-group label="Judul Event" label-for="event-title">
                    <b-form-input id="event-title" v-model="eventTitle" />
                    </b-form-group>
                </div>
                <div class="col-8">
                    <b-form-group label="Subjudul" label-for="event-subtitle">
                    <b-form-input id="event-subtitle" v-model="eventSubtitle" />
                    </b-form-group>
                </div>
            </div>
            <div class="row">
                <div class="col">
                <b-form-group label="Waktu Mulai" label-for="event-date">
                    <b-form-input id="event-date" v-model="eventStartTime" type="datetime-local" />
                </b-form-group>
                </div>
                <div class="col">
                <b-form-group label="Waktu Selesai" label-for="event-end-date">
                    <b-form-input id="event-end-date" v-model="eventEndTime" type="datetime-local" />
                </b-form-group>
                </div>
                <div class="col-8">
                <b-form-group label="Lokasi" label-for="event-location">
                    <b-form-input id="event-location" v-model="eventLocation" />
                </b-form-group>
                </div>
            </div>
            <div>
                <h3>Kategori dan Harga Tiket</h3>
                <div v-for="(ticketCategory, index) in ticketCategories" :key="index">
                    <b-form-group label="Nama Kategori Tiket">
                        <b-form-input v-model="ticketCategory.name" />
                    </b-form-group>
                    <b-form-group label="Jumlah Tiket">
                        <b-form-input v-model="ticketCategory.quantity" type="number" />
                    </b-form-group>
                    <b-form-group label="Harga per Tiket">
                        <b-form-input v-model="ticketCategory.price" type="number" />
                    </b-form-group>
                </div>
                <b-button >Tambah Kategori Tiket</b-button>
            </div>
            <div>
                <h3>Konten Promosional</h3>
                <div>
                    <label for="event-poster">Unggah Poster Event</label>
                    <input id="event-poster" type="file" @change="handlePosterUpload" />
                </div>
                <b-form-group label="Deskripsi Event">
                    <wysiwyg v-model="eventDescription" />
                </b-form-group>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import wysiwyg from "vue-wysiwyg"; // config is optional. more below
import "vue-wysiwyg/dist/vueWysiwyg.css";
Vue.use(wysiwyg, {
    hideModules: { "hyperLink": true },
    forcePlainTextOnPaste: true,
    maxHeight: "30rem",
});
export default {
    name: 'EventCreateEvents',
    data() {
        return {
            eventTitle: '',
            eventSubtitle:'',
            eventStartTime: '',
            eventEndTime: '',
            eventLocation: '',
            ticketCategories: [],
            eventDescription: '',
            eventPoster: null
        }
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
}
.FormBox{
    width: 85%;
    max-width: 62.5rem; 
    margin: 0 auto;
    overflow-y: auto;
    background-color: white;
    padding: 20px;
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
  flex: 2; /* Double the width of col */
  margin-right: 10px;
}
</style>