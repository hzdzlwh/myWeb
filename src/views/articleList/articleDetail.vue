<template>
    <div class="article-detail">
        <h1>{{title}}</h1>
        <div>
            <p v-for="(item, index) in articleDetail" :key="index">
                {{item}}
            </p>
        </div>
    </div>
</template>

<script>
import {
    getArticleById
} from '@/api/home.js';

export default {
    name: 'articleDetail',
    data() {
        return {
            title: '',
            articleDetail: []
        }
    },
    created() {
        this.fetchData();
    },
    methods: {
        getArticleById(id) {
            getArticleById({ params: { id: id }}).then(res => {
                if (res.code === 1) {
                    this.title = res.data.title;
                    this.articleDetail = res.data.content.split('\n');
                }
            })
        },
        fetchData() {
            this.getArticleById(this.$route.query.id);
        }
    },
    watch: {
        '$route': 'fetchData'
    }
}
</script>

<style lang="scss">
.article-detail{
    width: 50%;
    margin: 0 auto;
    h1{
        padding: 10px 0;
        text-align: center;
    }
    p{
        font-size: 14px;
        text-indent: 2em;
        line-height: 30px;
        margin: 20px 0;
    }
}
</style>
