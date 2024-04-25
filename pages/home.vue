<template>
  <div>
    <div class="jumbotron">
      <div class="text-white txt">
        <p class="h1">Hadiri event yang Anda Inginkan</p>
        <p style="font-size: large;">Platform tiket dan penemuan lengkap yang dipercaya oleh jutaan penyelenggara dan peserta di seluruh dunia</p>
        <b-link href="/registerUserPage"><button class="btn">Daftar Sekarang</button></b-link>
      </div>
    </div>
    <div class=" lookfor_event justify-content-center my-5">
      <div class="image">
        <img src="/foto-trainer.png" style="max-width: 100%;"/>
      </div>
      <div class="text_image mx-5">
        <p class="lookfor_event_text">Cari event yang sesuai dengan rencanamu!</p>
        <b-link href="/events/list" ><button class="event_btn mt-3 py-2 px-4">Cari Event</button></b-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'default',
  data() {
    return {

    }
  },
}
</script>

<style scoped>
.jumbotron {
  background: linear-gradient(black, transparent),url('/landingjumbotron.png');
  background-size: cover;
  height: 100vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10%;
}

.btn {
  outline-color: white;
  border: 2px solid white;
  background-color: transparent;
  color: white;
  padding: 14px 28px;
  font-size: 16px;
  cursor: pointer;
  font-weight: 700;
}

.btn:hover {
  background-color: white;
  color: black;
}

.text_image{
  width: 360px;
}

.lookfor_event_text{
  font-weight: bolder;
  font-size: 36px;
}

.event_btn{
  color: white;
  background-color: #035037;
  border-radius: 15px;
  font-size: larger;
  font-weight: 500;
}

.event_btn:hover{
  color: #035037;
  background-color: white;
}

.txt {
  max-width: 600px;
}

.lookfor_event {
  display: flex !important;
}

@media screen and (max-width: 900px) {
  .lookfor_event {
    display: block !important;
    text-align: center;
  }
  .text_image {
    width: 100%;
    margin: 0 !important;
    margin-top: 20px !important;
  }
  .lookfor_event_text {
    font-size: 28px;
  }
}
</style>
