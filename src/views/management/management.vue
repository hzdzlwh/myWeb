<template>
  <div class="management">
      <el-form>
          <el-form-item label="题目">
              <el-input v-model="title" type="text"></el-input>
          </el-form-item>
          <el-form-item label="分类">
              <el-input type="text" v-model="classify"></el-input>
          </el-form-item>
          <el-form-item label="正文">
              <el-input type="textarea" :rows="20" v-model="content"></el-input>
          </el-form-item>
          <el-form-item>
              <el-button size="small" type="primary" @click="onSubmit">提 交</el-button>
          </el-form-item>
      </el-form>
  </div>
</template>

<script>
import { addArticle } from '@/api/home.js';


export default {
    name: 'management',
    data() {
        return {
            title: '',
            classify: '',
            content: ''
        }
    },
    methods: {
        onSubmit() {
            const params = {
                title: this.title,
                content: this.content,
                classify: this.classify,
                createPerson: 'lwh',
                createTime: '2018-05-03'
            }
            addArticle({ params }).then(res => {
                console.log(res);
            })
        }
    }
}
</script>

<style lang="scss">
.wrapper{
    height: 500px;
    border: 1px solid #ccc;
    overflow: scroll;
    .content{
        width: 200px;
        height: 1000px;
        background: #ccc;
    }
}
</style>
