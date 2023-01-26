<template>
  <v-container>
    <div class="grid">
      <v-card
        v-for="data of cards"
        :key="data.url"
        elevation="4"
        :href="data.url"
        target="_blank">
        <v-img :src="data.imageUrl" :height="cardImgWidth" :width="cardImgWidth" />
        <v-card-title>{{ data.name }}</v-card-title>
      </v-card>
    </div>
  </v-container>
</template>
<script lang="ts">
import Vue from 'vue'

interface CardData {
  name: string
  imageUrl: string
  url: string
}

export default Vue.extend({
  data () {
    return {
      cards: [
        { name: 'NekoHit', imageUrl: 'https://www.nekohit.com/assets/images/cat-dark.png', url: 'https://www.nekohit.com' },
        { name: 'Arcucy', imageUrl: 'https://avatars.githubusercontent.com/u/73817556?s=200&v=4', url: 'https://github.com/Arcucy' },
        { name: 'ArcLight', imageUrl: '/images/arclight.png', url: 'https://arclight.arcucy.io' },
        { name: 'AyakaNeko', imageUrl: 'https://neko.ayaka.moe/img/avatar.jpg', url: 'https://neko.ayaka.moe/' },
        { name: '朵琳', imageUrl: 'http://blog.high-spirits.me/images/avatar.jpg', url: 'http://blog.high-spirits.me/' },
        { name: 'Remi IO 🦇', imageUrl: 'https://raw.githubusercontent.com/u-u-z/u-u-z/main/img/Remi_IO.JPG', url: 'https://linux.dog' }
      ] as CardData[]
    }
  },
  computed: {
    cardImgWidth (): string {
      switch (this.$vuetify.breakpoint.name) {
        case 'xl': return '280'
        case 'lg': return '280'
        case 'md': return '209'
        case 'sm': return '187'
        case 'xs': return String((this.$vuetify.breakpoint.width - 39) / 2)
        default: return '0'
      }
    }
  }
})
</script>
<style lang="less" scoped>
.grid {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}

/* xs */
@media screen and (max-width: 600px) {
  .grid {
    grid-template-columns: 1fr 1fr;
  }
}

/* sm */
@media screen and (max-width: 960px) {

}

/* md */
@media screen and (max-width: 1264px) {

}

/* lg */
@media screen and (max-width: 1904px) {

}

/* xl */
@media screen and (min-width: 1905px) {
  .grid {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
}
</style>
