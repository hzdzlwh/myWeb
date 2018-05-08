<template>
    <div class="home">
        <div v-if="isPc" class="container">
            <div class="pic-wrapper" v-for="(pic, index) in picUrlList" :key="index" @click="moveAndScale(index)" :style="{width:`${pic.width}%`,left:`${pic.left}%`,top:`${pic.top}%`,transform:`rotate(${pic.rotate}deg)`,zIndex:pic.zIndex}">
                <img class="image" v-bind:src="pic.src" />
            </div>
        </div>
        <div v-else class="container-phone">
            <div v-for="(pic, index) in picUrlList" :key="index" class="pic-wrapper">
                <img class="image" v-bind:src="pic.src" />
                <h4>{{pic.date}}</h4>
            </div>
        </div>
        <!-- <el-button @click="addArticle">add article</el-button>
        <el-button @click="deleteArticle">delete article</el-button>
        <el-button @click="getArticleById">find by Id</el-button>
        <el-button @click="articleUpdate">update article</el-button>
        <el-button @click="findArticleByClassify">find article by classify</el-button> -->
    </div>
</template>

<script>
import {
    addArticle,
    deleteArticle,
    getArticleById,
    articleUpdate,
    findArticleByClassify
} from '@/api/home.js';
import onepic0 from '../../assets/onepic0.jpeg';
import onepic1 from '../../assets/onepic1.jpeg';
import onepic2 from '../../assets/onepic2.jpeg';
import onepic3 from '../../assets/onepic3.jpeg';
import onepic4 from '../../assets/onepic4.jpeg';
import onepic5 from '../../assets/onepic5.jpeg';
import onepic6 from '../../assets/onepic6.jpeg';
import onepic7 from '../../assets/onepic7.jpeg';
import onepic8 from '../../assets/onepic8.jpeg';
import onepic9 from '../../assets/onepic9.jpeg';
import onepic10 from '../../assets/onepic10.jpeg';
import onepic11 from '../../assets/onepic11.jpeg';
import onepic12 from '../../assets/onepic12.jpeg';

export default {
    name: 'home',
    data() {
        return {
            picUrlList: [
                { src: onepic0, left: 5, top: 6, rotate: 10, width: 16, zIndex: 99, date: '2018/05/03' },
                { src: onepic1, left: 23, top: 8, rotate: -15, width: 16, zIndex: 99, date: '2018/05/03' },
                { src: onepic2, left: 45, top: 5, rotate: 35, width: 16, zIndex: 99, date: '2018/05/03' },
                { src: onepic3, left: 65, top: 8, rotate: -35, width: 16, zIndex: 99, date: '2018/05/03' },
                { src: onepic4, left: 80, top: 10, rotate: 45, width: 16, zIndex: 99, date: '2018/05/03' },
                { src: onepic5, left: 5, top: 36, rotate: -30, width: 16, zIndex: 99, date: '2018/05/03' },
                { src: onepic6, left: 24, top: 36, rotate: 20, width: 16, zIndex: 99, date: '2018/05/03' },
                { src: onepic7, left: 30, top: 20, rotate: 0, width: 40, zIndex: 100, date: '2018/05/03' },
                { src: onepic8, left: 75, top: 46, rotate: -30, width: 16, zIndex: 99, date: '2018/05/03' },
                { src: onepic9, left: 4, top: 70, rotate: 30, width: 16, zIndex: 99, date: '2018/05/03' },
                { src: onepic10,left: 24, top: 70, rotate: 20, width: 16, zIndex: 99, date: '2018/05/03'  },
                { src: onepic11, left: 54, top: 70, rotate: -10, width: 16, zIndex: 99, date: '2018/05/03' },
                { src: onepic12, left: 78, top: 70, rotate: 55, width: 16, zIndex: 99, date: '2018/05/03' },
            ],
            preIndex: 7,
            isPc: true
        }
    },
    created() {
        console.log(navigator.userAgent);
        if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
            this.isPc = false;
        }
    },
    methods: {
        moveAndScale(index) {
            const tempLeft = this.picUrlList[this.preIndex].left;
            const tempTop = this.picUrlList[this.preIndex].top;
            const tempwidth = this.picUrlList[this.preIndex].width;
            const tempRotate = this.picUrlList[this.preIndex].rotate;
            const tempZIndex = this.picUrlList[this.preIndex].zIndex;
            this.picUrlList[this.preIndex].left = this.picUrlList[index].left;
            this.picUrlList[this.preIndex].top = this.picUrlList[index].top;
            this.picUrlList[this.preIndex].width = this.picUrlList[index].width;
            this.picUrlList[this.preIndex].rotate = this.picUrlList[index].rotate;
            this.picUrlList[this.preIndex].zIndex = this.picUrlList[index].zIndex;
            this.picUrlList[index].left = tempLeft;
            this.picUrlList[index].top = tempTop;
            this.picUrlList[index].width = tempwidth;
            this.picUrlList[index].rotate = tempRotate;
            this.picUrlList[index].zIndex = tempZIndex;
            this.preIndex = index;
        },
        addArticle() {
            const params = {
                title: '今天是个好日子',
                content: '欢天喜地过大年',
                classify: '杂谈',
                createPerson: 'l',
                createTime: '2018-04-26'
            }
            addArticle({ params }).then(res => {
                console.log(res);
            })
        },
        deleteArticle() {
            deleteArticle({ params: { id: 61 }}).then(res => {
                console.log(res);
            })
        },
        getArticleById() {
            getArticleById({ params: { id: 50 }}).then(res => {
                console.log(res);
            })
        },
        articleUpdate() {
            const params = {
                id: 52,
                title: 'asdfasd',
                content: '诶',
                classify: '杂谈',
                createPerson: 'asdf',
                createTime: '9999'
            }
            articleUpdate({ params }).then(res => {
                console.log(res);
            })
        },
        findArticleByClassify() {
            const params = { classify: '杂谈' };
            findArticleByClassify({ params }).then(res => {
                console.log(res);
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.home{
    .container{
        position: fixed;
        height: 100%;
        width: 100%;
        .pic-wrapper{
            position: absolute;
            cursor: pointer;
            transition: all .5s;
            -webkit-transition: all .5s;
            .image{
                width: 100%;
                transition: all .5s;
                -webkit-transition: all .5s;
            }
            &:nth-child(8) {
                left: 30%;
                cursor: default;
            }
            :hover{
                transform: scale(1.2);
            }
        }

    }
    .container-phone{
        .pic-wrapper{
            height: 310px;
            width: 100%;
            border: 1px solid #ccc;
            .image{
                width: 100%;
            }
            h4{
                text-align: center;
            }
        }
    }
}
</style>
