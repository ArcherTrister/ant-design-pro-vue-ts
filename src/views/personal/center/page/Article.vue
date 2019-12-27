<template>
  <a-list size="large" rowKey="id" :loading="loading" item-layout="vertical" :data-source="data">
    <a-list-item :key="item.id" slot="renderItem" slot-scope="item">
      <template slot="actions">
        <icon-text type="star-o" :text="item.star" />
        <icon-text type="like-o" :text="item.like" />
        <icon-text type="message" :text="item.message" />
      </template>
      <a-list-item-meta>
        <a slot="title" href="https://vue.ant.design/">{{ item.title }}</a>
        <template slot="description">
          <span>
            <a-tag>Ant Design</a-tag>
            <a-tag>设计语言</a-tag>
            <a-tag>蚂蚁金服</a-tag>
          </span>
        </template>
      </a-list-item-meta>
      <article-list-content
        :description="item.description"
        :owner="item.owner"
        :avatar="item.avatar"
        :href="item.href"
        :update-at="item.updatedAt"
      />
    </a-list-item>
    <div slot="footer" v-if="data.length > 0" style="text-align: center; margin-top: 16px;">
      <a-button @click="loadMore" :loading="loadingMore">
        加载更多
      </a-button>
    </div>
  </a-list>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ArticleListContent } from '@/components'
import IconText from '@/views/list/search/components/IconText.vue'

@Component({
  name: 'Article',
  components: {
    IconText,
    ArticleListContent
  }
})
export default class Article extends Vue {
  // data
  private loading: boolean = true
  private loadingMore: boolean = false
  private data: any[] = []

  constructor() {
    super()
  }

  mounted() {
    this.getList()
  }

  // methods
  getList() {
    this.$http.get('/list/article').then((res: any) => {
      console.log('res', res)
      this.data = res.result
      this.loading = false
    })
  }
  loadMore() {
    this.loadingMore = true
    this.$http
      .get('/list/article')
      .then((res: any) => {
        this.data = this.data.concat(res.result)
      })
      .finally(() => {
        this.loadingMore = false
      })
  }
}
</script>

<style scoped></style>
