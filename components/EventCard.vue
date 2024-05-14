<template>
  <div class="card shadow">
    <div>
      <img class="event_image" src="/foto-trainer.png">
    </div>
    <div class="m-0 p-3">
      <p class="event_name"><strong>{{ event.eventTitle }}</strong></p>
      <p class="event_time">{{ event.startDate }}</p>
      <p class="event_address">{{ event.location }}</p>
      <p class="event_price"><strong>Rp{{ event.tickets[event.tickets.length - 1].pricePerTicket }} - Rp{{ event.tickets[0].pricePerTicket}}</strong></p>
      <p class="event_org_name">{{ event.ownerId }}</p>
    </div>
  </div>
</template>

<script>


export default {
    name: 'EventCard',
    props: ['event']
}
</script>

<style scoped>
.card{
  width: 360px;
  border: none;
  border-radius: 12px;
}
.event_image {
  width: 360px;
  height: 180px;
  border-top-left-radius: 0.75rem;
  border-top-right-radius: 0.75rem;
}
</style>
