<template>
    <div class="password-wrapper">
        <h1>Change Password</h1>
        <small>Change Password</small>
        <el-form class="form-container" ref="formPassword" :model="password" label-width="200px">
            <el-row>
                <el-col :span="21">
                    <el-form-item label="Current Password" prop="currentP">
                        <el-input v-model="password.currentP"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="21">
                    <el-form-item label="Email" prop="email">
                        <el-input v-model="password.newP"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="21">
                    <el-form-item label="Profile" prop="Profile">
                        <el-input v-model="password.retypeP"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="21">
                    <el-form-item>
                        <el-button>Cancel</el-button>
                        <el-button type="primary" @click="onSubmit('')" >Change</el-button>                        
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>
<script>

export default {
  name: 'formPassword',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      password: {
        curretP: '',
        newP: '',
        retypeP: ''
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.password-wrapper{
    padding: 0 20px;    
}
h1{
    margin: 0;
}
</style>