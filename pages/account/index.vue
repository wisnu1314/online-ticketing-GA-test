<template>
  <div>
    <div class="container shadow-lg">
      <div class="row mb-3">
        <div class="col-sm-10">
          <p class="h3 title">Akun</p>
        </div>
        <div class="col-sm-2">
          <button v-if="isUser || isEO" class="btn_edit"><span class="mr-2"><b-icon-pencil-square></b-icon-pencil-square></span>Edit Akun</button>
        </div>
      </div>
      <hr>
      <div v-if="isUser || isAdmin" class="row mt-4">
        <div class="col">
          <!-- Image -->
        </div>
        <div class="col">
          <div>
            <b>Nama Depan</b>
            <p>{{account.firstname}}</p>
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
            <p>{{ account.created }}</p>
          </div>
          <div>
            <b>Tanggal Terakhir Diperbarui</b>
            <p>{{ account.lastUpdate }}</p>
          </div>
        </div>
        <div class="col"></div>
      </div>
      <div v-if="isEO" class="row mt-4">
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
                <p>{{ data_eo.year }}</p>
              </div>
            </div>
            <div class="col">
              <div class="mb-3">
                <b>Industri</b>
                <p>{{ data_eo.industry }}</p>
              </div>
              <div class="mb-3">
                <b>Nomor Telepon Organisasi</b>
                <p>{{ data_eo.phone }}</p>
              </div>
              <div class="mb-3">
                <b>Alamat Organisasi</b>
                <p>{{ data_eo.address }}</p>
              </div>
            </div>
            <div class="col">
              <div class="mb-3">
                <b>Tanggal Bergabung</b>
                <p>{{ data_eo.created }}</p>
              </div>
              <div class="mb-3">
                <b>Tanggal Terakhit Diperbarui</b>
                <p>{{ data_eo.lastUpdate }}</p>
              </div>
              <div class="mb-3">
                <b>Kuota Auto-Generate Deskripsi Event</b>
                <p>{{ data_eo.kuota }}</p>
                <button>Tambah</button>
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
      isUser: 0,
      isAdmin: 0,
      isEO: 1,
      account: {
        'firstname': 'Kevin',
        'lastname' : 'Santiago',
        'email': 'kevinn26@gmail.com',
        'created': '14/10/2023 15.00 GMT+7',
        'lastUpdate': '15/10/2023 15.00 GMT+7'
      },
      data_eo: {
        'name': 'OSIS SMAN 8 BDG',
        'email': 'osissman8bdg@gmail.com',
        'year': '1968',
        'industry': 'Musik, Seni Pertunjukan',
        'phone': '0812345678',
        'address': 'Jl. Solontongan No.3, Kelurahan Turangga, Kecamatan Lengkong, Kota Bandung, Jawa Barat',
        'created': '14/10/2023 15.00 GMT+7',
        'lastUpdate': '14/10/2023 15.00 GMT+7',
        'kuota': '4',
        'description': 'SMA Negeri 8 Bandung, merupakan salah satu Sekolah Menengah Atas Negeri di Kota Bandung, beralamat di Jl. Solontongan No.3, Kelurahan Turangga, Kecamatan Lengkong, Kota Bandung, Jawa Barat'
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
