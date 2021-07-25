<template>
  <v-card class="tag-cloud" elevation="4">
    <v-card-title>{{ showType === 'tags' ? '标签' : '分类' }}</v-card-title>
    <v-card-text>
      <div v-if="showType === 'tags'" class="tags">
        <div v-for="tag of tags" :key="tag" class="tag-container">
          <v-btn
            dark
            elevation="0"
            class="no-auto-uppercase"
            :color="tagColorMap[tag]"
            @click="$router.push('/tags?active=' + tag)">
            <v-icon v-if="$route.query.active === tag" left>
              mdi-check
            </v-icon>
            {{ tag }}
          </v-btn>
        </div>
      </div>
      <div v-else class="tags">
        <div v-for="tag of categories" :key="tag" class="tag-container">
          <v-btn
            dark
            elevation="0"
            class="no-auto-uppercase"
            color="primary"
            @click="$router.push('/categories?active=' + tag)">
            <v-icon v-if="$route.query.active === tag" left>
              mdi-check
            </v-icon>
            {{ tag }}
          </v-btn>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({
  props: {
    showType: {
      type: String,
      required: false,
      default: 'tags'
    }
  },
  computed: {
    ...mapState(['tagColorMap', 'tags', 'categories'])
  }
})
</script>
