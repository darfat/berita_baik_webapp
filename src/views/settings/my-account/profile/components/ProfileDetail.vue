<template>
    <div class="profile-wrapper">
        <h1>Edit Profile</h1>
        <small>Edit Profile</small>
        <el-form class="form-container" ref="profileForm" :model="profile" :rules="rules" label-width="120px">
            <el-row>
                <el-col :span="21">
                    <el-form-item label="Full Name" prop="fullname">
                        <el-input v-model="profile.fullname"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="21">
                    <el-form-item label="Email" prop="email">
                        <el-input v-model="profile.email"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="21">
                    <el-form-item label="Profile" prop="Profile">
                        <el-input v-model="profile.bio"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="21">
                    <el-form-item label="Photo Path" prop="Photo Path">
                        <el-input v-model="profile.photopath"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="21">
                    <el-form-item label="Introduction" prop="Introduction">
                        <el-input v-model="profile.introduction"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="21">
                    <el-form-item label="Inisial" prop="Inisial">
                        <el-input v-model="profile.inisial"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="21">
                    <el-form-item label="NIK" prop="NIK">
                        <el-input v-model="profile.nik"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="21">
                    <el-form-item label="Rekening" prop="Rekening">
                        <el-input v-model="profile.rekening"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="21">
                    <el-form-item label="Bank" prop="Bank">
                        <el-input v-model="profile.bank"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="21">
                    <el-form-item>
                        <el-button>Cancel</el-button>
                        <el-button type="primary" @click="onSubmit('')" >Update</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>
<script>

export default {
  name: 'profileDetail',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      profile: {
        fullname: 'Full Name',
        email: 'email@gmail.com',
        bio: 'Lorem ipsum dolor sit amet, mei cu praesent euripidis, veri nobis eripuit eum id. An sea suscipit similique assueverit, ad consul sententiae sadipscing eos. Vis id verear perfecto, audire accusata ea quo. Mea ex magna deserunt, cu eruditi indoctum omittantur qui. Eos ex electram maiestatis reprimique, sed partem eloquentiam cu.',
        photopath: '',
        introsuction: '',
        inisial: '',
        nik: '',
        rekening: '',
        bank: ''
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.profile-wrapper{
    padding: 0 20px;
}
h1{
    margin: 0;
}
</style>