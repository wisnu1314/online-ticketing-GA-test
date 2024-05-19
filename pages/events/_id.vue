<template>
  <div class="event">
    <img :src="promotionalContent.posterImageUrl" style="width:100%; max-height: 45vh;"/>
    <p class="mt-4"><strong>{{formattedDate}}</strong></p>
    <div class="d-flex event_desc">
      <div class="col_desc">
        <div>
          <p class="title">{{events.eventTitle}}</p>
          <p><strong>{{events.subTitle }}</strong></p>
        </div>
        <div>
          <!-- image -->
          <img src="/sman8.png"/>
          <span style="color: grey;">By {{ dataAll.ownerName }}</span>
        </div>
        <p class="h5">Tanggal dan Waktu</p>
        <div>
          <b-icon-calendar-date></b-icon-calendar-date>
          <span class="ml-2">{{formattedDateTime}}</span>
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
          <button v-for="(tag, index) in promotionalContent.tags" :key="index" class="mr-3 btn_tags"> {{ tag }}</button>
        </div>
        <p class="h5">Informasi Organizer</p>
        <div class="info_org">
          <div class="d-flex">
            <img src="/sman8.png"/>
            <div class="org">
              <ul>
                <li class="org_name">{{ dataAll.ownerName }}</li>
                <li class="org_detail">est. {{ organizer.establishYear }}</li>
              </ul>
            </div>
          </div>
          <p class="mt-3">{{ organizer.description }}</p>
        </div>
      </div>
      <div class="event_price">
        <p class="h5 mb-4">{{getPriceRange}}</p>
        <div>
          <b-button v-b-modal.modal-1>Pesan Tiket</b-button>
          <b-modal id="modal-1" ref="modal-buy" size="xl" hide-footer>
            <div class="p-5">
              <div class="mb-3">
              <p class="title">{{events.eventTitle}}</p>
              <p>{{formattedDateTime}}</p>
            </div>
            <b-row>
              <b-col sm="7">
                <div v-for="(category,index) in categories" :key="index" class="mb-3">
                  <b-row>
                    <b-col sm="4">
                      <label><strong>{{ category.categoryName }}</strong></label>
                    </b-col>
                    <b-col sm="8">
                      <b-form-input v-model="detail[index].totalTickets" type="number" min="0" :max="category.totalTickets"  @input="detail[index].totalPrice = detail[index].totalTickets * detail[index].pricePerTicket"></b-form-input>
                      <p>{{ category.totalTickets }} Tiket Tersisa</p>
                    </b-col>
                  </b-row>
                </div>
              </b-col>
              <b-col sm="5">
                <img :src="promotionalContent.posterImageUrl" style="max-width: 100%;"/>
                <p><strong>Detail Pembayaran</strong></p>
                <b-row v-for="(det,index) in detail" :key="index">
                  <b-col sm="6">
                    <p>{{ det.totalTickets }} x {{ det.categoryName }}</p>
                  </b-col>
                  <b-col sm="6">
                    <p>Rp{{ formatPrice(det.totalPrice) }}</p>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col sm="6">
                    <p><strong>TOTAL</strong></p>
                  </b-col>
                  <b-col sm="6">
                    <p><strong>Rp {{ formatPrice(detail.reduce((accum,item) => accum + item.totalPrice, 0)) }}</strong></p>
                  </b-col>
                </b-row>
                <b-button v-if="user==1 || user==0" class="mt-4" block variant="success" @click="submitOrder()">Pesan</b-button>
              </b-col>
            </b-row>
            </div>
          </b-modal>
        </div>
        <b-button v-show="((user==2 && (organizer.userId === userData.userId)))" variant="outline-primary" class="mt-2 bg-white text-primary" title="BootstrapVue" @click="toEditEvent()">Edit Event</b-button>
        <div>
          <b-button v-show="((user==2 && (organizer.userId === userData.userId)) || user==3)" v-b-modal.modal-2 variant="outline-danger" class="mt-2 bg-white text-danger" title="BootstrapVue">Hapus Event Ini</b-button>
          <b-modal id="modal-2">
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
          <b-modal id="modal-sukses" ref="modal-sukses"  size="xl" centered>
            <h1 class="text-center">Pembayaran Sukses!</h1>
            <template #modal-footer>
            <div class="w-100">
              <b-button
                variant="success"
                size="md"
                class="float-right"
                @click="refreshPage()"
              >
                Ok
              </b-button>
            </div>
          </template>
          </b-modal>
        </div>
      </div>
    </div>
  
</template>

<script>
export default {
  layout: 'default',
  data() {
    return {
      dataAll: [],
      user: 0,
      events:[],
      promotionalContent: [],
      categories: [],
      organizer: [],
      detail: [],
      submitDetail: [],
      userData: []
    }
  },
  async fetch(){
    await this.$axios(`/api/events/${this.$route.params.id}`)
    .then(res => {
      this.dataAll = res.data.data
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
    })
    const userData = JSON.parse(localStorage.getItem('userData'));
    this.userData = userData
    if (userData.role === 'customer') {
      this.user = 1
    } else if (userData.role === 'eo') {
      this.user = 2
    } else if (userData.role === 'admin') {
      this.user = 3
    }
  },
  fetchOnServer: false,
  computed: {
      formattedDate(){
        const startTime = new Date(this.events.createdAt);
        const options = {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        };
        const formattedStart = startTime.toLocaleString('id-ID', { ...options,timeZone: 'Asia/Jakarta' });
        return `${formattedStart}`
      },
      formattedDateTime() {
        const startTime = new Date(this.events.startDate);
        const endTime = new Date(this.events.endDate);
        const options = {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
          hour12: false,

        };
        const formattedStart = startTime.toLocaleString('id-ID', { ...options,timeZone: 'Asia/Jakarta' });
        const formattedEnd = endTime.toLocaleString('id-ID', { ...options, timeZone: 'Asia/Jakarta'  });
        const timeZoneOffset = -(startTime.getTimezoneOffset() / 60); // Calculate offset in hours
        const gmtOffset = `GMT${timeZoneOffset >= 0 ? '+' : ''}${timeZoneOffset}`;
        return `${formattedStart} ${gmtOffset} - ${formattedEnd} ${gmtOffset}`;
      },
      getPriceRange() {
        const prices = this.categories.map((category) => category.pricePerTicket);
        const minPrice = this.formatPrice(Math.min(...prices));
        const maxPrice = this.formatPrice(Math.max(...prices));
        if(minPrice === maxPrice){
          return `Rp${minPrice}`
        }
        return `Rp${minPrice} - Rp${maxPrice}`;
      },
    },
  methods: {
    toEditEvent(){
      this.$router.push(`/events/${this.$route.params.id}/edit`);
    },
    formatPrice(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      },
    async submitOrder(){
      if (this.user === 0) {
        this.$router.push('/loginPage');
      }
      else {
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
      await this.$axios.post(`/api/events/${this.$route.params.id}/purchase-tickets`,{"detail": this.submitDetail},{
        headers: {
        'Authorization': `Bearer ${bearerToken}`
        }
      })
      this.$refs['modal-sukses'].show()
      }
    },
    async deleteEvent(){
      const userData = JSON.parse(localStorage.getItem('userData'));
      const bearerToken = userData?.token;
      const response = await this.$axios.delete(`/api/events/${this.$route.params.id}`,{
        headers: {
        'Authorization': `Bearer ${bearerToken}`
        }
      })
      this.$refs['my-modal'].hide()
      alert(response)
    },
    refreshPage(){
      window.location.reload()
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
