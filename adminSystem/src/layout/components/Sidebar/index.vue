<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu :default-active="activeMenu" :collapse="isCollapse" :background-color="variables.menuBg"
        :text-color="variables.menuText" :unique-opened="false" :active-text-color="variables.menuActiveText"
        :collapse-transition="false" mode="vertical">
        <sidebar-item v-for="route in realRoute" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>

</template>

<script>
  import { mapGetters } from 'vuex'
  import Logo from './Logo'
  import SidebarItem from './SidebarItem'
  import variables from '@/styles/variables.scss'
  import { getUInfo } from '@/utils/auth'
  import { menuPermissonByUserId } from '@/api/permission/menu'
  import { router, resetRouter, constantRoutes } from '../../../router';


  export default {
    components: { SidebarItem, Logo },
    computed: {
      ...mapGetters([
        'sidebar'
      ]),
      fullScreen() {
        return this.$store.state.settings.fullScreen
      },
      // routes() {
      //   console.log(this.$router.options.routes)
      //   return this.$router.options.routes
      // },
      activeMenu() {
        const route = this.$route
        const { meta, path } = route
        // if set path, the sidebar will highlight the path you set
        if (meta.activeMenu) {
          return meta.activeMenu
        }
        return path
      },
      showLogo() {
        return this.$store.state.settings.sidebarLogo
      },
      variables() {
        return variables
      },
      isCollapse() {
        return !this.sidebar.opened
      },

    },
    data() {
      return {
        realRoute: {}
      }
    },
    created() {
      this.getMenuRouter()
    },
    methods: {
      getMenuRouter() {
        this.realRoute = []
        var r = constantRoutes
        menuPermissonByUserId({
          userId: JSON.parse(getUInfo()).id
        }).then(response => {
          sessionStorage.setItem("Laisi_menu", JSON.stringify(response.data))
          var menuList = response.data;

          //权限处理
          let forRouter = (arr) => {
            arr.forEach(item => {
              if (item.permission) {
                item.hidden = true
                menuList.forEach(mitem => {
                  if (item.permission == mitem.permission) {
                    item.sort = mitem.sort
                    item.hidden = false
                    if (item.meta) {
                      item.meta.title = mitem.name
                    }
                  }
                })
              }
              if (item.children) {
                forRouter(item.children);
              }
            });
          }
          forRouter(r)

          //排序
          let menuSort = (arr) => {
            arr.sort(function (a, b) {
              let x = a["sort"]
              let y = b["sort"]
              return ((x < y) ? -1 : (x > y) ? 1 : 0)
            })

            arr.forEach(item => {
              if (item.children) {
                menuSort(item.children);
              }
            });
          }

          menuSort(r)

          this.realRoute = r
          resetRouter(r)


        })


      }
    }
  }
</script>