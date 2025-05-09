<template>
    <div class="ddialog" ref="scrollContainer">
        <slot></slot>
    </div>
</template>
<script setup lang="ts">
import {ref,defineExpose} from 'vue';
const scrollContainer=ref<HTMLElement|null>(null);
function scrollToBottom(){
  if(scrollContainer.value){
    scrollContainer.value.scrollTop=scrollContainer.value.scrollHeight;
  }
}
defineExpose({scrollToBottom})
</script>
<style scoped>
.ddialog {
    width: 100%;
    height: 80%;
    margin: auto;
    background-color: #00000000;
    display: flex;
    flex-direction: column;
    align-items: start;
    overflow-y: auto;
}
</style>