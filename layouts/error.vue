<template>
  <v-container>
    <div v-if="error.statusCode === 404" class="card-404-container">
      <div class="card-404">
        <div>
          404
        </div>
        <div class="card-404-text">
          页面被猫咪吃掉了
        </div>
        <v-btn outlined color="accent1" class="btn-back" :nuxt="true" href="/">
          返回首页
        </v-btn>
      </div>
    </div>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred'
    }
  }
})
</script>

<style scoped lang="less">
@import "../assets/css/main.less";

h1 {
  font-size: 20px;
}

.card-404 {
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  color: @accent1;
  font-weight: 500;
  height: 300px;
  font-size: 96px;
  padding: 10px;

  &-text {
    font-size: 24px;
  }

  &-container {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .btn-back {
    margin-top: 20px;
  }
}
</style>
