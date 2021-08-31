<template>
  <div class="posts-container">
    <div class="posts-column">
    <post-card-el
      v-for="item in posts"
      :key="item.path"
      justify="center"
      :dense="$vuetify.breakpoint.mobile"
      :data="item"
    />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import PostCardEl from "@/components/post-card-el/index.vue";
import { mapState } from "vuex";

export default Vue.extend({
  components: {
    PostCardEl,
  },
  computed: {
    ...mapState(["tags", "posts"]),
  },
});
</script>
<style scoped lang="less">
.posts-container {
  display: flex;
  justify-content: center;
}
.posts-column {
  padding: 20px 0 20px 0;
  max-width: 1220px;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
}
</style>
