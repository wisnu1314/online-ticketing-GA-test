<template>
  <div class="container">
    <h1 class="mt-5">User Management</h1>
    <hr>
    <div class="my-5">
      <ve-table
      :columns="columns"
      :table-data="allusers"
      row-key-field-name="_id" />
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
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
          // {
          //   field: "isActive",
          //   key: "isActive",
          //   type: "checkbox",
          //   title: "Status Aktif",
          //   align: "center",
          // },
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
    fetchOnServer: false,
    methods: {
    onClickDelete(rowIndex){
      const userData = JSON.parse(localStorage.getItem('userData'));
      const bearerToken = userData?.token;
      this.$axios.delete(`/api/accounts/${this.allusers[rowIndex]._id}`,{
        headers: {
        'Authorization': `Bearer ${bearerToken}`
      }
      })
      .then(res=>{
        alert(res.data.data)
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
