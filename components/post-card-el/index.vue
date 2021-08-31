<template>
  <div class="post-card">
    <div class="post-card-title">{{ data.title }}</div>
    <div class="post-card-info">{{ createTime }}</div>
    <div class="post-card-description">{{ data.description }}</div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { IContentDocument } from "@nuxt/content/types/content";
import moment from "moment";
import { mapState } from "vuex";

export default Vue.extend({
  props: {
    data: {
      type: Object as () => IContentDocument,
      required: true,
    },
  },
  computed: {
    ...mapState(["tagColorMap"]),
    createTime(): string {
      return moment(this.data.createTime).format("YYYY 年 MM 月 D 日 HH:mm:ss");
    },
  },
});
</script>
<style scoped lang="less">
@import "../../assets/css/main.less";
.post-card {
  transition: all 250ms;
  border: black 2px solid;
  box-sizing: border-box;
  padding: 20px;
  mix-blend-mode: difference;

  &-title {
    font-size: 20px;
    font-weight: bold;
  }
  &-description {
    margin-top: 20px;
    font-size: 14px;
  }
  &-info {
    margin-top: 10px;
    font-size: 14px;
  }

  &:hover {
    border-left-width: 10px;
  }
}
</style>