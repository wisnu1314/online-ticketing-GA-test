<template>
    <div class="MainBox">
      <b-navbar class="Navbar" toggleable="lg" type="dark">
        <b-navbar-brand href="#">Teecket</b-navbar-brand>
        <b-form-group class="SearchBarContainer">
          <b-input-group>
            <b-form-input
              v-model="searchQuery"
              placeholder="Cari sesuatu..."
              type="text"
              class="SearchBar"
            />
          </b-input-group>
        </b-form-group>
        <b-navbar-nav class="RightNavigation">
          <b-nav-item href="#">Cari Event</b-nav-item>
          <b-nav-item href="/registerOrganizerPage">Menjadi Organizer</b-nav-item>
          <b-button class="NavButton" href="/loginPage">Masuk</b-button>
        </b-navbar-nav>
      </b-navbar>
      <div class="MiddleBox">
        <div class="FormBox">
          <div class="FormTitle">Daftar</div>
          <form @submit.prevent="register">
            <b-form-group label="First Name" label-for="firstName" label-size="sm">
              <b-form-input
                id="firstName"
                v-model="form.firstName"
                type="text"
                placeholder="First Name"
                size="sm"
                maxlength="32"
              ></b-form-input>
            </b-form-group>
            <b-form-group label="Last Name" label-for="lastName" label-size="sm">
              <b-form-input
                id="lastName"
                v-model="form.lastName"
                type="text"
                placeholder="Last Name"
                size="sm"
                maxlength="32"
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
              ></b-form-input>
            </b-form-group>
            <b-button key="register-button" type="submit" class="RegisterButton" size="sm">Daftar</b-button>
            <div key="register-footer" class="FormFooter">
              <div>Sudah punya akun?</div>
              <b-link class="LoginLink" href="/loginPage">Masuk sekarang!</b-link>
            </div>
          </form>
        </div>
      </div>
      <WebFooter/>
    </div>
  </template>
  
  <script>
  import bcrypt from 'bcryptjs';
  import WebFooter from './WebFooter.vue';
  
  export default {
    name: 'EventRegister',
    components: {
      WebFooter,
    },
    data() {
      return {
        searchQuery: '',
        form: {
          firstName: '',
          lastName: '',
          email: '',
          password: '',
        },
      };
    },
    methods: {
      async register() {
        // Handle registration logic, e.g., call an API
        const hashedPassword = await bcrypt.hash(this.form.password, 10);
        this.$store.dispatch('register', {
          firstName: this.form.firstName,
          lastName: this.form.lastName,
          email: this.form.email,
          password: hashedPassword,
        });
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
  .Navbar{
    display: flex;
    height: 8vh;
    align-items: center;
    justify-content: center;
    background-color: #0E9D6E;
    gap: 100px;
    color:white;
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
    align-items: center; /* Vertically center the contents */
  }
  .SearchBarContainer{
    display: flex;
    align-items: center;
    margin-top: 1rem;
    border-radius: 5px;
    background-color: white;
  }
  .SearchBar{
    display: block;
    width:60vh;
    padding: 9px 4px 9px 40px;
    border-radius: 5px;
    background: transparent url("/search.svg") no-repeat 13px;
  
  }
  .RightNavigation{
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap:10px;
    font-size: 16px;
    
  }
  .NavButton{
    border-radius: 18px;
    background-color: white;
    color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    width:10vh;
    height: 40px;
    font-size: 16px;
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
  margin-bottom: 0; /* Remove bottom margin */
  padding-top: 0; /* Remove top padding */
  padding-bottom: 0; /* Remove bottom padding */
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
.LoginButton,
.RegisterButton{
    width: 100%;
    background-color: #0e9d6e;
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
  /*  */
  </style>