<template>
  <div class="container">
    <h1 class="mt-5">Riwayat Berlangganan</h1>
    <p>Sisa Kuota Kumulatif Auto-Genarate Deskripsi Event</p>
    <h1>{{ userDataAPI.gptAccessTokenQuota }}</h1>
    <hr>
    <div class="mt-3 mb-5">
      <ve-table
      :columns="columns"
      :table-data="tableData"
      row-key-field-name="_id" />
      <div v-if="tableData.length === 0" class="empty-data">Data Empty.</div>
      <div class="mt-4">
        <ve-pagination
          :total="totalCount"
          :page-index="pageIndex"
          :page-size="pageSize"
          @on-page-number-change="pageNumberChange"
          @on-page-size-change="pageSizeChange"
      />
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        userDataAPI:[],
        // page index
        pageIndex: 1,
        // page size
        pageSize: 10,
        checkboxOption: {
            // row select change event
            // defaultSelectedRowKeys: this.allusers.map((user) => user.isActive),
            selectedRowChange: ({ row, isSelected, selectedRowKeys }) => {
                console.log(row, isSelected, selectedRowKeys);
            },
            // selected all change event
            selectedAllChange: ({ isSelected, selectedRowKeys }) => {
                console.log(isSelected, selectedRowKeys);
            },
        },
        allData: [],
        columns: [
          { field: "_id", key: "_id", title: "Nomor Pemesanan", align: "left" },
          { field: "createdAt", key: "createdAt", title: "Tanggal Beli", align: "left" },
          { field: "packageName", key: "packageName", title: "Paket Langganan", align: "left" },
          { field: "totalToken", key: "totalToken", title: "Jumlah Kuota", align: "left" },
        ],
      }
    },
    async fetch(){
      const userData = JSON.parse(localStorage.getItem('userData'));
      const bearerToken = userData?.token;
      await this.$axios(`/api/purchases/${userData.userId}`,{
        headers: {
        'Authorization': `Bearer ${bearerToken}`
        }
      }).then (res=>
      {
        this.allData = res.data.data
      }
      )
      await this.$axios(`/api/profile/eo/${userData.userId}`,{
        headers: {
        'Authorization': `Bearer ${bearerToken}`
        }
      }).then (res=>
      {
        this.userDataAPI = res.data.data
      }
      )
    },
    computed: {
        // table data
        tableData() {
            const { pageIndex, pageSize } = this;
            const DB_DATA = this.allData
            return DB_DATA.slice((pageIndex - 1) * pageSize, pageIndex * pageSize);
        },
        // total count
        totalCount() {
            return this.allData.length;
        },
    },
    fetchOnServer: false,
    methods: {
      // page number change
      pageNumberChange(pageIndex) {
          this.pageIndex = pageIndex;
      },

      // page size change
      pageSizeChange(pageSize) {
          this.pageIndex = 1;
          this.pageSize = pageSize;
      },
  }
}
</script>

<style scoped>
.container {
  min-height: 60vh;
}
.empty-data {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  width: 100%;
  color: #666;
  font-size: 16px;
  border: 1px solid #eee;
  border-top: 0;
}
</style>
