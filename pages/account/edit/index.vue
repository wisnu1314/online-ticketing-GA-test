<template>
  <div>
    <div class="container shadow-lg">
      <div class="row mb-3">
        <div class="col-sm-9">
          <p class="h3 title">Akun</p>
        </div>
        <div class="col-sm-3">
          <button v-if="user == 1 || user == 2" class="btn_cancel" @click="backToAccount()">Cancel</button>
          <button v-if="user == 1 || user == 2" class="btn_save" @click.prevent="saveUpdate()">Simpan</button>
        </div>
      </div>
      <hr>
      <form v-if="user == 1">
        <div class="row mt-4">
          <div class="col-6">
            <!-- Image -->
            <img :src="account.profilePictureUrl" style="max-width: 100%;"/>
            <button>Pilih Foto</button>
          </div>
          <div class="row col-6">
            <div class="col">
              <div class="form-group">
                <b>Nama Depan</b>
                <input v-model=account.name class='form-control'>
              </div>
              <div>
                <b>Email </b>
                <input v-model=account.email class='form-control'>
              </div>
            </div>
            <div class="col">
              <div class="form-group">
                <b>Password Lama</b>
                <input v-model="account.oldpassword" class='form-control' type="password" placeholder='********'>
              </div>
              <div class="form-group">
                <b>Password Baru</b>
                <input v-model="account.newpassword" class='form-control' type="password" placeholder='********'>
              </div>
              <div>
                <b>Konfirmasi Password </b>
                <input v-model="account.confirmpassword" class='form-control' type="password" placeholder='********'>
              </div>
            </div>
          </div>
        </div>
      </form>
      <form v-if="user == 2">
        <div class="row mt-4">
          <div class="col-3">
            <img :src="data_eo.profilePictureUrl" style="max-width: 100%;" />
          </div>
          <div class="col-9">
            <div class="row col">
              <div class="col">
                <div class="form-group">
                  <b>Nama Organisasi</b>
                  <input v-model=data_eo.name class='form-control'>
                </div>
                <div class="form-group">
                  <b>Email</b>
                  <input v-model=data_eo.email class='form-control'>
                </div>
                <div class="form-group">
                  <b>Tahun Berdiri</b>
                  <input v-model=data_eo.establishYear class='form-control'>
                </div>
                <div class="form-group">
                  <b>Industri</b>
                  <input v-model="data_eo.industry" class='form-control'>
                </div>
              </div>
              <div class="col">
                <div class="form-group">
                  <b>Password Lama</b>
                  <input v-model="data_eo.oldpassword" class='form-control' type="password" placeholder='********'>
                </div>
                <div class="form-group">
                  <b>Password Baru</b>
                  <input v-model="data_eo.newpassword" class='form-control' type="password" placeholder='********'>
                </div>
                <div>
                  <b>Konfirmasi Password </b>
                  <input v-model="data_eo.confirmpassword" class='form-control' type="password" placeholder='********'>
                </div>
                <div>
                  <b>Nomor Telepon Organisasi </b>
                  <input v-model="data_eo.contactNumber" class='form-control'>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="form-group">
                <b>Alamat Organisasi</b>
                <input v-model="data_eo.address" class='form-control'>
              </div>
              <div class="form-group">
                <b>Deskripsi</b>
                <textarea v-model="data_eo.description" class='form-control'></textarea>
              </div>
            </div>
          </div>
        </div>
      </form>
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
  async fetch(){
    const userData = JSON.parse(localStorage.getItem('userData'));
    const bearerToken = userData?.token;
    const head= {
      'Authorization': `Bearer ${bearerToken}`
    }
    if (userData.role === 'customer') {
      this.user = 1
      await this.$axios(`/api/profile/${userData.userId}`,{
        headers : head
      }).then(res =>{
        this.account = res.data.data
      })
    } else if (userData.role === 'eo') {
      this.user = 2
      await this.$axios(`/api/profile/eo/${userData.userId}`,{
        headers : head
      }).then(res=>{
        this.data_eo = res.data.data
      })
    } else if (userData.role === 'admin') {
      this.user = 3
    }
  },
  fetchOnServer: false,
  methods: {
    goToEdit(){
      this.$router.push('/account/edit');
    },
    backToAccount(){
      this.$router.push('/account');
    },
    async saveUpdate(){
      if (this.user === 1) {
        const userData = {
          "userId": this.account.userId,
          "name": this.account.name,
          "email": this.account.email,
          "profilePictureUrl": "https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg"
        }
        await this.$axios.put(`/api/profile/customer/update`,userData,{
          headers: {
          'Authorization': `Bearer ${this.account.token}`
          }
        })
      } else if (this.user === 2){
        const eoData = {
          "userId": this.data_eo.userId,
          "email": this.data_eo.email,
          "name": this.data_eo.name,
          "establishYear": this.data_eo.establishYear,
          "description": this.data_eo.description,
          "industry": this.data_eo.industry,
          "contactNumber": this.data_eo.contactNumber,
          "address": this.data_eo.description,
          "profilePictureUrl": "https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg"
        }
        const userData = JSON.parse(localStorage.getItem('userData'));
        const bearerToken = userData?.token;
        await this.$axios.put(`/api/profile/eo/update`,eoData,{
          headers: {
          'Authorization': `Bearer ${bearerToken}`
          }
        })
      }
      this.$router.push('/account');
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
  min-width: 75%;
}

.btn_save {
  background-color: #035037;
  color: white;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 10px;
}

.btn_cancel {
  color:  #035037;
  border: solid 1px #035037;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 10px;
  margin-right: 20px;
}
</style>
