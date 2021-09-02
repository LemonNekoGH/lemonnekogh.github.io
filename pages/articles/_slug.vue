<template>
  <div class="article-page">
    <div class="article-container">
      <v-alert
        v-if="page.wip"
        text
        color="warning"
        dark
        outlined
        rounded="lg"
        icon="mdi-alert">
        本文章尚未完成，内容可能出现较大改动
      </v-alert>
      <div class="article-card">
        <div class="article-card-header">
          <button class="article-back-btn" @click="$router.back()">
            <i class="mdi mdi-arrow-left" />
          </button>
          <div>
            <div class="article-title">
              {{ page && page.title }}
            </div>
            <div class="article-subtitle">
              <div class="post-times">
                <div>发布时间：{{ createTime }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="neko-divider" />
        <div class="article-content">
          <nuxt-content :document="page" />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { IContentDocument } from '@nuxt/content/types/content'
import moment from 'moment'

export default Vue.extend({
  data () {
    return {
      page: {} as IContentDocument
    }
  },
  computed: {
    createTime (): string {
      if (this.page.createdAt) {
        return moment(this.page.createdAt).format('YYYY 年 MM 月 D 日 HH:mm:ss')
      }
      return ''
    }
  },
  watch: {
    page (val: IContentDocument) {
      if (val.title) {
        document.title = '柠喵的布洛阁 - ' + val.title
      }
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    async getData () {
      const page = await this.$content('articles', this.$route.params.slug).fetch()
      if (!Array.isArray(page)) {
        setTimeout(() => {
          this.page = page
        }, 500)
      }
    }
  }
})
</script>
<style lang="less" scoped>
.post-times {
  display: flex;
  flex-direction: row;
}
.text-loading {
  margin-top: 10px;
}
@media screen and (max-width: 600px){
  .post-times {
    flex-direction: column;
  }
}
.article {
  &-page {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  &-container {
    max-width: 1220px;
  }

  &-card {
    margin-top: 20px;
    border: 2px solid black;

    &-header {
      padding: 20px;
      display: flex;
      column-gap: 10px;
    }
  }

  &-title {
    font-size: 20px;
    font-weight: bold;
  }

  &-content {
    padding: 20px;
  }

  &-back-btn {
    transition: all 250ms;
    height: 50px;
    width: 50px;
    box-sizing: border-box;
    border: none;

    .mdi-arrow-left::before {
      font-size: 24px;
    }

    &:hover {
      border: 2px black solid;
    }
  }
}
.neko-divider {
  height: 2px;
  border-top: 2px black solid;
  box-sizing: border-box;
}
</style>
