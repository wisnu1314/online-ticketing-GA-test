
<template>
  <div class="MainBox">
    <b-navbar class="Navbar" toggleable="lg" type="dark" >
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
        <b-nav-item href="#">Menjadi Organizer</b-nav-item>
        <b-button class="NavButton">Masuk</b-button>
      </b-navbar-nav>
    </b-navbar>
    <div class="MiddleBox">
      <div class="FormBox">
        <div class="FormTitle">Masuk</div>
          <form @submit.prevent="login">
            <b-form-group label="Email" label-for="email" label-size="sm">
              <b-form-input
                id="email"
                v-model="form.email"
                type="email"
                placeholder="Enter your email"
              ></b-form-input>
            </b-form-group>
            <b-form-group label="Password" label-for="password" label-size="sm">
              <b-input-group>
                <b-form-input
                  id="password"
                  v-model="form.password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="Enter your password"
                ></b-form-input>
                <b-input-group-append style="position: absolute; right: 0; top: 0; bottom: 0; display: flex; align-items: center; padding-right: 10px;">
                  <b-icon 
                    :icon="showPassword ? 'eye-slash-fill' : 'eye-fill'" 
                    style="cursor: pointer; color: black;" 
                    @click="togglePassword">
                  </b-icon>
                </b-input-group-append>
              </b-input-group>
            </b-form-group>
            <b-button key="login-button" type="submit" class="LoginButton">Login</b-button>
            <div key="login-footer" class="FormFooter">
              <div key="register-text">Belum punya akun?</div>
              <b-link class="RegisterLink">Daftar sekarang!</b-link>
            </div>
          </form>
        </div>
    </div>
    <WebFooter/>
  </div>
</template>
<script>
  import bcrypt from 'bcryptjs'
  import WebFooter from './WebFooter.vue';
  export default {
    name: 'EventLoginRegister',
    components: {
      WebFooter,
    },
    data() {
      return {
        searchQuery: '',
        form: {
          email: '',
          password: '',
        },
        showPassword:false,
        mediaIcons: [ 'facebook','instagram', 'twitter'],
      };
    }, 
    methods: {
      onSubmit(event) {
        event.preventDefault()
        alert(JSON.stringify(this.form))
      },
      togglePassword() {
        this.showPassword = !this.showPassword;
      },
      async login() {
          // Handle login logic, e.g., call an API
        const hashedPassword = await bcrypt.hash(this.form.password, 10);
        this.$store.dispatch('login', { email: this.form.email, password: hashedPassword });
      },
    },
    
  }
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
  justify-content: space-around;
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
  align-content: center;
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
  margin-bottom: 5px;
  font-size: x-large;
  font-weight: bold;
}
.FormBox{
  position: relative;
  width: 40%;
  min-height: 30vh;
  margin-top: auto;
  margin-bottom: auto;
  background-color: white;
  padding: 20px;
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
</style>