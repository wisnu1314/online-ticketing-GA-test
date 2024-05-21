<template>
    <EventLogin />
</template>

<script>
import EventLogin from '~/components/EventLogin.vue';
console.log('Google Analytics ID:', process.env.GA_ID);
export default {
    components: {
        EventLogin
    }
  }
</script>