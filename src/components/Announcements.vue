<template>
    <div class="mr-6 mt-7" style="width:15%">
        <v-card class="mb-5">
            <v-card-title class="ann-title">Coming Soon</v-card-title>
            <v-card-content>
                <v-list>
                    <v-list-item>User Accounts</v-list-item>
                    <v-list-item>Community Project Ratings</v-list-item>
                    <v-list-item>More Listings!</v-list-item>
                </v-list>
            </v-card-content>
        </v-card>
         <v-card class="mb-3">
            <v-card-title  class="ann-title">Recently Added</v-card-title>
            <v-card-content>
                <v-list>
                    <v-list-item>Some Coin</v-list-item>
                    <v-list-item>Another Coin</v-list-item>
                    <v-list-item>Buttalingus Token</v-list-item>
                </v-list>
            </v-card-content>
        </v-card>
        <!-- <v-card>
            <v-card-title>Latest Crypto House Youtube Show</v-card-title>
            <v-card-content>
               
            </v-card-content>
        </v-card> -->
    </div>
</template>

<script>
export default {
    name: 'Announcements',
}
</script>
<style scoped>
.ann-title {
    background-color: #01161E;
    color:  #EFF6E0;
}
</style>