<template>
  <div class="MainBox">
    <!-- <WebNavbar :logged-in.sync="isLoggedIn" :user-type.sync="userType" :search-query.sync="searchQuery" /> -->
    <div class="MiddleBox">
      <div v-if="!showSecondPart" class="FormBox">
        <div class="FormTitle">Daftar Organizer</div>
        <form @submit.prevent="registerOrganizer">
          <b-form-group label="Nama Depan" label-for="firstName" label-size="sm">
            <b-form-input
              id="firstName"
              v-model="form.firstName"
              type="text"
              placeholder="Nama Depan"
              size="sm"
              maxlength="32"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group label="Nama Belakang" label-for="lastName" label-size="sm">
            <b-form-input
              id="lastName"
              v-model="form.lastName"
              type="text"
              placeholder="Nama Belakang"
              size="sm"
              maxlength="32"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group label="Email" label-for="email" label-size="sm">
            <b-form-input
              id="email"
              v-model="form.email"
              type="email"
              placeholder="Email"
              size="sm"
              maxlength="32"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group label="Password" label-for="password" label-size="sm">
            <b-form-input
              id="password"
              v-model="form.password"
              type="password"
              placeholder="Password"
              size="sm"
              maxlength="32"
              required
            ></b-form-input>
          </b-form-group>
          <b-button class="LoginButton" size="sm" @click="showSecondPart = true">Selanjutnya</b-button>
          <div class="FormFooter">
            <div>Sudah punya akun?</div>
            <b-link class="LoginLink" href="/loginPage">Masuk sekarang!</b-link>
          </div>
        </form>
      </div>
      <div v-if="showSecondPart" class="FormBox">
        <div class="FormTitle">Daftar Organizer</div>
        <form class="FormFlexContainer" @submit.prevent="registerOrganizer">
          <!-- Left column -->
          <div class="LeftColumn">
            <b-form-group label="Tahun Berdiri" label-for="establishedYear">
              <b-form-input
                id="establishedYear"
                v-model="form.establishedYear"
                type="number"
                placeholder="Tahun Berdiri"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group label="Industri" label-for="industry">
              <b-form-input
                id="industry"
                v-model="form.industry"
                type="text"
                placeholder="Musik, Seni Pertunjukan, FnB, dll"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group label="Alamat Organisasi" label-for="orgAddress">
              <b-form-input
                id="orgAddress"
                v-model="form.orgAddress"
                type="text"
                placeholder="Alamat Organisasi"
                required
              ></b-form-input>
            </b-form-group>
          </div>
          <!-- Right column -->
          <div class="RightColumn">
            <b-form-group label="Nomor Telepon Organisasi" label-for="orgPhone">
              <b-form-input
                id="orgPhone"
                v-model="form.orgPhone"
                type="tel"
                placeholder="Nomor Telepon Organisasi"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group label="Deskripsi" label-for="description">
              <b-form-textarea
                id="description"
                v-model="form.description"
                placeholder="Deskripsi"
                rows="6" 
                required
              ></b-form-textarea>
            </b-form-group>
          </div>
        </form>
        <div class="SecondFormSubmit">
          <b-button class="BackButton" size="sm" @click="showSecondPart = false">Kembali</b-button>
          <b-button type="submit" class="RegisterButton" size="sm" @click="registerOrganizer">Daftar</b-button>
        </div>
        
        <div class="FormFooter">
          <div>Sudah punya akun?</div>
          <b-link class="LoginLink" href="/loginPage">Masuk sekarang!</b-link>
        </div>
      </div>
    </div>
    <WebFooter/>
  </div>
</template>

<script>
// import bcrypt from 'bcryptjs';
import WebFooter from './WebFooter.vue';
// import WebNavbar from './WebNavbar.vue';

export default {
  name: 'EventRegisterOrganizer',
  components: {
    WebFooter,
    // WebNavbar,
  },
  data() {
    return {
      isLoggedIn: false,
      userType: '',
      searchQuery: '',
      showSecondPart: false,
      form: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        establishedYear: '',
        orgPhone: '',
        industry: '',
        description: '',
        orgAddress: '',
      },
    };
  },
  methods: {
    registerOrganizer() {
      // eslint-disable-next-line no-console
      console.log('Organizer registration form data:', this.form);
    },
    performSearch() {
    // eslint-disable-next-line no-console
      console.log('Search query:', this.searchQuery);
  },
  },
};
</script>
<style scoped>
.MainBox{
  display: flex;
  width: 100%;
  height: 100vh;
  background-color: #0e9d6e;
  justify-content: center;
  align-content: center;
  flex-direction: column;
}
.MiddleBox{
  display: flex;
  width: 100%;
  height: 66vh;
  background-image: url('/backgroundimg.png');
  background-size: cover; 
  background-position: center;
  justify-content: flex-end;
  padding-right: 5%;
  padding-left: 5%;
  align-items: center;
}
.b-nav-items{
  color: white;
}
.FormTitle{
  text-align: left;
  color: black;
  font-size: 1.5rem;
  font-weight: bold;
}
.FormBox{
  /* position: relative; */
  width: 40%;
  min-height: 30vh;
  height: auto;
  overflow-y: auto;
  
  background-color: white;
  padding: 20px;
}

.b-form-group {
margin-bottom: 0; 
padding-top: 0; 
padding-bottom: 0; 
}
.b-form-input {
overflow: hidden;
text-overflow: ellipsis;
font-size: 14px;
}
.b-button {
font-size: 14px;
}
.append-button {
  background-color: transparent;
  border:none;
  border-radius: 0.25rem;
  margin-right: 2px;
}
.LoginButton{
  width: 100%;
  background-color: #035037;
}
.RegisterButton{
  width: 75%;
  background-color: #035037;
}
.BackButton{
  width: 25%;
  background-color: white;
  color:#035037 ;
}
.FormFooter{
  display: flex;
  width: 100%;
  margin-top: 5px;
  background-color: transparent;
  flex-direction: row;
  justify-content: center;
  gap: 5px;
}
.RegisterLink{
  color:#0E9D6E;
  text-decoration: underline;
}
.FormFlexContainer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap:20px
}
.LeftColumn, .RightColumn {
  flex: 1;
}
.SecondFormSubmit{
  display: flex;
  flex-direction: row;
  gap:0.5rem;
}
/*  */
</style>