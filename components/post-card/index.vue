<template>
  <v-card :to="data.path" :nuxt="true" elevation="4">
    <v-card-title>{{ data.title }}</v-card-title>
    <v-card-subtitle>
      <div class="card-subtitle-tags">
        <div>{{ createTime }}</div>
      </div>
    </v-card-subtitle>
    <v-card-text>
      {{ data.description }}
    </v-card-text>
    <div class="tag-cloud">
      <v-card-text>
        <div class="tags">
          <div v-if="data.category" class="tag-container">
            <v-btn
              elevation="0"
              :nuxt="true"
              dark
              :to="'/categories?active=' + data.category"
              color="primary"
              class="no-auto-uppercase">
              {{ data.category }}
            </v-btn>
          </div>
          <div v-for="tag of data.tags" :key="tag" class="tag-container">
            <v-btn
              elevation="0"
              :nuxt="true"
              dark
              :to="'/tags?active=' + tag"
              :color="tagColorMap[tag]"
              class="no-auto-uppercase">
              {{ tag }}
            </v-btn>
          </div>
          <div v-if="data.wip" class="tag-container">
            <v-btn dark color="error" class="no-auto-uppercase" elevation="0">
              <v-icon left>
                mdi-alert-rhombus
              </v-icon>
              尚未完成
            </v-btn>
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
