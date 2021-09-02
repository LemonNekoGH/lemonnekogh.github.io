<template>
  <el-container>
    <el-header class="header">
      <div class="header-container">
        <div class="width-10px" />
        <div class="header-title">
          柠喵的布洛阁
        </div>
        <div class="spacer" />
        <div class="header-links">
          <button v-for="tab of tabs" :key="tab.name" class="header-link" @click="$router.push(tab.to)">
            {{ tab.name }}
          </button>
        </div>
        <div class="width-10px" />
      </div>
    </el-header>
    <el-main>
      <transition mode="out-in" name="fade-slide">
        <nuxt />
      </transition>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapMutations, mapState } from 'vuex'
import Lodash from 'lodash'
import { TagColorMap } from '~/store'
import { Colors } from '~/utils/Colors'

interface Tab {
  name: string;
  icon: string;
  to: string;
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
      const res = await this.$content('articles')
        .sortBy('createTime', 'desc')
        .fetch()
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
.header {
  display: flex;
  justify-content: center;
  border-bottom: 2px black solid;
  &-container {
    width: 1220px;
    display: flex;
    align-items: center;
  }
  &-title {
    font-size: 20px;
    font-weight: bold;
  }
  &-links {
    display: flex;
    flex-direction: row;
    column-gap: 10px;
  }
  &-link {
    font-weight: bold;
    transition: all 250ms;
    border: 2px white solid;
    padding: 5px 10px;
    &:hover {
      border-color: black;
    }
    &:active {
      background: black;
      color: white;
    }
    &-active {
      border-color: black;
    }
  }
}
</style>
