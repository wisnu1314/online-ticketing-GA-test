<template>
  <div class="body">
    <div class="m-5">
      <div class="text-right mb-2">
        <b-button variant="success" @click="toCreateEvent()">+ Buat Event Baru</b-button>
      </div>
      <h1>Upcoming Events</h1>
      <p v-if="upcomingEvents.length === 0" class="text-center">Tidak Ada Event</p>
      <div class="row">
        <div v-for="(event,index) in upcomingEvents" :key="index" class="col-sm-auto m-3">
          <a :href="'/events/' + event._id"  class="text-decoration-none text-dark"><event-card :event="event"></event-card></a>
        </div>
      </div>
      <h1 class="mt-5"  >Past Events</h1>
      <p v-if="pastEvents.length === 0" class="text-center">Tidak Ada Event</p>
      <div class="row">
        <div v-for="(event,index) in pastEvents" :key="index" class="col-sm-auto m-3">
          <a :href="'/events/' + event._id"  class="text-decoration-none text-dark"><event-card :event="event"></event-card></a>
        </div>
      </div>
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
      upcomingEvents: [],
      pastEvents:[],
      selectedDate: 0,
      selectedTags: "",
      searchLoc: [],
      startDate:"",
      endDate: "",
    }
  },
  async fetch(){
    const userData = JSON.parse(localStorage.getItem('userData'));
    await this.$axios(`/api/events/eo?status=upcoming`,{
      headers: {
        'Authorization': `Bearer ${userData?.token}`
        }
    })
    .then(res=>{
      this.upcomingEvents = res.data.data.events
    })
    await this.$axios(`/api/events/eo?status=past`,{
      headers: {
        'Authorization': `Bearer ${userData?.token}`
        }
    })
    .then(result=>{
      this.pastEvents = result.data.data.events
    })
  },
  fetchOnServer: false,
  watch: {
    '$route.query': '$fetch'
  },
  methods: {
    toCreateEvent(){
      this.$router.push('/createEvent')
    },
    onSearch() {
      const curentQuery = this.$route.query
      this.$router.push({
        query: {
          ...curentQuery,
          location: this.selectedTags,
          startDate: this.startDate,
          endDate: this.endDate,
        }
      })
    },
  },
}
</script>

<style>
.body {
  min-height: 60vh;
}
.jumb img{
  max-height: 270px;
  width: 100%;
  object-fit: cover;
}
.center {
  text-align: center;
}

.pagination {
  display: inline-block;
}

.pagination a {
  color: black;
  float: left;
  padding: 8px 16px;
  text-decoration: none;
  transition: background-color .3s;
  border: 1px solid #ddd;
  margin: 0 4px;
}

.pagination a.active {
  background-color: #4CAF50;
  color: white;
  border: 1px solid #4CAF50;
}

.pagination a:hover:not(.active) {background-color: #ddd;}
</style>
