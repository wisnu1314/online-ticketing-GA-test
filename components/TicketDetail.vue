<template>
    <div class="ticketDetailWrapper">
      <div class="ticketDetail">
        <img :src="eventImageUrl" alt="Event Image" class="eventImage" />
        <div class="ticketInfo">
          <h1>{{ ticket.eventTitle }}</h1>
          <p><strong>Nomor Pemesanan:</strong> {{ ticket.orderNumber }}</p>
          <p><strong>Tanggal dan Waktu:</strong> {{ formattedDateTime(ticket) }}</p>
          <p><strong>Lokasi:</strong> {{ ticket.eventLocation }}</p>
          <p><strong>Status Pemesanan:</strong> <span :class="statusClass(ticket.status)">{{ ticket.status }}</span></p>
          <p><strong>Tiket:</strong> {{ formattedCategories(ticket.category) }}</p>
          <h2>Detail Pembayaran</h2>
          <div v-for="category in ticket.category" :key="category._id">
            <p>{{ category.categoryName }} x {{ category.totalTickets }}: Rp {{ formattedPrice(category.totalPrice) }}</p>
          </div>
          <h2>Total: Rp {{ formattedPrice(totalPrice) }}</h2>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        ticket: {},
        eventImageUrl: ''
      };
    },
    computed: {
      totalPrice() {
        return this.ticket.category.reduce((acc, category) => acc + category.totalPrice, 0);
      }
    },
    async mounted() {
      await this.loadTicketDetail();
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
  
          this.ticket = response.data.data.ticket;
  
          const eventResponse = await this.$axios.get(`/api/events/${this.ticket.eventId}`, {
            headers: {
              'Authorization': `Bearer ${bearerToken}`,
            },
          });
  
          this.eventImageUrl = eventResponse.data.data.promotionalContent.posterImageUrl || 'https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg';
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
      formattedPrice(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      },
      formattedCategories(categories) {
        return categories.map(category => `${category.categoryName} x ${category.totalTickets}`).join(', ');
      },
      statusClass(status) {
        return {
          'active': 'status-active',
          'inactive': 'status-done',
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
    max-width: 800px;
    background-color: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .eventImage {
    width: 100%;
    height: auto;
    margin-bottom: 1rem;
    border-radius: 0.5rem;
  }
  
  .ticketInfo {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .status-active {
    color: green;
  }
  
  .status-done {
    color: red;
  }
  
  .status-unknown {
    color: gray;
  }
  </style>
  