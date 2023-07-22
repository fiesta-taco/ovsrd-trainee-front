<template >
  <div id="app" >
        <Board />
  </div>
</template>

<script>
import { defineComponent } from 'vue'

import Board from './components/Board.vue'
export default defineComponent({
  name: 'App',
  components: {
   Board,
  },
  data() {
    return {
      
    }
  }

}
)
</script>

<style src="./assets/trello.css">

</style>
