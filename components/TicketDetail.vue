<template>
    <div class="ticketDetailWrapper">
      <div v-if="ticketLoaded" class="ticketDetail">
        <div class="EventImageWrapper">
          <img :src="eventImageUrl" alt="Event Image" class="eventDetailImage" />
        </div>
        <div class="ticketDetailInfo">
          <div class="MainDetails">
            <h1>{{ ticket.eventTitle }}</h1>
            <p><strong>Nomor Pemesanan</strong> {{ ticket._id }}</p>
            <strong>Tanggal dan Waktu</strong> 
            <p>{{ formattedDateTime(ticket) }}</p>
            <strong>Lokasi</strong>
            <p> {{ ticket.eventLocation }}</p>
            <strong>Status Pemesanan</strong>
            <div class="statusDetail" :class="statusClass(ticket.status)">{{ ticket.status === 'active' ? 'Aktif' : 'Selesai' }}</div>
            <strong>Tiket</strong>
            <p> {{ formattedCategories(ticket.category) }}</p>
          </div>
          <div class="OrderDetails">
            <h2>Detail Pembayaran</h2>
            <div v-for="category in ticket.category" :key="category._id">
              <p>{{ category.categoryName }} x {{ category.totalTickets }}: Rp {{ formattedTicketPrice(category.totalPrice) }}</p>
            </div>
            <h2>Total: Rp {{ formattedTicketPrice(totalPrice) }}</h2>
            </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        ticket: null,
        eventImageUrl: ''
      };
    },
    computed: {
      totalPrice() {
        return this.ticket.category.reduce((acc, category) => acc + category.totalPrice, 0);
      },
      ticketLoaded(){
        return this.ticket !== null
      }
    },
    mounted() {
      this.loadTicketDetail();
    },
    methods: {
      async loadTicketDetail() {
        try {
          const ticketId = this.$route.params.id;
          
          const userData = JSON.parse(localStorage.getItem('userData'));
          const bearerToken = userData?.token;
  
          const response = await this.$axios.get(`/api/tickets/${ticketId}`, {
            headers: {
              'Authorization': `Bearer ${bearerToken}`,
            },
          });
          this.ticket = response.data.data;
          console.log('cock', this.ticket)
          const eventResponse = await this.$axios.get(`/api/events/${this.ticket.eventId}`, {
            headers: {
              'Authorization': `Bearer ${bearerToken}`,
            },
          });
          console.log('cock',eventResponse)
          this.eventImageUrl = eventResponse.data.data.event.promotionalContent.posterImageUrl || 'https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg';
        } catch (error) {
          console.error('Error loading ticket detail:', error);
        }
      },
      formattedDateTime(ticket) {
        const startTime = new Date(ticket.eventStartDate);
        const endTime = new Date(ticket.eventEndDate);
        const options = {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
          hour12: false,
        };
        const formattedStart = startTime.toLocaleString('id-ID', { ...options, timeZone: 'Asia/Jakarta' });
        const formattedEnd = endTime.toLocaleString('id-ID', { ...options, timeZone: 'Asia/Jakarta' });
        const timeZoneOffset = -(startTime.getTimezoneOffset() / 60);
        const gmtOffset = `GMT${timeZoneOffset >= 0 ? '+' : ''}${timeZoneOffset}`;
        return `${formattedStart} ${gmtOffset} - ${formattedEnd} ${gmtOffset}`;
      },
      formattedTicketPrice(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      },
      formattedCategories(categories) {
        return categories.map(category => `${category.categoryName} x ${category.totalTickets}`).join(', ');
      },
      statusClass(status) {
        return {
          'active': 'statusActive',
          'inactive': 'statusDone',
        }[status] || 'status-unknown';
      }
    }
  };
  </script>
  
  <style>
  .ticketDetailWrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    background-color: #f9f9f9;
  }
  
  .ticketDetail {
    display: flex;
    flex-direction: column;
    border: 1px solid #ccc;
    border-radius: 0.5rem;
    padding: 2rem;
    width:100%;
    max-width: 65rem;
    background-color: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
.EventImageWrapper {
    width: 100%;
    height: 10rem;
    max-height: 16rem;
    border-radius: 1rem;
    overflow: hidden;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f0f0f0;
}

.EventImageWrapper img {
  width: 100%;
  height: 100%;
  object-fit: contain; 
  border-radius: 1rem;
}
.ticketDetailInfo {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
}
.MainDetails{
  display: flex;
  flex-direction: column;
  width: 64%;
}
.OrderDetails{
  display: flex;
  flex-direction: column;
  width:36%
}
.statusDetail {
    border-radius: 0.25rem;
    font-weight: bold;
    text-align: center;
    width: fit-content;
    color:white;
    padding: 0.1rem 0.5rem;
}
  
.statusActive {
    background-color: green;
}
.statusDone {
    background-color: red;
}
  
.statusUnknown {
    background-color: gray;
}
  </style>
  