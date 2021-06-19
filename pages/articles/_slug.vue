<template>
  <v-card outlined class="post-detail-card">
    <v-card-title>
      <v-btn icon @click="$router.back()">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <div class="width-10px" />
      {{ page && page.title }}
    </v-card-title>
    <v-card-subtitle>
      <div class="post-times">
        <div>发布时间：{{ createTime }}</div>
        <div class="width-10px" />
        <div>更新时间：{{ updateTime }}</div>
      </div>
    </v-card-subtitle>
    <v-divider />
    <v-card-text>
      <nuxt-content :document="page" />
    </v-card-text>
  </v-card>
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
      if (this.page) {
        return moment(this.page.createdAt).format('YYYY 年 MM 月 D 日 HH:mm:ss')
      }
      return ''
    },
    updateTime (): string {
      if (this.page) {
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
        this.page = page
      }
    }
  }
})
</script>
<style lang="less">
.post-times {
  display: flex;
  flex-direction: row;
}
@media screen and (max-width: 600px){
  .post-times {
    flex-direction: column;
  }
}
</style>
