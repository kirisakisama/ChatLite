<template>
    <div class="dinput">
        <textarea :class="{'dinput-textarea':true,inDisabled:isDisabled}" v-model="input" @keyup.enter="send()" :disabled="isDisabled"></textarea>
        <button :class="{'send':true,inDisabled:isDisabled}" @click="send()" :disabled="isDisabled"><img src="@/icons/send.png" draggable="false"></button>
    </div>
</template>
<script setup lang="ts">
import { ref,defineEmits,defineProps } from 'vue';
const input = ref<string>('');
const emit=defineEmits<{(e: 'send', data: string): void}>();
const props=defineProps<{isDisabled:boolean}>();
const isDisabled=ref<boolean>(props.isDisabled);
function send(){
    if(input.value==='') return;
    emit('send',input.value);
    input.value='';
}
</script>
<style scoped>
.dinput{
    box-sizing: border-box;
    padding: 10px;
    display: flex;
    width: 100%;
}
.dinput-textarea {
    resize: none;
    outline: none;
    width: calc(100% - 130px);
    height: 100px;
    box-sizing: border-box;
    padding: 10px;
    font-size: 30px;
    border-radius: 10px;
    border: 1px solid #00000011;
    margin-left: 5px;
}
.send{
    width: 100px;
    height: 100px;
    margin-left: 20px;
    padding: 0;
    border: 1px solid #00000011;
    border-radius: 50%;
    overflow: hidden;
    background-color: #00000000;
    cursor: pointer;
}
.send img{
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.inDisabled{
    filter: grayscale(0.5);
    background-color: #c8d6e5;
    cursor: not-allowed;
}
</style>