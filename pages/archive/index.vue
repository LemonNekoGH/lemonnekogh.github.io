<template>
  <v-row justify="center">
    <v-col xl="8">
      <v-timeline dense>
        <v-timeline-item v-for="month of Object.keys(postsByMonth)" :key="month" small>
          <v-card outlined>
            <v-card-title>{{ month }}</v-card-title>
            <v-divider />
            <v-list>
              <div v-for="(post, index) in postsByMonth[month]" :key="post.createTime">
                <v-list-item :href="post.path" :nuxt="true" link>
                  <v-list-item-title>{{ post.title }}</v-list-item-title>
                </v-list-item>
                <v-divider v-if="index !== postsByMonth[month].length - 1" />
              </div>
            </v-list>
          </v-card>
        </v-timeline-item>
      </v-timeline>
    </v-col>
  </v-row>
</template>
<script lang="ts">
import Vue from 'vue'
import { mapState, mapGetters } from 'vuex'

export default Vue.extend({
  computed: {
    ...mapState(['posts']),
    ...mapGetters(['postsByMonth'])
  }
})
</script>
