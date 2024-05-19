<template>
  <div>
    <div class="jumb">
      <img src="/stanislav.jpg"/>
    </div>
    <div class="m-5">
      <b-row>
        <b-col sm="2">
          <p class="h3">Filter</p>
          <div class="mb-4">
            <p class="h5">Lokasi</p>
            <b-form-input
              id="event-loc"
              v-model="selectedTags"
              placeholder="Masukkan Lokasi"
              @keydown.enter.prevent="addTag"
            />
            <div class="SelectedTags">
              <span v-for="(tag, index) in searchLoc" :key="index" class="TagItem">{{ tag }}</span>
            </div>
          </div>
          <p class="h5">Waktu</p>
          <div>
            <b-form-group v-slot="{ ariaDescribedby }">
              <b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios" value="1">Hari ini</b-form-radio>
              <b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios" value="2">Besok</b-form-radio>
              <b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios" value="3">Pekan ini</b-form-radio>
              <b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios" value="4">Bulan ini</b-form-radio>
            </b-form-group>
          </div>
        </b-col>
        <b-col sm="10">
          <div class="row">
            <div v-for="(event,index) in events" :key="index" class="col-sm-auto m-3">
              <a :href="'/events/' + event._id"  class="text-decoration-none text-dark"><event-card :event="event"></event-card></a>
            </div>
          </div>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import EventCard from '~/components/EventCard.vue';
export default {
  components:{
    EventCard
  },
  data(){
    return {
      events: [],
      selected: 0,
      selectedTags: "",
      searchLoc: []
    }
  },
  async fetch(){
    // const userData = JSON.parse(localStorage.getItem('userData'));
    // const bearerToken = userData?.token;
    await this.$axios(`/api/events`)
    .then(res=>{
      this.events = res.data.data.events
    })
  },
  fetchOnServer: false,
  methods: {
    addTag() {
      if (this.selectedTags && !this.searchLoc.includes(this.selectedTags)) {
        this.searchLoc.push(this.selectedTags);
          this.selectedTags = ''; // Clear the input after adding the tag
      }
    },
  },
}
</script>

<style>
.jumb img{
  max-height: 270px;
  width: 100%;
  object-fit: cover;
}
</style>
