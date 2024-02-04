<template>
  <div>
    <topbar></topbar>
    <logobar></logobar>
    <router-view></router-view>
    <bottombar></bottombar>
  </div>
</template>

<script>
//TODO:页面跳转更新bug
import Bottombar from '@/components/Bottombar.vue'
import Topbar from '@/components/Topbar.vue'
import Logobar from '@/components/Logobar.vue'
export default {
    components:{Topbar,Logobar,Bottombar}
}
</script>

<style lang="scss" scoped>

</style>
