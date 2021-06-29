<template>
  <v-row>
    <v-col>
      <v-card outlined rounded="lg" class="tag-cloud">
        <v-card-title>标签云</v-card-title>
        <v-divider />
        <v-card-text>
          <div class="tags">
            <div v-for="tag of tags" :key="tag" class="tag-container">
              <v-chip :nuxt="true" label outlined :to="'/tag/' + tag" :color="tagColorMap[tag]">
                {{ tag }}
              </v-chip>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
export default Vue.extend({
  computed: {
    ...mapState(['tagColorMap', 'tags'])
  }
})
</script>
