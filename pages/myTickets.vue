<template>
    <div class="ticketList">
      <div v-for="ticket in tickets" :key="ticket._id" class="ticketCard">
        <h3>{{ ticket.eventTitle }}</h3>
        <p>{{ ticket.eventSubTitle }}</p>
        <div v-for="category in ticket.category" :key="category._id">
          <p>{{ category.categoryName }} - {{ category.totalTickets }} Tickets</p>
          <p>Total Price: ${{ category.totalPrice }}</p>
        </div>
        <p>Event Location: {{ ticket.eventLocation }}</p>
        <p>Status: {{ ticket.status }}</p>
      </div>
  
      <!-- Pagination -->
      <b-pagination v-model="currentPage" :total-rows="totalTickets" :per-page="perPage" @change="loadTickets" />
    </div>
  </template>
<script>
export default {
    name: 'TicketList',
    data() {
        return {
            tickets: [],
            currentPage: 1,
            perPage: 10, 
            totalTickets: 0,
        };
    },
    mounted() {
        this.loadTickets();
    },
    methods: {
        async loadTickets() {
            try {
                const response = await this.$axios.get(`/api/tickets?page=${this.currentPage}&perPage=${this.perPage}`);
                this.tickets = response.data.data.tickets;
                this.totalTickets = response.data.data.totalTickets;
            } catch (error) {
                console.error('Error loading tickets:', error);
            }
        },
    },
};
</script>

<style>
.ticketList {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.ticketCard {
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  width: 300px;
}

.pagination {
  margin-top: 20px;
}
</style>
  </script>