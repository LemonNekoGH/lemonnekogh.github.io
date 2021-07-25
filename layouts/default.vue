<template>
  <v-app>
    <v-app-bar
      color="primary"
      dark
      elevation="4"
      app>
      <div class="text-h5 app-bar-title">
        柠喵的布洛阁
      </div>
      <div class="width-10px" />
      <v-btn v-for="tab of tabs" :key="tab.name" :nuxt="true" :to="tab.to" text>
        <v-icon left>
          {{ tab.icon }}
        </v-icon>
        {{ tab.name }}
      </v-btn>
    </v-app-bar>
    <v-main>
      <transition mode="out-in" name="fade-slide">
        <nuxt />
      </transition>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapMutations, mapState } from 'vuex'
import Lodash from 'lodash'
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
    ...mapMutations(['setTagColor', 'setTags', 'setPosts', 'setCategories']),
    async initStore () {
      // 获取文章
      const res = await this.$content('articles').sortBy('createTime', 'desc').fetch()
      if (Array.isArray(res)) {
        this.setPosts(res)
      } else {
        this.setPosts([res])
      }
      // 统计标签
      const tagArr: string[] = []
      for (const post of this.posts) {
        if (Array.isArray(post.tags)) {
          for (const tag of post.tags) {
            if (!Lodash.includes(tagArr, tag)) {
              tagArr.push(tag)
            }
          }
        }
      }
      this.setTags(tagArr)
      // 生成不亮不暗的随机颜色
      const map: TagColorMap = {}
      this.tags.forEach((it: string) => {
        map[it] = Colors.randomColor()
      })
      this.setTagColor(map)
      // 统计分类
      const categories: string[] = []
      for (const post of this.posts) {
        if (!categories.includes(post.category)) {
          categories.push(post.category)
        }
      }
      this.setCategories(categories)
    }
  }
})
</script>
<style lang="less" scoped>
.app-bar-title {
  flex-shrink: 0;
}
</style>
