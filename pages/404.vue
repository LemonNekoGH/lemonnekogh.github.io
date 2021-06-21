<template>
  <div class="card-404-container">
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
</template>
<style lang="less" scoped>
@import "../assets/css/main.less";

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
