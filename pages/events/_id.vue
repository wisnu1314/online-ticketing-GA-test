<template>
  <div class="event">
    <img src="/landingjumbotron.png" style="width:100%; max-height: 45vh;"/>
    <p class="mt-4"><strong>Sabtu, 14 Oktober 2023</strong></p>
    <div class="d-flex event_desc">
      <div class="col_desc">
        <div>
          <p class="title">{{events.eventTitle}}</p>
          <p><strong>{{events.subTitle }}</strong></p>
        </div>
        <div>
          <!-- image -->
          <img src="/sman8.png"/>
          <span style="color: grey;">By OSIS SMAN 8 BDG</span>
        </div>
        <p class="h5">Tanggal dan Waktu</p>
        <div>
          <b-icon-calendar-date></b-icon-calendar-date>
          <span class="ml-2">Sabtu, 14 Oktober 2023 15:00 - 21.00 GMT+7</span>
        </div>
        <p class="h5">Lokasi</p>
        <div>
          <b-icon-geo-alt></b-icon-geo-alt>
          <span class="ml-2">{{ events.location }}</span>
        </div>
        <p class="h5">Tentang event ini</p>
        <p>
          {{ promotionalContent.description }}
        </p>
        <p class="h5">Tags</p>
        <div class="d-flex">
          <button class="mr-3 btn_tags" v-for="(tag, index) in promotionalContent.tags" :key="index"> {{ tag }}</button>
        </div>
        <p class="h5">Informasi Organizer</p>
        <div class="info_org">
          <div class="d-flex">
            <img src="/sman8.png"/>
            <div class="org">
              <ul>
                <li class="org_name">OSIS SMAN 8 BDG</li>
                <li class="org_detail">est. {{ organizer.establishYear }}</li>
              </ul>
            </div>
          </div>
          <p class="mt-3">{{ organizer.description }}</p>
        </div>
      </div>
      <div class="event_price">
        <p class="h5 mb-4">Rp{{ categories[categories.length-1]?.pricePerTicket }} - Rp{{ categories[0]?.pricePerTicket}}</p>
        <b-button  v-b-modal.modal-1 v-if="user==1">Pesan Tiket</b-button>
        <b-button v-b-modal.modal-2 variant="outline-danger" v-if="user==2" class="mt-2 bg-white text-danger">Hapus Event Ini</b-button>
      </div>
    </div>
    <div>
      <b-modal v-if="user==1" id="modal-1" size="xl" :title=events.eventTitle hide-footer>
        <b-row>
          <b-col sm="7">
            <div v-for="(category,index) in categories" :key="index">
              <b-row>
                <b-col sm="4">
                  <label>{{ category.categoryName }}</label>
                </b-col>
                <b-col sm="8">
                  <b-form-input v-model="detail[index].totalTickets" type="number" min="0" @input="detail[index].totalPrice = detail[index].totalTickets * detail[index].pricePerTicket"></b-form-input>
                </b-col>
              </b-row>
            </div>
          </b-col>
          <b-col sm="5">
            <p><strong>Detail Pembayaran</strong></p>
            <b-row v-for="(det,index) in detail" :key="index">
              <b-col sm="6">
                <p>{{ det.totalTickets }} x {{ det.categoryName }}</p>
              </b-col>
              <b-col sm="6">
                <p>Rp{{ det.totalPrice }}</p>
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="6">
                <p><strong>TOTAL</strong></p>
              </b-col>
              <b-col sm="6">
                <p><strong>Rp {{ detail.reduce((accum,item) => accum + item.totalPrice, 0) }}</strong></p>
              </b-col>
            </b-row>
            <b-button @click="submitOrder()">Pesan</b-button>
          </b-col>
        </b-row>
      </b-modal>
    </div>
    <div>
      <b-modal id="modal-2" v-if="user==2">
        <p><strong>Apakah Anda yakin ingin menghapus event ini?</strong></p>
        <p>Periksa kembali detail event-nya dan pastikan bahwa event yang akan dihapus adalah event yang benar.</p>
        <template #modal-footer>
        <div class="w-100">
          <b-button
            variant="danger"
            size="md"
            class="float-right"
            @click="deleteEvent()"
          >
            Delete
          </b-button>
        </div>
      </template>
      </b-modal>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'default',
  data() {
    return {
      user: 0,
      events:[],
      promotionalContent: [],
      categories: [],
      organizer: [],
      detail: [],
      submitDetail: []
    }
  },
  async fetch(){
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData.role === 'customer') {
        this.user = 1
      } else if (userData.role === 'eo') {
        this.user = 2
      } else if (userData.role === 'admin') {
        this.user = 3
      }
    const bearerToken = userData?.token;
    await this.$axios(`/api/events/${this.$route.params.id}`,{
      headers: {
        'Authorization': `Bearer ${bearerToken}`
      }
    })
    .then(res => {
      this.events = Object.freeze(res.data.data.event)
      this.promotionalContent = this.events.promotionalContent
      this.categories = Object.freeze(this.events.tickets)
      this.organizer = res.data.data.organizer
      this.categories.forEach(category =>{
        this.detail.push(JSON.parse(JSON.stringify({
          "categoryName": category.categoryName,
          "totalTickets" : 0,
          "pricePerTicket" : category.pricePerTicket
        })))
      })
      this.detail.forEach(det=>{
        det.totalPrice = det.pricePerTicket * det.totalTickets
      })
      console.log(this.detail);
    })
  },
  fetchOnServer: false,
  methods: {
    async submitOrder(){
      const userData = JSON.parse(localStorage.getItem('userData'));
      const bearerToken = userData?.token;
      this.detail.forEach(det=>{
        if (det.totalTickets > 0) {
          this.submitDetail.push({
          "categoryName": det.categoryName,
          "totalTickets" : det.totalTickets,
          "totalPrice" : det.totalPrice
          })
        }
      })
      const response = await this.$axios.post(`/api/events/${this.$route.params.id}/purchase-tickets`,{"detail": this.submitDetail},{
        headers: {
        'Authorization': `Bearer ${bearerToken}`
        }
      })
      alert(response)
    },
    async deleteEvent(){
      const userData = JSON.parse(localStorage.getItem('userData'));
      const bearerToken = userData?.token;
      const response = await this.$axios.delete(`/api/events/${this.$route.params.id}`,{
        headers: {
        'Authorization': `Bearer ${bearerToken}`
        }
      })
      alert(response)
    }
  },
}
</script>

