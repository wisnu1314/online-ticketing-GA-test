<!-- eslint-disable vue/no-v-html -->
<template>
    <div>
      <p>{{ formData.eventTitle }}</p>
      <p>{{ formData.eventTags[0] }}</p>
      <div v-if="isHTML" v-html="formData.eventDescription ?? null"></div>
      <div v-if="!isHTML">{{ formData.eventDescription }}</div>


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
    },
    methods:{
      isHTML() {
      // Check if eventDescription contains HTML tags
        const containsHTML = /<[a-z][\s\S]*>/i.test(this.$props.formData.eventDescription);
        if (containsHTML) {
          return true
        } else {
          return false
        }
      },
    },
  };
  </script>
  
  <style>
  /* Add styles for the preview page */
  .PreviewBox{
    width: 85%;
    max-width: 62.5rem; 
    margin: 0 auto;
    overflow-y: auto;
    background-color: white;
    padding: 20px;
    border:solid #f2f0e9 1px;
    border-radius: 0.5rem;
    margin-top:0.5rem;
    margin-bottom: 0.5rem;
}
  </style>
  