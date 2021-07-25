import { IContentDocument } from '@nuxt/content/types/content'
import lodash from 'lodash'
import moment from 'moment'

export type TagColorMap = {
  [tag: string]: string
}

export type PostArchive = {
  [p: string]: IContentDocument[]
}

export interface GlobalState {
  tags: string[]
  tagColorMap: TagColorMap
  posts: IContentDocument[]
  categories: string[]
}

export interface GlobalMutations {
  setTags (state: GlobalState, payload: string[]): void
  setTagColor (state: GlobalState, payload: TagColorMap): void
  setPosts (state: GlobalState, payload: IContentDocument[]): void
  setCategories (state: GlobalState, payload: string[]): void
  [name: string]: (state: GlobalState, payload?: any) => any
}

export interface GlobalGetters {
  postsByMonth(state: GlobalState): PostArchive
}

export const state: () => GlobalState = () => {
  return {
    tags: [],
    tagColorMap: {},
    posts: [],
    categories: []
  }
}

export const mutations: GlobalMutations = {
  setTags (state: GlobalState, payload: string[]) {
    state.tags = payload
  },
  setTagColor (state: GlobalState, payload: TagColorMap) {
    Object.keys(payload).forEach((key) => {
      state.tagColorMap[key] = payload[key]
    })
  },
  setPosts (state: GlobalState, payload: IContentDocument[]) {
    state.posts = payload
  },
  setCategories (state: GlobalState, payload: string[]) {
    state.categories = payload
  }
}

export const getters: GlobalGetters = {
  postsByMonth (state: GlobalState): PostArchive {
    const ret: PostArchive = {}
    state.posts.forEach((it) => {
      const date = moment(it.createTime).format('YYYY 年 M 月')
      if (!lodash.includes(Object.keys(ret), date)) {
        ret[date] = [it]
      } else {
        ret[date].push(it)
      }
    })
    return ret
  }
}
