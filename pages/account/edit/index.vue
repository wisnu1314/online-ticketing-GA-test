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
          <div class="col-4">
            <!-- Image -->
            <img :src="account.profilePictureUrl" style="max-width: 100%;"/>
            <div class="mt-2">
              <p>Pilih Foto</p>
              <b-form-file
                v-model="newPhoto"
                placeholder="Choose a file or drop it here..."
                drop-placeholder="Drop file here..."
                accept=".jpg, .png, .gif"
                @change="handleFileSelect"
              ></b-form-file>
              <p class="text-danger">{{ warning }}</p>
            </div>
          </div>
          <div class="row col-8">
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
                <input v-model="oldPassword" class='form-control' type="password" placeholder='********'>
              </div>
              <div class="form-group">
                <b>Password Baru</b>
                <input v-model="newPassword" class='form-control' type="password" placeholder='********'>
              </div>
              <div>
                <b>Konfirmasi Password </b>
                <input v-model="confirmPassword" class='form-control' type="password" placeholder='********'>
                <p v-show="newPassword != confirmPassword" class="text-danger">Password Tidak Cocok</p>
              </div>
            </div>
          </div>
        </div>
      </form>
      <form v-if="user == 2">
        <div class="row mt-4">
          <div class="col-3">
            <img :src="data_eo.profilePictureUrl" style="max-width: 100%;" />
            <div class="mt-2">
              <p>Pilih Foto</p>
              <b-form-file
                v-model="newPhoto"
                placeholder="Choose a file or drop it here..."
                drop-placeholder="Drop file here..."
                accept=".jpg, .png, .gif"
                @change="handleFileSelect"
              ></b-form-file>
              <p class="text-danger">{{ warning }}</p>
            </div>
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
                  <input v-model="oldPassword" class='form-control' type="password" placeholder='********'>
                </div>
                <div class="form-group">
                  <b>Password Baru</b>
                  <input v-model="newPassword" class='form-control' type="password" placeholder='********'>
                </div>
                <div class="mb-2">
                  <b>Konfirmasi Password </b>
                  <input v-model="confirmPassword" class='form-control' type="password" placeholder='********'>
                  <p v-show="newPassword != confirmPassword" class="text-danger"><strong>Password Tidak Cocok</strong></p>
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
      newPhoto:null,
      account: [],
      data_eo: [],
      profilePic:null,
      warning:"",
      oldPassword : '',
      newPassword : '',
      confirmPassword : ''
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
        this.profilePic = this.account.profilePictureUrl
      })
    } else if (userData.role === 'eo') {
      this.user = 2
      await this.$axios(`/api/profile/eo/${userData.userId}`,{
        headers : head
      }).then(res=>{
        this.data_eo = res.data.data
        this.profilePic = this.data_eo.profilePictureUrl
      })
    } else if (userData.role === 'admin') {
      this.user = 3
    }
  },
  fetchOnServer: false,
  methods: {
    handleFileSelect(e) {
      this.handleFiles(e.target.files);
    },
    async handleFiles(files) {
        this.warning = ''
        const allowedTypes = ['image/png', 'image/jpeg', 'image/gif'];
        const maxFileSize = 10 * 1024 * 1024;
        for (let i = 0; i < files.length; i++) {
            if (!allowedTypes.includes(files[i].type)) {
                this.newPhoto = null
                this.warning = 'File type not supported. Please upload PNG, JPEG, or GIF files only.'
                return
            }
            if (files[i].size > maxFileSize) {
                this.newPhoto = null
                this.warning = 'File size exceeds the limit. Please upload files up to 10 MB.'
                return
            }
        }
        // Sambungkan dengan backend dan taruh link gambar di eventPoster

        try {
            const formData = new FormData();
            const userData = JSON.parse(localStorage.getItem('userData'));
            const bearerToken = userData?.token;
            formData.append('file', files[0]);

            // Make the API request to upload the file
            const response = await this.$axios.post('api/file', formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${bearerToken}`,
                },
            });

            if (response.data.code === 201 && response.data.status === 'OK') {
                const baseUrl = this.baseURL ?? 'http://localhost:5000'
                this.profilePic = baseUrl + response.data.data.file.url;
            } else {
                alert('Failed to upload file. Please try again.');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Error uploading file. Please try again.');
        }
    },
    goToEdit(){
      this.$router.push('/account/edit');
    },
    backToAccount(){
      this.$router.push('/account');
    },
    async saveUpdate(){
      const userData = JSON.parse(localStorage.getItem('userData'));
      const bearerToken = userData?.token;
      if (this.user === 1) {
        const formUserData = {
          "userId": this.account.userId,
          "name": this.account.name,
          "email": this.account.email,
          "profilePictureUrl": this.profilePic
        }
        await this.$axios.put(`/api/profile/customer/update`,formUserData,{
          headers: {
          'Authorization': `Bearer ${bearerToken}`
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
          "address": this.data_eo.address,
          "profilePictureUrl": this.profilePic
        }
        await this.$axios.put(`/api/profile/eo/update`,eoData,{
          headers: {
          'Authorization': `Bearer ${bearerToken}`
          }
        })
      }
      this.$router.push('/account');
      if (this.oldPassword !== '' && this.newPassword !== '' && this.confirmPassword !== '' && this.newPassword === this.confirmPassword) {
        const newData = {
          "userId" : userData.userId,
          "oldPassword" : this.oldPassword,
          "newPassword" : this.newPassword
        }
        await this.$axios.post(`/api/auth/change-password`,newData,{
          headers: {
          'Authorization': `Bearer ${bearerToken}`
          }
        }).then(res=>{
          localStorage.removeItem('userData');
          this.$router.push('/loginPage');
          this.$emit('userLoggedOut');
        })
      }
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
