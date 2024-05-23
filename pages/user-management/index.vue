<template>
  <div class="container">
    <h1 class="mt-5">User Management</h1>
    <hr>
    <div class="mt-3 mb-5">
      <div class="mb-3">
        <b-form-input v-model="searchValue" placeholder="Masukkan email atau nama pengguna"></b-form-input>
      </div>
      <ve-table
      :columns="columns"
      :table-data="tableData"
      row-key-field-name="_id" />
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
        searchValue:"",
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
        allusers: [],
        columns: [
          { field: "email", key: "email", title: "Email", align: "left" },
          { field: "name", key: "name", title: "Name", align: "left" },
          { field: "role", key: "role", title: "Role", align: "left" },
          {
            field: "isActive",
            key: "isActive",
            title: "Aktif",
            align: "center",
            renderBodyCell : ({ row, column, rowIndex }, h) => {
              return h('input', {
                attrs: {
                  type: 'checkbox',
                  disabled: false,
                  checked: row.isActive
                },
                domProps: {
                  classList: 'form-input--check'
                },
                on: {
                  change: () => this.changeStatus(rowIndex)
                }
              })
            }
          },
          { field: "createdAt", key: "createdAt", title: "Tanggal Dibuat", align: "left" },
          { field: "updatedAt", key: "updatedAt", title: "Tanggal Diperbaharui", align: "left" },
          { field: "", key: "e", title: "Action", fixed:"right", center: "left", renderBodyCell: ({ row, column, rowIndex }, h) => {
        return h(
          'div',
          {
            domProps: {
              classList: 'flex v-center flex--wrap flex-gap-14'
            }
          },
          [
            h(
              'button',
              {
                domProps: {
                  classList: 'btn--red pv-4 ph-8'
                },
                on: {
                  click: () => this.onClickDelete(rowIndex)
                }
              },
              [
                h('span', {
                  class: 'fas fa-trash'
                })
              ]
            )
          ]
        )
        }},
        ],
      }
    },
    async fetch(){
      const userData = JSON.parse(localStorage.getItem('userData'));
      const bearerToken = userData?.token;
      await this.$axios(`/api/accounts`,{
        headers: {
        'Authorization': `Bearer ${bearerToken}`
        }
      }).then (res=>
      {
        this.allusers = res.data.data.accounts
      }
      )
    },
    computed: {
        // table data
        tableData() {
            const { pageIndex, pageSize } = this;
            const DB_DATA = this.allusers
            const searchValue = this.searchValue;
            const seachResult = DB_DATA.filter(
                (x) =>
                    !searchValue.length ||
                    x.name.toLowerCase().includes(searchValue.toLowerCase())||x.email.toLowerCase().includes(searchValue.toLowerCase()),
            );
            return seachResult.slice((pageIndex - 1) * pageSize, pageIndex * pageSize);
        },
        // total count
        totalCount() {
            return this.allusers.length;
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
    onClickDelete(rowIndex){
      const userData = JSON.parse(localStorage.getItem('userData'));
      const bearerToken = userData?.token;
      this.$axios.delete(`/api/accounts/${this.allusers[rowIndex]._id}`,{
        headers: {
        'Authorization': `Bearer ${bearerToken}`
      }
      })
      .then(res=>{
        
        alert('Account Deleted')
        window.location.reload()
      })
    },
    changeStatus(rowIndex){
      const userData = JSON.parse(localStorage.getItem('userData'));
      const bearerToken = userData?.token;
      this.$axios.put(`/api/accounts/update`,{
        "userId": this.allusers[rowIndex]._id
      },{
        headers: {
        'Authorization': `Bearer ${bearerToken}`
      }
      }).then(res =>{
        window.location.reload()
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
