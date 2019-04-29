<template>
  <div class="app-container">
	  <h2>欢迎使用金宇PCR请验系统</h2>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',

  data() {
    return {
 
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() {
    if (!this.roles) {
    
    }
  }
}
</script>
