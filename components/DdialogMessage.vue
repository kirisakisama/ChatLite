<template>
    <div class="ddialogMessage">
        <div class="ddialogMessage-content" v-html="message">

        </div>
        <!-- <div class="ddialog-load">
            <div class="ddialog-load-box"></div>
        </div> -->
    </div>
</template>
<script setup lang="ts">
import { defineProps, ref, computed } from 'vue';
const props = defineProps<{
    by: "assistant" | "user"
    message: string
    //isLoad: boolean
}>()
const by = ref(props.by)
const message = ref(props.message)
//const isLoad = ref(props.isLoad)
const dr = computed(() => {
    return by.value == "assistant" ? "start" : "end"
})
</script>
<style>
.ddialogMessage {
    box-sizing: border-box;
    box-shadow: 1px 1px 3px #00000048;
    padding: 20px;
    max-width: 80%;
    margin-left: 10px;
    margin-right: 10px;
    background-color: #ffffff;
    border-radius: 5px;
    align-self: v-bind('dr');
    margin-bottom: 10px;
    margin-top: 10px;
}

.ddialogMessage-content {
    width: 100%;
    color: #101010;
    font-size: 20px;
    overflow-wrap: break-word;
}

think {
    display: block;
    color: #a4b0be;
    font-size: 15px;
}
</style>