<style scoped>
.event {
  padding-left: 15%;
  padding-right: 15%;
  padding-bottom: 30px;
  padding-top: 30px;
}

.event p {
  text-align: justify;
}

.title {
  font-size: 30px;
  font-weight: bolder;
}

.h5{
  font-weight: bold;
  margin-top: 25px;
  margin-bottom: 15px;
}

.event img {
  border-radius: 20px;
}

.col p {
  text-align: justify;
}

.price_btn {
  border: solid gray 1px;
  height: max-content;
}

.event_price button{
  color: white;
  background-color: #035037;
  border-radius: 15px;
  font-size: larger;
  font-weight: 500;
  width: 100%;
}

.event_price button:hover{
  color: #035037;
  background-color: white;
}

.event_price p {
  text-align: center;
}

.event_price {
  height: max-content;
  width: 100%;
  padding: 25px !important;
  box-shadow: 7px 7px 7px 7px rgba(0, 0, 0, 0.116);
  border-radius: 20px;
}

.btn_tags {
  background-color: #F1600D;
  color: white;
  border: none;
  padding: 8px;
  border-radius: 5px;
}

.info_org {
  background-color: #F1F5F9;
  padding: 20px;
  border-radius: 20px;
}

.org ul{
  list-style-type: none;
  margin: 0;
  padding: 0;
  margin-left: 20px;
}

.org_name {
  font-weight: 700;
}

.org_detail {
  font-size: small;
  color: grey;
}

.col_desc {
  min-width: 70%;
  max-width: 70%;
  padding-right: 40px;
}

@media screen and (max-width: 1000px) {
  .event_desc {
    display: block !important;
  }
  .col_desc {
    max-width: 100% !important;
    text-align: left  !important;
    padding-right: 0 !important;
  }
  .event_price {
    margin-top: 30px;
  }
}
</style>
