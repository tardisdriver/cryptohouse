<template>
  <v-app>
    <v-app-bar
      app
      color="#124559"
      dark
    >
      <div class="d-flex align-center site-title">
        <img class="mr-3" src="@/assets/ch-logo.png" width="50px" height="50px" />
        Crypto HOUSe
      </div>

      <v-spacer></v-spacer>
       <!-- <v-btn rounded>
        Log In
      </v-btn>
      <v-btn text>
        Submit A Coin/Token
      </v-btn> -->
    </v-app-bar>

    <v-main>
      <div class="d-flex">
        <Main />
      </div>
    </v-main>
  </v-app>
</template>

<script>
import Main from './components/Main';
// import LeftNav from './components/LeftNav.vue';

export default {
  name: 'App',

  components: {
    Main,
  },

  data: () => ({
    //
  }),
};
</script>
<style>
#app {
  background-color:#EFF6E0;
  font-family: 'Raleway', sans-serif;
}
.site-title {
  font-family: 'Righteous', cursive;
  text-transform: uppercase;
  font-size: 26px;
}
h1 {
  font-family:'Righteous', sans-serif;
}
h2 {
  font-family: 'Raleway', sans-serif;
}
</style>
