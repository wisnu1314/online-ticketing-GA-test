
<template>
  <div class="MainBox">
    <div class="FormBox">
      <b-form @submit="onSubmit">
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
      </b-form>
      <b-button class="LoginButton">Login</b-button>
      <div class="FormFooter">
        <text>Not registered?</text>
        <b-link >Create an account</b-link>
      </div>
    </div>
  </div>
</template>
<script>
  // import {UFormGroup, UInput} from "@nuxt/ui";
  export default {
    name: 'EventLogin',
    data() {
      return {
        form: {
          email: '',
          password:'',
        },
      };
    }, 
    methods: {
      onSubmit(event) {
        event.preventDefault()
        alert(JSON.stringify(this.form))
      },
      login() {
          // Handle login logic, e.g., call an API
        this.$store.dispatch('login', { username: this.username, password: this.password });
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
.FormBox{
  width: 60%;
  min-height: 30vh;
  margin-top: auto;
  margin-bottom: auto;
  background-color: white;
  padding: 20px;
}
.LoginButton{
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
</style>