<!-- eslint-disable no-console -->
<template>
  <div class="MainBox">
    <!-- <WebNavbar :logged-in.sync="isLoggedIn" :user-type.sync="userType" :search-query.sync="searchQuery" /> -->
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
              maxlength="32"
            ></b-form-input>
          </b-form-group>
          <b-form-group label="Password" label-for="password" label-size="sm">
            <b-input-group>
              <b-form-input
                id="password"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Enter your password"
                maxlength="32"
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
            <div>Belum punya akun?</div>
            <b-link class="RegisterLink" href="/registerUserPage">Daftar sekarang!</b-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EventLogin',
  data() {
    return {
      isLoggedIn: true,
      userType: 'user',
      searchQuery: '',
      form: {
        email: '',
        password: '',
      },
      showPassword: false,
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
      try {
        const body = {
          email: this.form.email,
          password: this.form.password,
        }
        console.log(body)
        const response = await this.$axios.post('/api/auth/login',body);
        // const response = await this.$axios.get('/api/health');
        const userData = response.data;
        const userDataToStore = Object.fromEntries(
        Object.entries(userData.data).filter(([key]) => key !== 'password'));
        localStorage.setItem('userData', JSON.stringify(userDataToStore));
        this.$emit('userLoggedIn', userData);
        // window.location.href = '/home';
        this.$router.push('/home');
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
}
</script>

<style scoped>
/* Base font size */
body {
  font-size: 16px;
}

/* Main container */
.MainBox {
  display: flex;
  width: 100%;
  /* height: 100vh; */
  /* background-color: #0e9d6e; */
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 1rem;
  overflow-y: hidden;
}

.MiddleBox {
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

/* Form */
.FormTitle {
  text-align: left;
  color: black;
  margin-bottom: 5px;
  font-size: 1.5rem;
  font-weight: bold;
}

.FormBox {
  position: relative;
  width: 40%;
  min-height: 30vh;
  height: auto;
  margin-top: auto;
  margin-bottom: auto;
  background-color: white;
  padding: 20px;
  overflow-y: hidden;
}

/* Form footer */
.FormFooter {
  display: flex;
  width: 100%;
  margin-top: 5px;
  background-color: transparent;
  flex-direction: row;
  justify-content: center;
  gap: 5px;
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
.RegisterLink {
  color: #0e9d6e;
  text-decoration: underline;
  font-size: 0.875rem;
}
.b-form-input {
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
}
.b-button {
  font-size: 14px;
}

</style>
