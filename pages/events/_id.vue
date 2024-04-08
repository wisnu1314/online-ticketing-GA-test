<template>
  <div class="event">
    <img src="/landingjumbotron.png" style="width:100%; max-height: 45vh;"/>
    <p class="mt-4"><strong>Sabtu, 14 Oktober 2023</strong></p>
    <div class="row">
      <div class="col-8 pr-5">
        <div>
          <p class="title">Atma Asta 2023 : Reinerva</p>
          <p><strong>"Step to liberty, Leap into victory". REINERVA is an encouragement for people to reach peace and liberty.</strong></p>
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
          <span class="ml-2">Pusat Kesenjataan Infanteri (Pussenif), Jalan Supratman No 60, Kota Bandung</span>
        </div>
        <p class="h5">Tentang event ini</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eu pharetra sem. Mauris efficitur, urna vitae congue posuere, libero libero viverra mauris, quis tincidunt sem lectus gravida lacus. Etiam ac eros vehicula, malesuada velit consectetur, pretium nulla. Interdum et malesuada fames ac ante ipsum primis in faucibus. Praesent a lectus egestas lectus commodo tincidunt sed non neque. Maecenas faucibus ipsum ac maximus luctus. Nulla posuere malesuada dictum. Sed ullamcorper purus ut interdum sagittis. Aliquam erat volutpat.
          Cras eu lobortis nulla. Vivamus ornare nisl ante. In porttitor placerat lacus eu bibendum. Vivamus imperdiet sollicitudin felis nec ornare. Vestibulum fringilla est sagittis, pharetra magna sed, malesuada enim. Aenean fringilla ligula felis, et malesuada ligula blandit ut. Maecenas ac vulputate lectus. Sed sed nisi mauris. Vestibulum id pellentesque arcu, in porta libero. Nunc sed pharetra urna, eu varius augue. Ut id fringilla arcu.
          Aenean in ligula ut dui accumsan luctus et tincidunt lorem. Quisque id nibh elementum, tempor mi ut, ullamcorper sapien. Nullam faucibus enim velit, vel aliquam risus fringilla ut. Curabitur eu sollicitudin ante. Aliquam ipsum risus, suscipit viverra lorem vitae, ultrices viverra nisi. Quisque aliquam orci eros, sit amet mattis turpis eleifend non. Etiam facilisis urna at feugiat sodales.
          Pellentesque nec gravida justo. Integer auctor enim at dui consequat sodales. Sed finibus ornare nibh, non eleifend urna rhoncus ac. Praesent eget neque ut dui dignissim cursus. Aenean in ligula ut justo fermentum luctus ac non eros. Donec venenatis neque ultricies elit semper, sit amet volutpat massa eleifend. Sed justo mauris, pretium ac nulla sit amet, auctor dictum justo.
        </p>
        <p class="h5">Tags</p>
        <div class="d-flex">
          <button class="mr-3 btn_tags" v-for="(tag, index) in tags" :key="index"> {{ tag }}</button>
        </div>
        <p class="h5">Informasi Organizer</p>
        <div class="info_org">
          <div class="d-flex">
            <img src="/sman8.png"/>
            <div class="org">
              <ul>
                <li class="org_name">OSIS SMAN 8 BDG</li>
                <li class="org_detail">est. 1968</li>
              </ul>
            </div>
          </div>
          <p class="mt-3">SMA Negeri 8 Bandung, merupakan salah satu Sekolah Menengah Atas Negeri di Kota Bandung, beralamat di Jl. Solontongan No.3, Kelurahan Turangga, Kecamatan Lengkong, Kota Bandung, Jawa Barat</p>
        </div>
      </div>
      <div class="col-4 event_price shadow-lg p-4 mb-5 bg-white rounded">
        <p class="h5 mb-4">Rp0 - Rp1.000.000</p>
        <button>Pesan Tiket</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'default',
  data() {
    return {
      tags: ['Musik', 'Konser Musik']
    }
  },
}
</script>

<style scoped>
.event {
  padding-left: 15%;
  padding-right: 15%;
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
</style>
