<template>
  <v-container>
    <v-row v-for="(item) in posts" :key="item.path" justify="center">
      <v-col>
        <post-card :data="item" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { IContentDocument } from '@nuxt/content/types/content'
import PostCard from '@/components/post-card/index.vue'

export default Vue.extend({
  components: {
    PostCard
  },
  data () {
    return {
      posts: [] as IContentDocument[]
    }
  },
  mounted () {
    this.getContent()
  },
  methods: {
    async getContent () {
      const posts = await this.$content('articles').sortBy('createdAt', 'desc').fetch()
      if (Array.isArray(posts)) {
        this.posts = posts
      } else {
        this.posts.push(posts)
      }
    }
  }
})
</script>
