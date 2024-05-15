<template>
  <div>
    <div class="container shadow-lg">
      <div class="row mb-3">
        <div class="col-sm-10">
          <p class="h3 title">Akun</p>
        </div>
        <div class="col-sm-2">
          <button v-if="user===1 || user === 2" class="btn_edit" @click="goToEdit()"><span class="mr-2"><b-icon-pencil-square></b-icon-pencil-square></span>Edit Akun</button>
        </div>
      </div>
      <hr>
      <div v-if="user === 1 || user === 3" class="row mt-4">
        <div class="col">
          <!-- Image -->
        </div>
        <div class="col">
          <div>
            <b>Nama Depan</b>
            <p>{{account.name}}</p>
          </div>
          <div>
            <b>Nama Belakang</b>
            <p>{{account.lastname}}</p>
          </div>
          <div>
            <b>Email</b>
            <p>{{account.email }}</p>
          </div>
        </div>
        <div class="col">
          <div>
            <b>Tanggal Bergabung</b>
            <p>{{ account.createdAt }}</p>
          </div>
          <div>
            <b>Tanggal Terakhir Diperbarui</b>
            <p>{{ account.updatedAt }}</p>
          </div>
        </div>
        <div class="col"></div>
      </div>
      <div v-if="user==2" class="row mt-4">
        <div class="col-3"></div>
        <div class="col-9">
          <div class="row col">
            <div class="col">
              <div class="mb-3">
                <b>Nama Organisasi</b>
                <p>{{ data_eo.name }}</p>
              </div>
              <div class="mb-3">
                <b>Email</b>
                <p>{{ data_eo.email }}</p>
              </div>
              <div class="mb-3">
                <b>Tahun Berdiri</b>
                <p>{{ data_eo.establishYear }}</p>
              </div>
            </div>
            <div class="col">
              <div class="mb-3">
                <b>Industri</b>
                <p>{{ data_eo.industry }}</p>
              </div>
              <div class="mb-3">
                <b>Nomor Telepon Organisasi</b>
                <p>{{ data_eo.contactNumber }}</p>
              </div>
              <div class="mb-3">
                <b>Alamat Organisasi</b>
                <p>{{ data_eo.address }}</p>
              </div>
            </div>
            <div class="col">
              <div class="mb-3">
                <b>Tanggal Bergabung</b>
                <p>{{ data_eo.createdAt }}</p>
              </div>
              <div class="mb-3">
                <b>Tanggal Terakhit Diperbarui</b>
                <p>{{ data_eo.updatedAt }}</p>
              </div>
              <div class="mb-3">
                <b>Kuota Auto-Generate Deskripsi Event</b>
                <p>{{ data_eo.gptAccessTokenQuota }}</p>
                <button @click="goToSubscriptionPlan()">Tambah</button>
              </div>
            </div>
          </div>
          <div class="col">
            <b>Deskripsi</b>
            <p>{{ data_eo.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: 0,
      account: [],
      data_eo: []
    }
  },
  fetch(){
    const userData = JSON.parse(localStorage.getItem('userData'));
    this.account = userData
    const bearerToken = userData?.token;
    if (this.account.role === 'customer') {
      this.user = 1
    } else if (this.account.role === 'eo') {
      this.user = 2
      const id = {
        "userId": userData.userId
      }
      this.$axios(`/api/profile/eo`,id,{
        headers: {
        'Authorization': `Bearer ${bearerToken}`
      }
      })
      console.log(id, bearerToken);
    } else if (this.account.role === 'admin') {
      this.user = 3
    }
  },
  fetchOnServer: false,
  methods: {
    goToEdit(){
      this.$router.push('/account/edit');
    },
    goToSubscriptionPlan(){
      this.$router.push('/subscription')
    }
  },
}
</script>

<style scoped>
.container {
  padding: 40px;
  margin-bottom: 40px;
  margin-top: 40px;
  border-radius: 30px;
}

.title {
  min-width: 85%;
}

.btn_edit {
  background-color: #035037;
  color: white;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 10px;
}
</style>
