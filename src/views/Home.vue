<template>
  <div>
    <topbar></topbar>
    <logobar></logobar>
    <bottombar></bottombar>
  </div>
</template>

<script>
import Bottombar from '@/components/Bottombar.vue'
import Topbar from '@/components/Topbar.vue'
import Logobar from '@/components/Logobar.vue'
export default {
    components:{Topbar,Logobar,Bottombar}
}
</script>

<style lang="scss" scoped>

</style>
