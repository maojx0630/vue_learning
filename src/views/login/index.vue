<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li
          v-for="item in menuTab"
          :key="item.id"
          :class="{'current' : item.current}"
          @click="toggleMneu()"
        >{{item.text}}</li>
      </ul>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        class="login-form"
        size="medium"
      >
        <el-form-item label prop="phone" class="item-form">
          <label>手机</label>
          <el-input maxlength="11" type="text" v-model="ruleForm.phone" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label prop="pass" class="item-form">
          <label>密码</label>
          <el-input maxlength="20" type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label prop="code" class="item-form">
          <label>验证码</label>
          <el-row :gutter="10">
            <el-col :span="15">
              <el-input maxlength="6" v-model.number="ruleForm.code"></el-input>
            </el-col>
            <el-col :span="9">
              <el-button class="block" type="success" @click="submitForm('ruleForm')">获取验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item>
          <el-button class="block login-btn" type="danger" @click="submitForm('ruleForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: "login",
  data() {
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机不能为空"));
      }
      setTimeout(() => {
        let reg = /^1[0-9]{10}$/;
        if (!reg.test(value)) {
          callback(new Error("请输入手机号"));
        } else {
          callback();
        }
      }, 1000);
    };
    var validatePass = (rule, value, callback) => {
      let reg = /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^[^\s\u4e00-\u9fa5]{8,20}$/;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (reg.test(value)) {
          callback();
        } else {
          callback(
            new Error(
              "请输入8-20位密码,数字、字母、字符至少包含两种,不能包含中文和空格"
            )
          );
        }
      }
    };
    var validateCode = (rule, value, callback) => {
      let reg = /^[0-9]{6}$/;
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else if (!reg.test(value)) {
        callback(new Error("验证码格式不符!"));
      } else {
        callback();
      }
    };
    return {
      menuTab: [
        { text: "登陆", current: true },
        { text: "注册", current: false }
      ],
      ruleForm: {
        phone: "",
        pass: "",
        code: ""
      },
      rules: {
        phone: [{ validator: checkPhone, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        code: [{ validator: validateCode, trigger: "blur" }]
      }
    };
  },
  created() {},
  mounted() {},
  methods: {
    toggleMneu() {
      this.menuTab[0].current = !this.menuTab[0].current;
      this.menuTab[1].current = !this.menuTab[1].current;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
#login {
  height: 100vh;
  background-color: #344a5f;
}
.login-wrap {
  width: 330px;
  margin: auto;
}
.menu-tab {
  text-align: center;
  li {
    display: inline-block;
    width: 88px;
    line-height: 36px;
    font-size: 14px;
    color: #fff;
    border-radius: 2px;
    cursor: pointer;
  }
  .current {
    background-color: rgba(0, 0, 0, 0.1);
  }
}
.login-form {
  margin-top: 29px;
  label {
    display: block;
    font-size: 14px;
    margin-bottom: 3px;
    color: #fff;
  }
  .item-form {
    margin-bottom: 13px;
  }
  .block {
    width: 100%;
    display: block;
  }
  .login-btn {
    margin-top: 19px;
  }
}
</style>
