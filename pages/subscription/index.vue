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
      <div class="box_plan">
        <p class="title_plan">Basic</p>
        <div class="d-flex pricetag">
          <p class="price">Rp25.000</p>
          <p class="disc">-15%</p>
        </div>
        <p class="target" style="font-size: 12px;">per 10x prompt/akun</p>
        <p class="sz_14"><strong>Untuk Organizer Kecil</strong></p>
        <div class="d-flex">
          <b-icon-check class="check_white"></b-icon-check>
          <p class="sz_14">Dapatkan 10x auto-generate deskripsi event</p>
        </div>
        <button class="button_white">Beli</button>
      </div>
      <div class="box_plan box_green">
        <p class="title_plan">Pro</p>
        <div class="d-flex pricetag">
          <p class="price">Rp25.000</p>
          <p class="disc bg_green">-15%</p>
        </div>
        <p class="target" style="font-size: 12px;">per 10x prompt/akun</p>
        <p class="sz_14"><strong>Untuk Organizer Kecil</strong></p>
        <div class="d-flex">
          <b-icon-check class="check_green"></b-icon-check>
          <p class="sz_14">Dapatkan 10x auto-generate deskripsi event</p>
        </div>
        <button class="button_white bg-white">Beli</button>
      </div>
      <div class="box_plan">
        <p class="title_plan">Basic</p>
        <div class="d-flex pricetag">
          <p class="price">Rp25.000</p>
          <p class="disc">-15%</p>
        </div>
        <p class="target" style="font-size: 12px;">per 10x prompt/akun</p>
        <p class="sz_14"><strong>Untuk Organizer Kecil</strong></p>
        <div class="d-flex">
          <b-icon-check class="check_white"></b-icon-check>
          <p class="sz_14">Dapatkan 10x auto-generate deskripsi event</p>
        </div>
        <button class="button_white">Beli</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.jumbotron {
  background: linear-gradient(black, transparent), url('/subscription-bg.jpg');
  background-size: cover;
  height: 100vh;
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
  margin-top: -10px;
}
.disc {
  font-size: 12px;
  background-color: whitesmoke;
  height: max-content;
  padding: 2px;
}
.target {
  margin-top: -15px;
}
.sz_14 {
  font-size: 14px;
}
.pricetag {
  margin-top: -15px;
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
