<template>
  <div>
    <div class="container shadow-lg">
      <div class="row mb-3">
        <div class="col-sm-9">
          <p class="h3 title">Akun</p>
        </div>
        <div class="col-sm-3">
          <button v-if="isUser || isEO" class="btn_cancel">Cancel</button>
          <button v-if="isUser || isEO" class="btn_save">Simpan</button>
        </div>
      </div>
      <hr>
      <form v-if="isUser">
        <div class="row mt-4">
          <div class="col">
            <!-- Image -->
            <button>Pilih Foto</button>
          </div>
          <div class="col">
            <div class="form-group">
              <b>Nama Depan</b>
              <input class='form-control' v-model=account.firstname>
            </div>
            <div class="form-group">
              <b>Nama Belakang</b>
              <input class='form-control' v-model=account.lastname>
            </div>
            <div>
              <b>Email </b>
              <input class='form-control' v-model=account.email>
            </div>
          </div>
          <div class="col">
            <div class="form-group">
              <b>Password Lama</b>
              <input class='form-control' type="password" v-model="account.oldpassword" placeholder='********'>
            </div>
            <div class="form-group">
              <b>Password Baru</b>
              <input class='form-control' type="password" v-model="account.newpassword" placeholder='********'>
            </div>
            <div>
              <b>Konfirmasi Password </b>
              <input class='form-control' type="password" v-model="account.confirmpassword" placeholder='********'>
            </div>
          </div>
        </div>
      </form>
      <form v-if="isEO">
        <div v-if="isEO" class="row mt-4">
          <div class="col-3"></div>
          <div class="col-9">
            <div class="row col">
              <div class="col">
                <div class="form-group">
                  <b>Nama Organisasi</b>
                  <input class='form-control' v-model=data_eo.name>
                </div>
                <div class="form-group">
                  <b>Email</b>
                  <input class='form-control' v-model=data_eo.email>
                </div>
                <div class="form-group">
                  <b>Tahun Berdiri</b>
                  <input class='form-control' v-model=data_eo.year>
                </div>
                <div class="form-group">
                  <b>Industri</b>
                  <input class='form-control' v-model="data_eo.industry">
                </div>
              </div>
              <div class="col">
                <div class="form-group">
                  <b>Password Lama</b>
                  <input class='form-control' type="password" v-model="data_eo.oldpassword" placeholder='********'>
                </div>
                <div class="form-group">
                  <b>Password Baru</b>
                  <input class='form-control' type="password" v-model="data_eo.newpassword" placeholder='********'>
                </div>
                <div>
                  <b>Konfirmasi Password </b>
                  <input class='form-control' type="password" v-model="data_eo.confirmpassword" placeholder='********'>
                </div>
                <div>
                  <b>Nomor Telepon Organisasi </b>
                  <input class='form-control' v-model="data_eo.phone">
                </div>
              </div>
            </div>
            <div class="col">
              <div class="form-group">
                <b>Alamat Organisasi</b>
                <input class='form-control' v-model="data_eo.address">
              </div>
              <div class="form-group">
                <b>Deskripsi</b>
                <textarea class='form-control' v-model="data_eo.description"></textarea>
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
      isUser: 0,
      isAdmin: 0,
      isEO: 1,
      account: {
        'firstname': 'Kevin',
        'lastname' : 'Santiago',
        'email': 'kevinn26@gmail.com',
        'oldpassword':'',
        'newpassword':'',
        'confirmpassword':''
      },
      data_eo: {
        'name': 'OSIS SMAN 8 BDG',
        'email': 'osissman8bdg@gmail.com',
        'year': '1968',
        'industry': 'Musik, Seni Pertunjukan',
        'phone': '0812345678',
        'address': 'Jl. Solontongan No.3, Kelurahan Turangga, Kecamatan Lengkong, Kota Bandung, Jawa Barat',
        'description': 'SMA Negeri 8 Bandung, merupakan salah satu Sekolah Menengah Atas Negeri di Kota Bandung, beralamat di Jl. Solontongan No.3, Kelurahan Turangga, Kecamatan Lengkong, Kota Bandung, Jawa Barat',
        'oldpassword':'',
        'newpassword':'',
        'confirmpassword':''
      },
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
