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
            />
          </div>
          <p class="h5">Waktu</p>
          <div>
            <b-form-group label="Dari" label-for="event-date">
              <b-form-input id="event-date" v-model="startDate" type="date" required/>
            </b-form-group>
            <b-form-group label="Hingga" label-for="event-date">
              <b-form-input id="event-date" v-model="endDate" type="date" required/>
            </b-form-group>
          </div>
          <b-button @click="onSearch()">Search</b-button>
        </b-col>
        <b-col sm="10">
          <div class="row">
            <div v-for="(event,index) in events" :key="index" class="col-sm-auto m-3">
              <a :href="'/events/' + event._id"  class="text-decoration-none text-dark"><event-card :event="event"></event-card></a>
            </div>
          </div>
          <div class="center">
            {{ events.totalPages }}
            <div class="pagination">
              <a href="#">&laquo;</a>
              <span v-for="index in pageInfo.totalPages" :key="index">
                <a v-if="index === pageInfo.page" class="active">{{ index }}</a>
                <a v-else @click="changePage(index)">{{ index }}</a>
              </span>
              <a href="#">&raquo;</a>
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
      pageInfo: [],
      selectedDate: 0,
      selectedTags: "",
      searchLoc: [],
      startDate:"",
      endDate: "",
    }
  },
  async fetch(){
    const limit = this.$route.query.limit || 10
    const page = this.$route.query.page || 1
    const location = this.$route.query.location || null
    const search = this.$route.query.search || null
    const dateStart = this.$route.query.startDate || new Date().toISOString()
    const dateEnd = this.$route.query.endDate || null
    console.log(dateStart);
    // const search = this.$route.query.search || ''
    let apiUrl = `/api/events/filtered?page=${page}&limit=${limit}&status=upcoming`
    if (location) {
      apiUrl += `&location=${location}`
    }
    if (dateEnd) {
      apiUrl += `&startDate=${dateStart}&endDate=${dateEnd}`
    }
    if (search) {
      apiUrl += `&searchByEventTitle=${search}`
    }
    await this.$axios(apiUrl)
    .then(res=>{
      this.events = res.data.data.events
      this.pageInfo = res.data.data
    })
  },
  fetchOnServer: false,
  watch: {
    '$route.query': '$fetch'
  },
  mounted(){
    this.$gtag.pageview(
      this.$route
    )
  },
  methods: {
    changePage(index){
      const curentQuery = this.$route.query
      this.$router.push({
        query: {
          ...curentQuery,
          page : index
        }
      })
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
