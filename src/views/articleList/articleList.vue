<template>
    <div class="article-list">
        <div class="siderbar">
            <div class="siderbar-inner">
                <el-menu
                  :default-active="currentIndex"
                  class="el-menu-vertical-demo"
                  @select="handleSelect">
                    <el-menu-item v-for="(classify,index) in articleList" :index="`${index}`" :key="index">{{`${classify.classify}(${classify.children.length})`}}</el-menu-item>
                </el-menu>
            </div>
        </div>
        <div class="article-content" ref="listWrapper">
            <ul>
                <li v-for="(classify, index) in articleList" class="classify-item" :key="index">
                    <h2>{{classify.classify}}</h2>
                    <ul>
                        <li v-for="article in classify.children" @click="articleDetail(article.id)" :key="article.id">
                            <h3>{{article.title}}</h3>
                            <div>
                                {{article.content}}
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import {
    getArticleList
} from '@/api/home.js';

export default {
    name: 'articleList',
    data() {
        return {
            articleList: [],
            scrollY: 0,
            listHeight: [],
            scrollHeight: 0,
            classifyIndex: 0
        }
    },
    created() {
        this.getArticleList();
        if (this.$route.query.classifyIndex) {
            this.handleSelect(this.$route.query.classifyIndex);
        }
    },
    mounted() {
        window.addEventListener('scroll', () => {
            this.scrollY = document.documentElement.scrollTop;
        });
    },
    computed: {
        currentIndex() {
            for(let i = 0; i < this.listHeight.length; i++) {
              let height1 = this.listHeight[i];
              let height2 = this.listHeight[i+1];
              if(!height2 || (this.scrollY >= height1 && this.scrollY < height2)){
                return i.toString();
              }
            }
            return '0';
        }
    },
    methods: {
        articleDetail(id) {
            this.$router.push({ path: '/articleDetail', query: { id: id }});
        },
        calculateHeight() {
            let classifyList = this.$refs.listWrapper.getElementsByClassName('classify-item');
            let height = 0;
            this.listHeight.push(height);
            for(let i = 0; i < classifyList.length; i++) {
                let item = classifyList[i];
                height += item.clientHeight;
                this.listHeight.push(height);
            }
        },
        handleSelect(index) {
            if (index > this.classifyIndex) {
                clearTimeout(this.timer);
                this.classifyIndex = index;
                this.timer = setInterval(() => {
                    if (this.scrollHeight >=  this.listHeight[index]) {
                        clearTimeout(this.timer);
                        document.documentElement.scrollTop = this.listHeight[index];
                        this.scrollHeight = this.listHeight[index];
                    } else {
                        document.documentElement.scrollTop = this.scrollHeight;
                        this.scrollHeight += 20;
                    }
                }, 10);
            } else {
                clearTimeout(this.timer);
                this.classifyIndex = index;
                this.timer = setInterval(() => {
                    if (this.scrollHeight <=  this.listHeight[index]) {
                        clearTimeout(this.timer);
                        document.documentElement.scrollTop = this.listHeight[index];
                        this.scrollHeight = this.listHeight[index];
                    } else {
                        document.documentElement.scrollTop = this.scrollHeight;
                        this.scrollHeight -= 20;
                    }
                }, 10);
            }

        },
        getArticleList() {
            getArticleList({ params: {}}).then(res => {
                if (res.code === 1) {
                    res.data.forEach(article => {
                        let findIndex = this.articleList.findIndex(e => {
                            return e.classify === article.classify;
                        })
                        if (findIndex > -1) {
                            this.articleList[findIndex].children.push(article);
                        } else {
                            this.articleList.push({ classify: article.classify, children: [article]});
                        }
                    });
                    this.$nextTick(() => {
                        this.calculateHeight();
                    });
                }
            });
        },
        scrollPage() {
            this.handleSelect(this.$route.query.classifyIndex);
        }
    },
    watch: {
        '$route': 'scrollPage'
    }
}
</script>

<style lang="scss" scoped>
@media screen and (min-width:960px) {
    .article-list{
        .siderbar{
            position: fixed;
            width: 200px;
        }
        .article-content{
            margin-left: 200px;
            padding: 0px 60px 0px;
            > ul > li > ul > li{
                border-bottom: 1px solid #ccc;
                cursor: pointer;
            }
            ul {
                h2{
                    padding: 10px 0;
                    background-color: #f5f5f5;
                    border-bottom: 1px solid #ccc;
                }
                h3{
                    padding: 10px 0;
                }
                div{
                    font-size: 14px;
                    padding-bottom: 10px;
                    height: 32px;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                }
            }
        }
    }
}
@media screen and (max-width:600px){
    .article-list{
        .siderbar{
            display: none;
        }
        .article-content{
            > ul > li > ul > li{
                border-bottom: 1px solid #ccc;
                cursor: pointer;
            }
            ul {
                h2{
                    padding: 10px;
                    background-color: #f5f5f5;
                    border-bottom: 1px solid #ccc;
                }
                h3{
                    padding: 10px;
                }
                div {
                    padding: 10px;
                    height: 32px;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                }
            }
        }
    }
}
</style>
