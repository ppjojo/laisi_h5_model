<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img src="../../assets/logo.png" class="user-avatar">
          <span>{{userInfo.dname +" - "+ userInfo.realname}}</span>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <!-- <router-link to="/">
            <el-dropdown-item>
              主页
            </el-dropdown-item>
          </router-link> -->
          <el-dropdown-item @click.native="changePwd">
            <span style="display:block;">修改密码</span>
          </el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-dialog title="密码修改" :visible.sync="dialogVisible" width="50%" :show-close="false" :close-on-click-modal="false"	:close-on-press-escape="false">
      <pwd @dialogVisibleChange="dialogVisibleChange" ></pwd>
    </el-dialog>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Breadcrumb from '@/components/Breadcrumb'
  import Hamburger from '@/components/Hamburger'
  import { getUInfo } from '@/utils/auth'
  import Pwd from "@/views/login/pwd.vue";

  export default {
    components: {
      Breadcrumb,
      Hamburger,
      Pwd
    },
    computed: {
      ...mapGetters([
        'sidebar',
        'avatar'
      ]),
      fullScreen() {
        return this.$store.state.settings.fullScreen
      },
    },
    data() {
      return {
        userInfo: {},
        dialogVisible: false,
        md5Pwd: ""
      }
    },
    created() {
      this.userInfo = JSON.parse(getUInfo())
    },
    mounted(){
     
    },
    methods: {
      toggleSideBar() {
        this.$store.dispatch('app/toggleSideBar')
      },
      async logout() {
        await this.$store.dispatch('user/logout')
        this.$router.push("/login")
        //this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      },
      changePwd() {
        this.dialogVisible=true
      },
      dialogVisibleChange(){
        this.dialogVisible=false
      }
    }
  }
</script>

<style lang="scss" scoped>
  .navbar {
    height: 50px;
    overflow: hidden;
    position: relative;
    background: #fff;
    border-bottom: 1px solid rgba(0, 21, 41, .08);
    ;
    box-shadow: 0 1px 4px rgba(0, 21, 41, .08);
    /* position: fixed;
  top: 0;
  z-index: 999; */

    .hamburger-container {
      line-height: 46px;
      height: 100%;
      float: left;
      cursor: pointer;
      transition: background .3s;
      -webkit-tap-highlight-color: transparent;

      &:hover {
        background: rgba(0, 0, 0, .025)
      }
    }

    .breadcrumb-container {
      float: left;
    }

    .right-menu {
      float: right;
      height: 100%;
      line-height: 50px;

      &:focus {
        outline: none;
      }

      .right-menu-item {
        display: inline-block;
        padding: 0 8px;
        height: 100%;
        font-size: 18px;
        color: #5a5e66;
        vertical-align: text-bottom;

        &.hover-effect {
          cursor: pointer;
          transition: background .3s;

          &:hover {
            background: rgba(0, 0, 0, .025)
          }
        }
      }

      .avatar-container {
        margin-right: 30px;

        .avatar-wrapper {
          margin-top: 5px;
          position: relative;
          display: flex;

          .user-avatar {
            cursor: pointer;
            width: 40px;
            height: 40px;
            border-radius: 10px;
            margin-right: 5px;
          }

          .el-icon-caret-bottom {
            cursor: pointer;
            position: absolute;
            right: -20px;
            top: 15px;
            font-size: 18px;
          }
        }
      }
    }
  }
</style>