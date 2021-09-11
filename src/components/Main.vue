<template>
<div style="width:100%;"> 
  <div class="d-flex justify-space-between header-container">
    <h1 class="ml-5 mt-3">Cryptocurrency Directory of Uses</h1>
    <div class="top-announce">This project is currently in an MVP state. A better UI, more listings, and exciting functionality is to come!</div>
  </div>
  <div class="d-flex main-area-container">
    <left-nav @selected="handleSelected" />
    <v-container class="mx-5 main-area">
      <list-categories
        :selected="selected" 
        :list="list" 
      />
      </v-container>
      <!-- <announcements /> -->
    </div>
  </div>
</template>

<script>
import itemList from '../data/useCases.json'
import ListCategories from './ListCategories.vue'
import LeftNav from './LeftNav.vue';
// import Announcements from './Announcements.vue'

  export default {
    name: 'Main',
    components: { ListCategories, LeftNav },
    data: () => ({
      list: itemList,
      selected: '',
    }),
    methods: {
      handleSelected (item) {
        this.selected = item
      }
    }
  }
</script>

<style>
.main-area {
  max-width: 80% !important;
}
.top-announce {
  background-color:#598392;
  color:white;
  border-radius: 4px; 
  padding: 5px 10px;
  margin: 20px 60px 0px 60px;
  display:flex;
  align-items: center;
}
@media only screen and (max-width: 777px) {
  .main-area-container {
    flex-direction:column;
  }
  .header-container {
    flex-direction: column;
  }
}
</style>
