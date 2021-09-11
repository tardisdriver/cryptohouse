<template>
  <v-navigation-drawer
    id="nav-drawer"
    permanent
    class="ml-5 mt-7 py-1 px-2"
    :style="menuTop"
  >
    <v-list dense rounded>
      <v-list-item-title class="menu-title"
        >Filter by Category</v-list-item-title
      >
      <zoom-center-transition>
        <v-list-item
          v-if="showRevert"
          class="revert-button"
          @click="handleClearFilter"
        >
          <v-list-item-icon class="mr-2" color="#01161E">
            <v-icon color="#EFF6E0">mdi-close-thick</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            Remove Filter
          </v-list-item-content>
        </v-list-item>
      </zoom-center-transition>
      <v-list-item
        class="mb-0 px-1"
        v-for="item in items"
        :key="item.ID"
        link
        @click="handleSelected(item)"
      >
        <v-list-item-icon class="mr-2" color="#01161E">
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title class="category-title">{{
            item.name
          }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { ZoomCenterTransition } from "vue2-transitions";
import listData from "../data/useCases.json";

export default {
  name: "LeftNav",
  emits: ["selected"],
  components: {
    ZoomCenterTransition,
  },
  data: () => ({
    items: [],
    showRevert: false,
    scrollPosition: 0,
    menuTop: '',
  }),
  created() {
    for (let item of listData) {
      this.items.push({
        name: item.category,
        icon: item.icon,
        link: item.link,
      });
    }
  },
    mounted () {
      window.addEventListener('scroll', this.onScroll)
  },
  beforeDestroy () {
      window.removeEventListener('scroll', this.onScroll)
  },
  watch: {
      scrollPosition (newPosition) {
          if(newPosition >= 69) this.menuTop = 'top: 80px !important;'
            else this.menuTop = ''
      }
  },
  methods: {
    handleSelected(item) {
      this.showRevert = true;
      this.$emit("selected", item.name);
    },
    handleClearFilter() {
      this.showRevert = false;
      this.$emit("selected", "");
    },
    onScroll () {
        this.scrollPosition = window.top.scrollY
        console.log(this.scrollPosition)
    }
  },
};
</script>
<style lang="scss" scoped>
#nav-drawer {
    position: sticky;
  background-color: #aec3b0;
  border-radius: 4px;
  min-width: 175px;
  max-width: 300px;
  .category-title,
  .menu-title {
    color: "#01161E";
    white-space: pre-wrap !important;
    overflow: visible !important;
  }
  .revert-button {
    margin: 10px 0;
    background-color: rgb(18, 69, 89);
    color: #eff6e0;
  }
}
@media only screen and (max-width: 777px) {
  #nav-drawer {
      width: 90vw;
      max-width:90vw !important;
      min-width:90vw !important;
      max-height:160px;
      z-index: 1000;
  }
}
</style>
