<template>
  <v-card outlined :href="data.path" :nuxt="true" rounded="lg">
    <v-card-title>{{ data.title }}</v-card-title>
    <v-card-subtitle>
      <div class="card-subtitle-tags">
        <div>{{ createTime }}</div>
      </div>
    </v-card-subtitle>
    <v-divider />
    <v-card-text>
      {{ data.description }}
    </v-card-text>
    <v-divider />
    <div class="tag-cloud">
      <v-card-text>
        <div class="tags">
          <div v-if="data.category" class="tag-container">
            <v-chip :nuxt="true" label outlined :to="'/category/' + data.category" color="primary">
              {{ data.category }}
            </v-chip>
          </div>
          <div v-for="tag of data.tags" :key="tag" class="tag-container">
            <v-chip :nuxt="true" label outlined :to="'/tag/' + tag" :color="tagColorMap[tag]">
              {{ tag }}
            </v-chip>
          </div>
          <div v-if="data.wip" class="tag-container">
            <v-chip label outlined color="error">
              <v-icon left>
                mdi-alert-rhombus
              </v-icon>
              尚未完成
            </v-chip>
          </div>
        </div>
      </v-card-text>
    </div>
  </v-card>
</template>
<script lang="ts">
import Vue from 'vue'
import { IContentDocument } from '@nuxt/content/types/content'
import moment from 'moment'
import { mapState } from 'vuex'

export default Vue.extend({
  props: {
    data: {
      type: Object as () => IContentDocument,
      required: true
    }
  },
  computed: {
    ...mapState(['tagColorMap']),
    createTime (): string {
      return moment(this.data.createTime).format('YYYY 年 MM 月 D 日 HH:mm:ss')
    }
  }
})
</script>
