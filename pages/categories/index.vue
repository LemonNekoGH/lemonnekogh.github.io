<template>
  <v-container>
    <v-row>
      <v-col>
        <tags-and-categories show-type="categories" />
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts">
import Vue from 'vue'
import TagsAndCategories from '@/components/tags-and-categories/index.vue'

export default Vue.extend({
  components: {
    TagsAndCategories
  }
})
</script>
<style lang="less" scoped></style>
