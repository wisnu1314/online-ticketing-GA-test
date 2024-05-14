<template>
  <div>
    <div class="jumb">
      <img src="/stanislav.jpg"/>
    </div>
    <div class="m-5">
      <b-row>
        <b-col sm="2">
          <!-- <p class="h3">Filter</p> -->
          <p class="h5">Lokasi</p>
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
      events: []
    }
  },
  async fetch(){
    const userData = JSON.parse(localStorage.getItem('userData'));
    const bearerToken = userData?.token;
    await this.$axios(`/api/events`,{
      headers: {
        'Authorization': `Bearer ${bearerToken}`
      }
    })
    .then(res=>{
      this.events = res.data.data.events
    })
  },
  fetchOnServer: false,
}
</script>

<style>
.jumb img{
  max-height: 270px;
  width: 100%;
  object-fit: cover;
}
</style>
