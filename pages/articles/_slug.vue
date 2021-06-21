<template>
  <div>
    <v-card v-if="!updateTime" outlined class="post-loading-card" rounded="lg">
      <div class="post-loading-card-header">
        <v-skeleton-loader type="avatar" />
        <div class="post-loading-card-header-texts">
          <v-skeleton-loader type="heading" />
          <v-skeleton-loader type="text" class="text-loading" />
        </div>
      </div>
      <v-divider />
      <v-card-text>
        <v-skeleton-loader type="text" />
        <v-skeleton-loader type="text" />
        <v-skeleton-loader type="text" max-width="50%" />
        <v-skeleton-loader type="text" />
        <v-skeleton-loader type="text" />
        <v-skeleton-loader type="text" max-width="50%" />
      </v-card-text>
    </v-card>
    <v-card v-else outlined class="post-detail-card" rounded="lg">
      <div class="post-detail-card-header">
        <div class="width-10px" />
        <v-btn icon @click="$router.back()">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <div>
          <v-card-title>
            {{ page && page.title }}
          </v-card-title>
          <v-card-subtitle>
            <div class="post-times">
              <div>发布时间：{{ createTime }}</div>
              <div class="width-10px" />
              <div>更新时间：{{ updateTime }}</div>
            </div>
          </v-card-subtitle>
        </div>
      </div>
      <v-divider />
      <v-card-text>
        <nuxt-content :document="page" />
      </v-card-text>
    </v-card>
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
    },
    updateTime (): string {
      if (this.page.updatedAt) {
        return moment(this.page.updatedAt).format('YYYY 年 MM 月 D 日 HH:mm:ss')
      }
      return ''
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
        }, 1500)
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
.post-loading-card {
  &-header {
    padding: 16px;
    display: flex;
    align-items: center;
    &-texts {
      flex: 1;
      margin-left: 16px;
    }
  }
}
.text-loading {
  margin-top: 10px;
}
@media screen and (max-width: 600px){
  .post-times {
    flex-direction: column;
  }
}
</style>
