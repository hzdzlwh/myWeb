<template>
    <div class="layout">
        <div class="header">
            <router-link :to="{ path: '/' }">
                <img src="../../assets/logo.png" />
            </router-link>
            <ul id="nav">
                <li>
                    <el-input size="small" prefix-icon="el-icon-search" placeholder="请输入内容" v-model="search">
                    </el-input>
                    <div v-show="searchContentShow" class="search-content" v-clickoutside="close">
                        <ul>
                            <li v-for="(item) in searchList" :key="item.id" @click="articleDetail(item.id)">{{item.title}}</li>
                        </ul>
                    </div>
                </li>
                <li>
                    <router-link :to="{ path: '/articleList' }" :class="{current:$route.path === '/articleList'}">文章列表</router-link>
                </li>
                <li>
                    <router-link :to="{ path: '/management' }" :class="{current:$route.path === '/management'}">管理</router-link>
                </li>
            </ul>
            <div class="menu-button" @click.prevent="toggleMenuShow">
                <i class="el-icon-d-arrow-right"></i>
            </div>
        </div>
        <div class="content" :class="{main:$route.path !== '/home' }">
            <router-view></router-view>
        </div>
        <transition name="slide-fade">
            <div class="sidebar" v-if="menuShow" @click="toggleMenuShow">
                <h2>文章分类</h2>
                <el-menu
                  class="el-menu-vertical-demo"
                  @select="handleSelect">
                    <el-menu-item v-for="(classify,index) in articleList" :index="`${index}`" :key="index">{{`${classify.classify}(${classify.children.length})`}}</el-menu-item>
                </el-menu>
            </div>
        </transition>
        <el-dialog
            title=""
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">
            <el-form label-width="80px" :model="form" :rules="loginRules" ref="loginRules">
                <el-form-item label="用户名:" prop="userName">
                    <el-input size="small" type="text" v-model="form.userName" style="width:230px;"></el-input>
                </el-form-item>
                <el-form-item label="密码:" prop="password">
                    <el-input size="small" type="password" v-model="form.password" auto-complete="off" style="width:230px;"></el-input>
                </el-form-item>
            </el-form>
             <span slot="footer" class="dialog-footer">
                 <el-button size="small" style="width:230px;" type="primary" @click="handlLogin">登录</el-button>
             </span>
        </el-dialog>
    </div>
</template>

<script>
import clickoutside from '@/utils/clickoutside';
import {
    getArticleList,
    login
} from '@/api/home.js';
import { mapState, mapMutations } from 'vuex';

export default{
    name: 'layout',
    data() {
        return {
            search: '',
            searchContentShow: false,
            searchList: [],
            menuShow: false,
            articleList: [],
            form: {
                userName: '',
                password: ''
            },
            loginRules: {
                userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
            }
        }
    },
    created() {
        this.getArticleList();
    },
    computed: {
        ...mapState({
            dialogVisible: state => state.openDialog
        })
    },
    methods: {
        close() {
            this.searchContentShow = false;
        },
        articleDetail(id) {
            this.$router.push({ path: '/articleDetail', query: { id: id }});
            this.searchContentShow = false;
        },
        handleSearch() {
            if (this.search) {
                const reg = eval('/' + this.search + '/');
                this.searchList = [];
                this.articleList.forEach(classify => {
                    classify.children.forEach(article => {
                        if (reg.test(article.title)) {
                            if (!this.searchList.some(i => {
                                return i.id === article.id
                            })) {
                                this.searchList.push({ id: article.id, title: article.title });
                            }
                        }
                    });
                });
                if (this.searchList.length) this.searchContentShow = true;
            } else {
                this.searchContentShow = false;
            }
        },
        handlLogin() {
            this.$refs.loginRules.validate(valid => {
                if (valid) {
                    login({ params: { username: this.form.userName, password: this.form.password }}).then(res => {
                        if (res.code === 1) {
                            this.setLogin(true);
                            this.$router.push({ path: '/management' });
                            this.handleClose();
                        }
                    })
                }
            });

        },
        handleClose() {
            this.setOpenDialog(false);
        },
        handleSelect(index) {
            this.$router.push({ path: '/articleList', query: { classifyIndex: index }});
        },
        toggleMenuShow() {
            this.menuShow = !this.menuShow;
        },
        getArticleList() {
            getArticleList({ params: {}}).then(res => {
                if(res.code === 1) {
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
                }
            });
        },
        ...mapMutations({
            setOpenDialog: 'SET_OPENDIALOG',
            setLogin: 'SET_ISLOGIN'
        })
    },
    watch: {
        search() {
            this.handleSearch()
        }
    },
    directives: {
        'clickoutside': clickoutside
    }
}
</script>

<style lang="scss">
@media screen and (min-width:960px){
    .layout{
        .header{
            height: 60px;
            padding: 10px 60px;
            background: #fff;
            width: 100%;
            position: fixed;
            z-index: 100;
            box-shadow: 0 0 1px rgba(0,0,0,0.25);
            transition: background-color 0.3s ease-in-out;
            img{
                width: 40px;
                height: 40px;
                border-radius: 50%;
            }
            #nav{
                position: fixed;
                right: 30px;
                top: 10px;
                li{
                    display: inline-block;
                    margin: 0 10px;
                    .router-link-active{
                        border-bottom: 3px solid #42b983;
                    }
                    .search-content{
                        position: fixed;
                        width: 300px;
                        height: 300px;
                        margin-top: 12px;
                        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
                        z-index: 1000;
                        border-radius: 4px;
                        background: #fff;
                        &::after{
                            content: '';
                            display: inline-block;
                            width: 8px;
                            height: 8px;
                            border-top: 1px solid #ebeef5;
                            border-right: 1px solid #ebeef5;
                            transform: rotate(-45deg);
                            -webkit-transform: rotate(-45deg);
                            position: absolute;
                            top: -4px;
                            left: 30px;
                        }
                        ul{
                            padding: 10px 0;
                            li{
                                margin: 0;
                                padding: 6px;
                                display: block;
                                border-bottom: 1px solid #ebebeb;
                                font-size: 14px;
                                cursor: pointer;
                            }
                        }
                    }
                }
            }
            .menu-button{
                display: none;
            }
        }
        .content{
            padding: 60px 0 30px;
        }
        .main{
            padding: 60px 60px 30px;
        }
    }
}
@media screen and (max-width:600px){
    .layout{
        .header{
            height: 40px;
            width: 100%;
            position: fixed;
            z-index: 100;
            background: #fff;
            box-shadow: 0 0 1px rgba(0,0,0,0.25);
            transition: background-color 0.3s ease-in-out;
            a{
                position: absolute;
                top: 5px;
                left: 50%;
                margin-left: -15px;
                img{
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                }
            }
            #nav{
                display: none;
            }
            .menu-button{
                position: absolute;
                width: 24px;
                height: 24px;
                left: 12px;
                top: 8px;
            }
        }
        .content{
            padding: 40px 0 0;
        }
        .sidebar{
            position: fixed;
            height: 100%;
            width: 260px;
            background: #f9f9f9;
            z-index: 100;
            top: 0;
            left: 0;
            padding: 10px 0 0 10px;
            .el-menu-vertical-demo{
                background: #f9f9f9;
            }
        }
        .slide-fade-enter-active {
            transition: all .3s ease;
        }
        .slide-fade-leave-active {
            transition: all .3s ease;
        }
        .slide-fade-enter, .slide-fade-leave-to {
            transform: translateX(-260px);
        }
    }
}
.el-dialog__footer{
    text-align: center !important;
}
</style>
