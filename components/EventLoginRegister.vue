
<template>
  <div class="MainBox">
    <div class="FormBox">
      <transition-group name="trans">
        <div v-if="currentForm === 'login'" key="login-title" class="FormTitle">Login</div>
        <b-form v-if="currentForm === 'login'" :key="currentFormKey"  @submit="onSubmit">
          <div key="login">
            <b-form-group
              id="input-group-1"
              label="Email address:"
              label-for="input-1"
              description="We'll never share your email with anyone else."
            >
              <b-form-input
                id="input-1"
                v-model="form.email"
                type="email"
                placeholder="Enter email"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group
              id="input-group-2"
              label="Password:"
              label-for="input-2"
              description=""
            >
              <b-form-input
                id="input-2"
                v-model="form.password"
                type="password"
                placeholder="Enter password"
                required
              ></b-form-input>
            </b-form-group>
            <b-button key="login-button" class="LoginButton">Login</b-button>
              <div key="login-footer" class="FormFooter">
                <div key="register-text">Not registered?</div>
                <b-link key="register-link" @click="toggleForm">Create an account</b-link>
              </div>
          </div>
        </b-form>
        
      </transition-group>

      <transition-group name="trans">
        <div v-if="currentForm === 'register'" key="login-title" class="FormTitle">Register</div>
        <b-form v-if="currentForm === 'register'" :key="currentFormKey" @submit="onSubmit">
          <div key="register">
            <b-form-group
              id="input-group-3"
              label="Full Name:"
              label-for="input-3"
              description=""
            >
              <b-form-input
                id="input-3"
                v-model="form.fullname"
                type="string"
                placeholder="Enter your full name"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group
              id="input-group-4"
              label="Phone Number"
              label-for="input-4"
              description=""
            >
              <b-form-input
                id="input-4"
                v-model="form.phonenumber"
                type="string"
                placeholder="Enter your phone number"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group
              id="input-group-5"
              label="Email address:"
              label-for="input-5"
              description="We'll never share your email with anyone else."
            >
              <b-form-input
                id="input-5"
                v-model="form.email"
                type="email"
                placeholder="Enter email"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group
              id="input-group-6"
              label="Password:"
              label-for="input-6"
              description=""
            >
              <b-form-input
                id="input-6"
                v-model="form.password"
                type="password"
                placeholder="Enter password"
                required
              ></b-form-input>
            </b-form-group>
          </div>
          <b-button key="register-button" class="RegisterButton">Register</b-button>
          <div key="register-footer" class="FormFooter">
            <div key="login-text">Already have an account?</div>
            <b-link key="login-link" @click="toggleForm">Login</b-link>
          </div>
        </b-form>
      </transition-group>
      
    </div>
  </div>
</template>
<script>
  // import {UFormGroup, UInput} from "@nuxt/ui";
  import bcrypt from 'bcryptjs'
  export default {
    name: 'EventLoginRegisterRegister',
    data() {
      return {
        form: {
          fullname:'',
          phonenumber:'',
          email: '',
          password:'',
        },
        currentForm:'login',
        currentFormKey:'login-form',
        showFormTitle:false,
      };
    }, 
    methods: {
      onSubmit(event) {
        event.preventDefault()
        alert(JSON.stringify(this.form))
      },
      async login() {
          // Handle login logic, e.g., call an API
        const hashedPassword = await bcrypt.hash(this.form.password, 10);
        this.$store.dispatch('login', { email: this.form.email, password: hashedPassword });
      },
      async register(){
        const hashedPassword = await bcrypt.hash(this.form.password, 10);
        this.$store.dispatch('register', { fullname:this.form.fullname, phonenumber:this.form.phonenumber ,email: this.form.email, password: hashedPassword });
      },
      toggleForm() {
        this.currentForm = this.currentForm === 'login' ? 'register' : 'login';
      },
      afterLeave() {
        this.showFormTitle = true;
    }
    }
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
}
.FormTitle{
  text-align: center;
  color: #0e9d6e;
  font-size: x-large;
  font-weight: bold;
}
.FormBox{
  position: relative;
  width: 60%;
  min-height: 30vh;
  margin-top: auto;
  margin-bottom: auto;
  background-color: white;
  padding: 20px;
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
.trans-enter-active,
.trans-leave-active {
  opacity: 0;
  transition: opacity 0.5s ease;
}

.trans-enter,
.trans-leave-to {
  opacity: 0;
}

.trans-enter-done,
.trans-leave-done {
  opacity: 1;
}

.trans-enter-done .FormBox,
.trans-leave-active .FormBox {
  position: fixed;
  width: 100%;
}
</style>