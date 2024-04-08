<template>
  <b-navbar class="Navbar" toggleable="lg" type="dark">
    <b-navbar-brand href="#">Teecket</b-navbar-brand>
    <b-form-group class="SearchBarContainer">
      <b-input-group>
        <b-form-input
          v-model="searchInput"
          placeholder="Cari sesuatu..."
          type="text"
          class="SearchBar"
          @input="updateSearchQuery"
        />
      </b-input-group>
    </b-form-group>
    <b-navbar-nav v-if="!isUserLoggedIn" class="RightNavigation">
      <b-nav-item href="#">Cari Event</b-nav-item>
      <b-nav-item href="/registerOrganizerPage">Menjadi Organizer</b-nav-item>
      <b-button class="NavButton" href="/loginPage">Masuk</b-button>
    </b-navbar-nav>
    <b-navbar-nav v-if="isUserLoggedIn" class="RightNavigation">
      <template v-if="isUserType('user')">
        <b-nav-item href="#">Cari Event</b-nav-item>
        <b-nav-item href="#">My Tickets</b-nav-item>
        <b-button class="NavButton" variant="link" @click="toggleDropdown">
          <img src="https://picsum.photos/200" class="UserAvatar"  />
          <b-dropdown v-model="dropdownOpen" no-caret>
            <b-dropdown-item @click="navigateToProfile">My Profile</b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item @click="logout">Logout</b-dropdown-item>
          </b-dropdown>
        </b-button>
      </template>
      <template v-else-if="isUserType('organizer')">
        <b-nav-item href="#">Cari Event</b-nav-item>
        <b-nav-item href="#">My Events</b-nav-item>
        <b-nav-item href="#">Dashboard</b-nav-item>
      </template>    
      <template v-else-if="isUserType('admin')">
        <b-nav-item href="#">Cari Event</b-nav-item>
        <b-nav-item href="#">User Management</b-nav-item>
        <b-nav-item href="#">Dashboard</b-nav-item>
      </template>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
export default {
  name: 'WebNavbar',
  props: {
    loggedIn: {
      type: Boolean,
      default: false,
    },
    userType: {
      type: String,
      default: '',
    },
    searchQuery: {
      type: String,
      default: '',
    },
    userData: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      searchInput: this.searchQuery,
      dropdownOpen: false,
    };
  },
  computed: {
    isUserLoggedIn() {
      return this.loggedIn;
    },
  },
  watch: {
    // Watch changes to props and update local data accordingly
    searchQuery(newVal) {
      this.searchInput = newVal;
    },
  },
  methods: {
    updateSearchQuery() {
      this.$emit('update:searchQuery', this.searchInput);
    },
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
    navigateToProfile() {
      // To be implemented
    },
    logout() {
      // logout
    },
    isUserType(type) {
      return this.userType === type;
    },
  },
};
</script>
<style scoped>
/* Navbar */
.Navbar {
  display: flex;
  height: 8vh;
  align-items: center;
  justify-content: center;
  background-color: #0e9d6e;
  gap: 100px;
  color: white;
}

/* Search bar */
.SearchBarContainer {
  display: flex;
  align-items: center;
  margin-top: 1rem;
  border-radius: 5px;
  background-color: white;
}

.SearchBar {
  display: block;
  width: 60vh;
  padding: 9px 4px 9px 40px;
  border-radius: 5px;
  background: transparent url("/search.svg") no-repeat 13px;
}

/* Right navigation */
.RightNavigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  font-size: 1rem;
}

.NavButton {
  border-radius: 18px;
  background-color: white;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10vh;
  height: 40px;
  font-size: 1rem;
}
.b-nav-items{
    color: white;
  }

.UserAvatar {
  width: 35px; /* Adjust as needed */
  height: 35px; /* Adjust as needed */
  border-radius: 50%;
}
@media screen and (max-width: 768px) {
  .Navbar {
    justify-content: space-between; 
  }
}
</style>
