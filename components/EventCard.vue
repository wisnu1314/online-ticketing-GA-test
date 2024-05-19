<template>
  <div class="card shadow">
    <div>
      <img class="event_image" :src="event.promotionalContent.posterImageUrl">
    </div>
    <div class="m-0 p-3">
      <p class="event_name"><strong>{{ event.eventTitle }}</strong></p>
      <p class="event_time">{{ formattedDate(event.startDate) }}</p>
      <p class="event_address">{{ event.location }}</p>
      <p class="event_price"><strong>Rp{{ event.tickets[event.tickets.length - 1].pricePerTicket }} - Rp{{ event.tickets[0].pricePerTicket}}</strong></p>
      <p class="event_org_name">{{ event.ownerName }}</p>
    </div>
  </div>
</template>

<script>


export default {
    name: 'EventCard',
    props: ['event'],
    methods: {
      formattedDate(startDate){
        const startTime = new Date(startDate);
        const options = {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        };
        const formattedStart = startTime.toLocaleString('id-ID', { ...options,timeZone: 'Asia/Jakarta' });
        return `${formattedStart}`
      },
      formattedDateTime(startDate, endDate) {
        const startTime = new Date(startDate);
        const endTime = new Date(endDate);
        const options = {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
          hour12: false,

        };
        const formattedStart = startTime.toLocaleString('id-ID', { ...options,timeZone: 'Asia/Jakarta' });
        const formattedEnd = endTime.toLocaleString('id-ID', { ...options, timeZone: 'Asia/Jakarta'  });
        const timeZoneOffset = -(startTime.getTimezoneOffset() / 60); // Calculate offset in hours
        const gmtOffset = `GMT${timeZoneOffset >= 0 ? '+' : ''}${timeZoneOffset}`;
        return `${formattedStart} ${gmtOffset} - ${formattedEnd} ${gmtOffset}`;
      },
      getPriceRange() {
        const prices = this.categories.map((category) => category.pricePerTicket);
        const minPrice = this.formatPrice(Math.min(...prices));
        const maxPrice = this.formatPrice(Math.max(...prices));
        if(minPrice === maxPrice){
          return `Rp${minPrice}`
        }
        return `Rp${minPrice} - Rp${maxPrice}`;
      },
    },
}
</script>

<style scoped>
.card{
  width: 320px;
  border: none;
  border-radius: 12px;
}
.event_image {
  width: 320px;
  height: 180px;
  border-top-left-radius: 0.75rem;
  border-top-right-radius: 0.75rem;
}
</style>
