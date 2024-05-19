<template>
  <div>
    <div class="jumbotron">
      <p class="h1">Tingkatkan Engagement dengan AI</p>
      <p class="h5 mt-3">Gunakan prompt yang didesain khusus untuk kebutuhan promosi event-mu</p>
      <div class="mt-3 btn_subs">
        <b-link href="/subscription/history"><button class="white_outline ">Riwayat Berlangganan</button></b-link>
        <b-link href="#subs_field"><button class="white_fill plan">Berlangganan</button></b-link>
      </div>
    </div>
    <div id="subs_field" class="d-flex subs mb-4 field">
      <div v-for="(pack, index) in packages" :key="index">
        <div v-if="index%2 == 0" class="box_plan shadow p-4">
          <p class="title_plan">{{ pack.name }}</p>
          <div class="d-flex pricetag">
            <p class="price">Rp{{ formatPrice(pack.price) }}</p>
          </div>
          <p class="target" style="font-size: 12px;">per {{pack.totalToken}}x prompt/akun</p>
          <p class="sz_14"><strong>{{pack.description}}</strong></p>
          <div class="d-flex">
            <b-icon-check class="check_white"></b-icon-check>
            <p class="sz_14">Dapatkan {{pack.totalToken}}x auto-generate deskripsi event</p>
          </div>
          <button class="button_white mt-4" @click="buySubscription(pack._id)">Beli</button>
        </div>
        <div v-else class="box_plan box_green shadow p-4">
          <p class="title_plan">{{ pack.name }}</p>
          <div class="d-flex pricetag">
            <p class="price">Rp{{ formatPrice(pack.price) }}</p>
          </div>
          <p class="target" style="font-size: 12px;">per {{pack.totalToken}}x prompt/akun</p>
          <p class="sz_14"><strong>{{pack.description}}</strong></p>
          <div class="d-flex">
            <b-icon-check class="check_green"></b-icon-check>
            <p class="sz_14">Dapatkan {{pack.totalToken}}x auto-generate deskripsi event</p>
          </div>
          <button class="button_white bg-white mt-4" @click="buySubscription(pack._id)">Beli</button>
        </div>
      </div>
    </div>
    <div>
      <b-modal ref="modal-sukses" size="xl" centered>
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
</template>

<script>
export default {
  data() {
    return {
      packages: []
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
    await this.$axios(`/api/packages`,{
      headers: {
        'Authorization': `Bearer ${bearerToken}`
      }
    })
    .then(res => {
      this.packages = res.data.data
    })
  },
  fetchOnServer: false,
  methods: {
    refreshPage(){
      window.location.reload()
    },
    formatPrice(price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    buySubscription(subsId){
      const userData = JSON.parse(localStorage.getItem('userData'));
      const subs = {
          "userId": userData.userId,
          "packageId": subsId,
      }
      this.$axios.post(`/api/purchases`,subs, {
        headers: {
        'Authorization': `Bearer ${userData?.token}`
        }
      }).then(res=>{
        const totalToken = this.packages.find((p) => p._id === subsId).totalToken
        userData.gptAccessTokenQuota = userData.gptAccessTokenQuota + totalToken
        localStorage.setItem('userData', JSON.stringify(userData))
        this.$refs['modal-sukses'].show()
      })
    }
  },
}
</script>

<style scoped>
.jumbotron {
  background: linear-gradient(black, transparent), url('/subscription-bg.jpg');
  background-size: cover;
  height: 92vh;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.subs{
  align-items: center;
  justify-content: center;
}
.h1 {
  font-size: 60px;
  color: white;
  max-width: 700px;
}
.h5 {
  font-size: 20px;
  color: white;
  max-width: 400px;
}
.white_outline {
  background: transparent;
  border: solid 1px white;
  color: white;
  padding-top: 7px;
  padding-bottom: 7px;
  width: 200px;
  border-radius: 10px;
}
.white_fill {
  background: white;
  color: black;
  border: solid 1px white;
  padding-top: 7px;
  padding-bottom: 7px;
  width: 200px;
  border-radius: 10px;
}
.title_plan {
  font-size: 24px;
  font-weight: 500;
}
.price {
  font-size: 32px;
  font-weight: 600;

}
.target {
  margin-top: 15px;
}
.sz_14 {
  font-size: 14px;
}
.box_plan {
  max-width: 270px;
  padding: 15px;
  border: solid 1px #EEEEEE;
  border-radius: 10px;
}

.button_white {
  color: #035037;
  border: solid 1px #035037;
  width: 100%;
  padding-top: 5px;
  padding-bottom: 5px;
  border-radius: 7px;
  background-color: transparent;
}
.check_white {
  background-color: whitesmoke;
  color: grey;
  margin-top: 12px;
  margin-right: 10px;
}
.check_green {
  background-color: #0E9D6E;
  color: white;
  margin-top: 12px;
  margin-right: 10px;
}

.box_green{
  background-color: #035037;
  color: white;
  margin-left: 20px;
  margin-right: 20px;
}
.bg_green {
  background-color: #0E9D6E;
}
.bg-white {
  background-color: white;
}
.plan{
  margin-left: 10px;
}

@media screen and (max-width: 900px) {
  #subs_field{
    display: block !important;
    text-align:-webkit-center;
  }
  .box_plan{
    margin: 0;
    margin-bottom: 20px;
    text-align: left;
  }
  .btn_subs{
    display: block !important;
  }
  .plan{
    margin: 0 !important;
  }
  .white_outline{
    margin-bottom: 10px;
  }
}
</style>
