<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import { fullscreen } from 'fullscreen-proxy'
import { ref } from 'vue'
const visible = ref(false)
const dom = ref(null)
async function change() {
  await fullscreen(dom.value as any,document.querySelectorAll('.el-popper'))
}
</script>

<template>
  <section class="container" ref="dom"> <button @click="change()">click</button>
    <el-popover placement="top-start" title="Title" :width="200" trigger="hover" 
      content="this is content, this is content, this is content"> <template #reference>
        <el-button class="m-2">Hover to activate</el-button>
      </template>
    </el-popover>
    <el-popover
    :visible="visible"
    placement="bottom"
    title="Title"
    :width="200"
    content="this is content, this is content, this is content"
  >
    <template #reference>
      <el-button class="m-2" @click="visible = !visible"
        >Manual to activate</el-button
      >
    </template>
  </el-popover>
  </section>

  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.container {
  background-color: rgb(244, 182, 102);
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
