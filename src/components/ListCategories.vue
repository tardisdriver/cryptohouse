<template>
  <div id="list-container">
    <div v-for="section of list" :key="section.ID">
      <collapse-transition>
        <v-card
          class="my-4 cat-card-container"
          v-if="selected ? selected === section.category : true"
        >
          <h2 class="cat-header">{{ section.category }}</h2>
          <v-list class="cat-card">
            <v-list-item three-line v-for="item of section.list" :key="item.ID">
              <v-list-item-content>
                <v-list-item-title class="d-flex align-center project-title">
                  <span>{{ item.name }}</span>
                </v-list-item-title>
                <v-list-item-subtitle class="project-description">{{
                  item.description
                }}</v-list-item-subtitle>
                <v-list-item-subtitle class="project-link"
                  ><a
                    :href="`${item.website}`"
                    target="__blank"
                    rel="nofollow"
                    >{{ item.website }}</a
                  ></v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </collapse-transition>
    </div>
  </div>
</template>
<script>
import { CollapseTransition } from "vue2-transitions";

export default {
  name: "ListCategories",
  props: {
    list: Array,
    selected: String,
  },
  components: {
    CollapseTransition,
  },
};
</script>
<style scoped>
.cat-card-container {
   margin-left: 28px;
}
.cat-card {
  background-color: rgb(236, 236, 236) !important;
}
.cat-header {
  width: 100%;
  background-color: #01161e;
  color: #eff6e0;
  padding: 5px 10px;
}
.project-title {
  font-weight:800;
  font-size: 18px;
}
.project-description, .project-link {
  font-weight: 600;
  font-size:16px;
}
@media only screen and (max-width: 777px) {
  #list-container {
      width: 85vw;
      max-width:85vw !important;
      min-width:85vw !important;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
  }
  .cat-card-container {
    margin-left:0 !important;
  }
  .cat-card {
    width: 85vw;
      max-width:85vw !important;
      min-width:85vw !important;
  }
}
</style>
