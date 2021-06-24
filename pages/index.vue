<template>
  <v-container>
    <v-row v-for="(item) in posts" :key="item.path" justify="center" :dense="$vuetify.breakpoint.mobile">
      <v-col>
        <post-card :data="item" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import PostCard from '@/components/post-card/index.vue'
import { mapState } from 'vuex'

export default Vue.extend({
  components: {
    PostCard
  },
  computed: {
    ...mapState(['tags', 'posts'])
  }
})
</script>
