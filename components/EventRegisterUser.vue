<template>
    <div class="MainBox">
      <div class="MiddleBox">
        <div class="FormBox">
          <div class="FormTitle">Daftar</div>
          <form @submit.prevent="register">
            <b-form-group label="Nama Depan" label-for="firstName" label-size="sm">
              <b-form-input
                id="firstName"
                v-model="form.firstName"
                type="text"
                placeholder="Nama Depan"
                size="sm"
                maxlength="32"
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
            <b-button type="submit" class="RegisterButton" size="sm">Daftar</b-button>
            <div class="FormFooter">
              <div>Sudah punya akun?</div>
              <b-link class="LoginLink" href="/loginPage">Masuk sekarang!</b-link>
            </div>
          </form>
        </div>
      </div>
      <!-- <WebFooter/> -->
    </div>
  </template>

  <script>
  
  export default {
    name: 'EventRegisterUser',
    data() {
      return {
        isLoggedIn: false,
        userType: '',
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
      // eslint-disable-next-line no-console
      try {
        const body = {
          name:this.form.firstName + ' ' + this.form.lastName,
          email: this.form.email,
          password: this.form.password,
        }
        console.log(body)
        const response = await this.$axios.post('/api/auth/register',body);
        if(response.data.code === 200 && response.data.status ==='OK'){
          this.$gtag.event('success_user_register', {
            event_category: 'Register User',
            event_label: 'Success User Register',
            value: 1
          });
          const userData = response.data;
          // localStorage.setItem('userData', JSON.stringify(userData));
          this.$emit('userRegistered', userData);
          this.$router.push('/loginPage');
        }
        else{
          alert(`${response.data.message}`);
        }
      } catch (error) {
          console.error('Login error:', error);
          if (error.response) {
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
          } else if (error.request) {
            console.error('No response received:', error.request);
          } else {
            console.error('Error setting up request:', error.message);
          }
      }
    },
      performSearch() {
      // eslint-disable-next-line no-console
        console.log('Search query:', this.searchQuery);
      // Implement search functionality
    },
    },
  };
  </script>
  <style scoped>
  .MainBox{
    display: flex;
    width: 100%;
    /* height: 100vh; */
    /* background-color: #0e9d6e; */
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
.LoginButton,
.RegisterButton{
    width: 100%;
    background-color: #035037;
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
