<template>
    <div class="ticketList">
      <div v-for="(ticket, index) in tickets" :key="ticket._id" class="ticketCard">
        <div class="ticketCardHeader">
          <img :src="imageUrls[index]" alt="Event Image" class="eventImage"/>
          <div class="ticketCardInfo">
            <h3>{{ ticket.eventTitle }}</h3>
            <p class="LocationDetail">
                {{ ticket.eventLocation }} | {{ formattedDateTime(ticket) }}
            </p>
            
          </div>
        </div>
        <div class="ticketCardDetails">
            <div class="status" :class="statusClass(ticket.status)">{{ ticket.status === 'active' ? 'Aktif' : 'Selesai' }}</div>
            <div class="categoryAndPrice">
                <p>
                    <span v-for="category in ticket.category" :key="category._id">
                        {{ category.categoryName }} x {{ category.totalTickets }},
                    </span>
                </p>
                <div class="totalPrice">
                    Rp{{ formattedPrice(ticket.category.reduce((acc, category) => acc + category.totalPrice, 0)) }}
                </div>
            </div>
        </div>
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
        tickets: [
          {
            "_id": "663e1cb4bffb61d99bdf6d88",
            "eventId": "6641e48fd05e3b8c46eff7bd",
            "eventStartDate": "2024-06-29T12:00:00.000Z",
            "eventEndDate": "2024-07-01T22:00:00.000Z",
            "eventLocation": "Central Park 1",
            "eventTitle": "Slow Music Season 1",
            "eventSubTitle": "The biggest sport",
            "userId": "6628e8e07ff2751e1f18b21c",
            "category": [
              {
                "categoryName": "VIP",
                "totalTickets": 2,
                "totalPrice": 290,
                "_id": "663e1cb4bffb61d99bdf6d89"
              },
              {
                "categoryName": "General Admission",
                "totalTickets": 1,
                "totalPrice": 950,
                "_id": "663e1cb4bffb61d99bdf6d8a"
              }
            ],
            "status": "inactive",
            "createdAt": "2024-05-10T13:10:12.535Z",
            "updatedAt": "2024-05-10T13:10:12.535Z",
            "__v": 0,
             // Add your event image URL here
          },
          {
            "_id": "663e1cb4bffb61d99bdf6d88",
            "eventId": "6641e48fd05e3b8c46eff7bd",
            "eventStartDate": "2024-06-29T12:00:00.000Z",
            "eventEndDate": "2024-07-01T22:00:00.000Z",
            "eventLocation": "Central Park 1",
            "eventTitle": "Slow Music Season 1",
            "eventSubTitle": "The biggest sport",
            "userId": "6628e8e07ff2751e1f18b21c",
            "category": [
              {
                "categoryName": "VVIP",
                "totalTickets": 10,
                "totalPrice": 2000,
                "_id": "663e1cb4bffb61d99bdf6d89"
              },
              {
                "categoryName": "General Admission",
                "totalTickets": 1,
                "totalPrice": 22950,
                "_id": "663e1cb4bffb61d99bdf6d8a"
              }
            ],
            "status": "active",
            "createdAt": "2024-05-10T13:10:12.535Z",
            "updatedAt": "2024-05-10T13:10:12.535Z",
            "__v": 0,
             // Add your event image URL here
          }
        ],
        currentPage: 1,
        perPage: 10,
        totalTickets: 0,
        imageUrls:[],
      };
    },
    mounted(){
        this.fetchImageUrls();
    },
    methods: {
      async loadTickets() {
        try {
          const response = await this.$axios.get(`/api/tickets?page=${this.currentPage}&perPage=${this.perPage}`);
          
          this.tickets = response.data.data.tickets;
          this.totalTickets = response.data.data.totalTickets;
          await this.fetchImageUrls();
        } catch (error) {
          console.error('Error loading tickets:', error);
        }
      },
      async fetchImageUrls() {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const bearerToken = userData?.token;

        const imageUrlPromises = this.tickets.map(async (ticket) => {
            try {
            const response = await this.$axios.get(`/api/events/${ticket.eventId}`, {
                headers: {
                'Authorization': `Bearer ${bearerToken}`,
                },
            });

            if (response.data.code === 200 && response.data.status === 'OK') {
                const eventPromotionalContent = response.data.data.promotionalContent;
                return eventPromotionalContent.posterImageUrl !== ''
                ? eventPromotionalContent.posterImageUrl
                : 'https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg';
            }
            } catch (error) {
            console.error('Error loading event image URL:', error);
                return 'https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg'; // Default image on error
            }
      });

      this.imageUrls = await Promise.all(imageUrlPromises);
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
        const formattedStart = startTime.toLocaleString('id-ID', { ...options,timeZone: 'Asia/Jakarta' });
        const formattedEnd = endTime.toLocaleString('id-ID', { ...options, timeZone: 'Asia/Jakarta'  });
        const timeZoneOffset = -(startTime.getTimezoneOffset() / 60); // Calculate offset in hours
        const gmtOffset = `GMT${timeZoneOffset >= 0 ? '+' : ''}${timeZoneOffset}`;
        return `${formattedStart} ${gmtOffset} - ${formattedEnd} ${gmtOffset}`;
      },
      formattedPrice(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      },
      statusClass(status) {
        return {
          'active': 'status-active',
          'inactive': 'status-done',
        }[status] || 'status-unknown';
      },
    },
  };
  </script>
  
<style>
.ticketList {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
    width: 90%;
    max-width: 70rem;
    margin: 0 auto;
    overflow-y: auto;
    background-color: white;
    padding: 20px;
    border: solid #f2f0e9 1px;
    border-radius: 0.5rem;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    flex-direction: column;
    align-items: center;
}  
.ticketList .b-pagination {
    align-self: center;
}  
.ticketCard {
    display: flex;
    flex-direction: column;
    border: 1px solid #ccc;
    border-radius: 0.5rem;
    width: 90%;
    max-width: 60rem;
    margin-bottom: 1rem;
    padding: 0.5rem;
    gap: 0.1rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}  
.ticketCardHeader {
    display: flex;
    align-items: center;
    gap: 2rem;
}
.eventImage {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 0.5rem;
}
  
.ticketCardInfo {
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
}
.ticketCardDetails {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
}
.categoryAndPrice {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.categoryAndPrice p {
    margin: 0;
    display: flex;
    flex: 1;
}
.totalPrice {
    display: flex;
    font-weight: bold;
    color: #333;
    justify-content: right;
    margin-right: 1rem;
}
.status {
    margin-top: 0.5rem;
    padding: 0.1rem 0.5rem;
    border-radius: 0.25rem;
    font-weight: bold;
    text-align: center;
    width: fit-content;
    color:white;
}
.status-active {
    background-color: orange;
    font-weight: bold;
}
.status-done {
    background-color: green;
    font-weight: bold;
}
.status-unknown {
    background-color: gray;
    font-weight: bold;
}
.pagination {
    margin-top: 20px;
}
p, h3 {
    margin: 0;
}
.LocationDetail{
    color: #959595;
}
  </style>
  