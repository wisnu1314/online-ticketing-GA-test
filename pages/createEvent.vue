<template>
    <EventCreateEvents @back="handleBack" />
</template>

<script>
import EventCreateEvents from '~/components/EventCreateEvents.vue';
import PreviewEvent from '~/components/PreviewEvent.vue';

export default {
    components: {
        EventCreateEvents,
        // eslint-disable-next-line vue/no-unused-components
        PreviewEvent
    },
    
    methods: {
        handleBack() {
            this.$router.go(-1); // Go back one step in the history
        },
    },
};
</script>
