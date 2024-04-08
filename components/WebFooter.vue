<template>
    <div class="Footer">
      <div class="LeftFooter">
        <div class="LeftFooterBrand">Teecket</div>
        <div class="LeftFooterDesc">Platform tiket dan penemuan lengkap yang dipercaya oleh jutaan penyelenggara dan peserta di seluruh dunia</div>
      </div>
      <div class="RightFooter">
        <div>
          <div class="RightFooterHeader">Tentang Kami</div>
          <div class="RightFooterContent">
            <div>Tentang</div>
            <div>Syarat dan Ketentuan</div>
            <div>Kebijakan Privasi</div>
          </div>
        </div>
        <div>
          <div class="RightFooterHeader">Bantuan</div>
          <div class="RightFooterContent">
            <div>Butuh Bantuan?</div>
            <div>Kontak</div>
          </div>
        </div>
        <div>
          <div class="RightFooterHeader">Ikuti Kami</div>
          <div class="RightFooterMedia">
            <b-icon v-for="(icon, index) in mediaIcons" :key="index" :icon="icon" font-scale="1.5"></b-icon>
          </div>
        </div>
      </div>
    </div>
  </template>

  <script>
  import { BootstrapVueIcons } from 'bootstrap-vue'
  import 'bootstrap-vue/dist/bootstrap-vue-icons.min.css'
  import Vue from 'vue';
  export default {
    name: 'WebFooter',
    data() {
      return {
        mediaIcons: ['facebook', 'instagram', 'twitter'],
      };
    },
    created() {
      Vue.use(BootstrapVueIcons)
    },
  };
  ;
  </script>

  <style scoped>
.Footer{
  display: flex;
  width: 100%;
  height:26vh;
  background-color: #035037;
  justify-content: space-around;
  align-items: center;
  margin-top: 30px;
}
.LeftFooter{
  display: flex;
  flex-direction: column;
  max-width: 50vh;
  align-items: left;
  gap: 10px;
  color: white;
}
.LeftFooterBrand{
  font-weight:600;
  font-size: 26px;
}
.LeftFooterDesc{
  font-weight:normal;
  font-size: 12px;
}
.RightFooter{
  display: flex;
  flex-direction: row;
  gap:20px;
}
.RightFooterHeader{
  font-size: 16px;
  font-weight: bold;
  color: white;
}
.RightFooterContent{
  display: flex;
  flex-direction: column;
  gap:10px;
  margin-top:10px;
  font-size: 14px;
  color: white;
}
.RightFooterMedia{
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  margin-top:10px;
  color:white;
  gap: 10px;
}
  </style>
