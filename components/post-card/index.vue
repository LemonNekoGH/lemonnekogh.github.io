<template>
  <v-card outlined :href="data.path" :nuxt="true" rounded="lg">
    <v-card-title>{{ data.title }}</v-card-title>
    <v-card-subtitle>
      <div class="post-card-times">
        <div>发布时间：{{ createTime }}</div>
        <div class="width-10px" />
        <div>更新时间：{{ updateTime }}</div>
      </div>
    </v-card-subtitle>
    <v-divider />
    <v-card-text>
      {{ data.description }}
    </v-card-text>
  </v-card>
</template>
<script lang="ts">
import Vue from 'vue'
import { IContentDocument } from '@nuxt/content/types/content'
import moment from 'moment'

export default Vue.extend({
  props: {
    data: {
      type: Object as () => IContentDocument,
      required: true
    }
  },
  computed: {
    createTime (): string {
      return moment(this.data.createdAt).format('YYYY 年 MM 月 D 日 HH:mm:ss')
    },
    updateTime (): string {
      return moment(this.data.updatedAt).format('YYYY 年 MM 月 D 日 HH:mm:ss')
    }
  }
})
</script>
<style lang="less" scoped>
.post-card {
  &-times {
    display: flex;
  }
}

@media screen and (max-width: 600px){
  .post-card {
    &-times {
      flex-direction: column;
    }
  }
}
</style>
