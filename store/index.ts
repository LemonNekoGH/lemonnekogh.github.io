import { IContentDocument } from '@nuxt/content/types/content'

export type TagColorMap = {
  [tag: string]: string
}

export interface GlobalState {
  tags: string[]
  tagColorMap: TagColorMap
  posts: IContentDocument[]
}

export interface GlobalMutations {
  setTags (state: GlobalState, payload: string[]): void
  setTagColor (state: GlobalState, payload: TagColorMap): void
  setPosts (state: GlobalState, payload: IContentDocument[]): void
  [name: string]: (state: GlobalState, payload?: any) => any
}

export const state: () => GlobalState = () => {
  return {
    tags: [],
    tagColorMap: {},
    posts: []
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
  }
}
