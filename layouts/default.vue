<template>
  <v-app>
    <v-app-bar
      color="primary"
      dark
      flat
      app>
      <div class="text-h5 app-bar-title">
        柠喵的布洛阁
      </div>
      <v-tabs right>
        <v-tab v-for="tab of tabs" :key="tab.name" :nuxt="true" :to="tab.to">
          <v-icon left>
            {{ tab.icon }}
          </v-icon>
          {{ tab.name }}
        </v-tab>
      </v-tabs>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapMutations, mapState } from 'vuex'
import Lodash from 'lodash'
import { IContentDocument } from '@nuxt/content/types/content'
import { TagColorMap } from '~/store'
import { Colors } from '~/utils/Colors'

interface Tab {
  name: string
  icon: string
  to: string
}

export default Vue.extend({
  data () {
    return {
      tabs: [
        { name: '首页', icon: 'mdi-home', to: '/' },
        { name: '归档', icon: 'mdi-archive', to: '/archive' },
        { name: '分类', icon: 'mdi-shape', to: '/categories' },
        { name: '标签', icon: 'mdi-tag-multiple', to: '/tags' },
        { name: '友链', icon: 'mdi-heart', to: '/friends' }
      ] as Tab[]
    }
  },
  computed: {
    ...mapState(['tags', 'posts'])
  },
  mounted () {
    this.initStore()
  },
  methods: {
    ...mapMutations(['setTagColor', 'setTags', 'setPosts']),
    async initStore () {
      console.log('initializing posts')
      const res = await this.$content('articles').sortBy('createdAt', 'desc').fetch()
      if (Array.isArray(res)) {
        this.setPosts(res)
      } else {
        this.setPosts([res])
      }
      const tagArr: string[] = []
      for (const post of this.posts) {
        for (const tag of post.tags) {
          if (!Lodash.includes(tagArr, tag)) {
            tagArr.push(tag)
          }
        }
      }
      this.setTags(tagArr)
      const map: TagColorMap = {}
      this.tags.forEach((it: string) => {
        map[it] = Colors.randomColor()
      })
      this.setTagColor(map)
      console.log(map)
    }
  }
})
</script>
<style lang="less" scoped>
.app-bar-title {
  flex-shrink: 0;
}
</style>
