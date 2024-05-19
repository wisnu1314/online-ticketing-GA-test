<!-- eslint-disable vue/no-v-html -->
<template>
    <div >
      <div class="CoverImageWrapper">
        <img
          class="CoverImage"
          :src="getImageUrl()"
          alt="Event Cover Image"
        />
    </div>
      <div class="TopPreview">
        <div class="TitleBox">
          <h3>{{ formattedDate }}</h3>
          <h1>{{ formData.eventTitle }}</h1>
          <h3>{{ `"${formData.subTitle}"` }}</h3>
        </div>
        <div class="TicketBox">
          <div class="PriceRangeContainer">
            {{ getPriceRange }}
          </div>
          <b-button class="PreviewTicketButton">Pesan Tiket</b-button>
        </div>
      </div>
      
      <div class="DetailBox">
        <h2>Tanggal dan waktu</h2>
        <div class="ContentBox">
          <b-icon-calendar/>
          <div>{{ formattedDateTime }}</div>
        </div>
        <h2>Lokasi</h2>
        <div class="ContentBox">
          <b-icon-geo-alt/>
          <div>{{ formData.location }}</div>
        </div>
        <h2>Tentang event ini</h2>
        <div class="DescriptionBox">
          <div v-if="isHTML" v-html="formData.promotionalContent.description"></div>
          <div v-if="!isHTML">{{ formData.promotionalContent.description }}</div>
        </div>
        
        <h2 v-if="formData.promotionalContent.tags.length">Tags</h2>
        <div v-if="formData.promotionalContent.tags.length" class="SelectedTags">
          <span v-for="(tag, index) in formData.promotionalContent.tags" :key="index" class="TagItem">{{ tag }}</span>
        </div>
        <p class="h5">Informasi Organizer</p>
        <div class="infoOrganizer">
          <div class="organizationBox">
            <img :src="getOrganizerImageUrl()"/>
            <div class="Organizer">
              <ul>
                <li class="organizerName">{{ eoData.name ?? '' }}</li>
                <li class="organizerDetail">est. {{ eoData?.establishYear ?? '' }}</li>
              </ul>
            </div>
          </div>
          <p class="mt-3">{{ eoData?.description ?? '' }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'PreviewEvent',
    props: {
      formData: {
        type: Object,
        required: true,
      },
      eoData:{
        type: Object,
        required: true,
      }
    },
    computed: {
      formattedDate(){
        const startTime = new Date(this.formData.startDate);
        const options = {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        };
        const formattedStart = startTime.toLocaleString('id-ID', { ...options,timeZone: 'Asia/Jakarta' });
        return `${formattedStart}`
      },
      formattedDateTime() {
        const startTime = new Date(this.formData.startDate);
        const endTime = new Date(this.formData.endDate);
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
        const prices = this.formData.tickets.map((category) => category.pricePerTicket);
        const minPrice = this.formatPrice(Math.min(...prices));
        const maxPrice = this.formatPrice(Math.max(...prices));
        if(minPrice === maxPrice){
          return `Rp${minPrice}`
        }
        return `Rp${minPrice} - Rp${maxPrice}`;
      },
      
    },
    methods:{
      isHTML() {
      // Check if description contains HTML tags
        const containsHTML = /<[a-z][\s\S]*>/i.test(this.$props.formData.promotionalContent.description);
        if (containsHTML) {
          return true
        } else {
          return false
        }
      },
      getImageUrl() {
        return this.$props.formData.promotionalContent.posterImageUrl === '' ? 
          'https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg' 
          :  `${this.$props.formData.promotionalContent.posterImageUrl}`;
      },
      getOrganizerImageUrl(){
        return this.$props.eoData.profilePictureUrl === "" ? 
          'https://iili.io/Jk1PRV4.jpg' 
          :  `${this.$props.eoData.profilePictureUrl}`;
      },
      formatPrice(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      },
    },
  };
  </script>
  
  <style>
.TopPreview{
  display: flex;
  flex-direction: row;
  gap:0.5rem;
}
.TitleBox{
    display: flex;
    width:60%;
    flex-direction: column;
}
.TicketBox {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center; 
    width: 39%;
    height: 8rem;
    border: solid #f2f0e9 1px;
    border-radius: 0.5rem;
    gap:0.5rem;
    box-shadow: 7px 7px 7px 7px rgba(0, 0, 0, 0.116);
}
.PriceRangeContainer {
    display: flex;
    justify-content: center;
    align-items: center; 
}
.PreviewTicketButton{
    width:90%;
    border-radius: 0.5rem;
    background-color: #035037;
    color: white;
    cursor:none;
    pointer-events: none;
    font-size: 0.75rem;
}
.CoverImageWrapper {
    width: 100%;
    height: 22.5rem;
    max-height: 40rem;
    border-radius: 1rem;
    overflow: hidden;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f0f0f0;
}

.CoverImageWrapper img {
  width: 100%;
  height: 100%;
  object-fit: contain; 
  border-radius: 1rem;
}
.ContentBox{
    display: flex;
    justify-content: left;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
    width: 60%;
    font-size: 0.75rem;
}
.DescriptionBox{
    width: 60%;
}
.organizationBox{
  display: flex;
  flex-direction: row;
}
.organizationBox img{
  width:5rem;
  height:5rem;
}
h1{
    font-size: 1.5rem;   
}
h2{
    margin-top: 0.5rem;
    font-size: 1.25rem;
}
h3{
    font-size:1rem;
    color:#57576F ;
}
.SelectedTags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0.5rem;
}
.TagItem {
    color:#f2f0e9;
    background-color: #F1600D;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    cursor: pointer;
}
.infoOrganizer {
  background-color: #F1F5F9;
  padding: 20px;
  border-radius: 20px;
  width:60%
}

.Organizer ul{
  list-style-type: none;
  margin: 0;
  padding: 0;
  margin-left: 20px;
}

.organizerName {
  font-weight: 700;
}

.organizerDetail {
  font-size: small;
  color: grey;
}
  </style>
  