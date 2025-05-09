<script setup lang="ts">
import Ddialog from './components/Ddialog.vue';
import DdialogMessage from './components/DdialogMessage.vue';
import {ref,computed} from 'vue';
import { Marked } from 'marked';
interface Message{
  id:number;
  message:string;
  by: "assistant"|"user";
}
interface aMessage{
  role: "assistant" | "user";
  content: string;
}
interface DsRe{
  "model": "deepseek-r1:8b",
  "created_at": string,
  "message": {
      "role": "assistant",
      "content": string
  },
  "done": boolean
}
interface DdialogElement {
  scrollToBottom: () => void;
}
const useDdialog=ref<DdialogElement|null>(null);
const isLoad=ref<boolean>(false);
const inputDisabled=ref<boolean>(false);
const markedInstance = new Marked();
const inputKey=computed(()=>{if(inputDisabled.value) return 1 ;else return -1});
const renderer = {
  paragraph(text:{text:string}){
    let res=text.text
    let l=false,r=false
    if(res.length>=7 && res.slice(0,7)=="<think>")
        res=res.slice(7,res.length),l=true
    if(res.length>=8 && res.slice(-8)=="</think>")
        res=res.slice(0,res.length-8),r=true
    res='<p>'+res+'</p>'
    if(l) res="<think>"+res
    if(r) res=res+"</think>"
    return res;
}
}
markedInstance.use({renderer});
const messages=ref<Message[]>([
  {id:1,message:"我是deepseek，向我提问吧",by:"assistant"}
  ]);
function scrollToBottom(){
  if(useDdialog.value){
    //console.log(useDdialog.value.scrollToBottom);
    useDdialog.value.scrollToBottom();
    //console.log(action);
  }
}
async function chat(data:string,index:number): Promise<void> {
  isLoad.value=true;
  try{
    const response=await fetch('http://localhost:11434/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek-r1:8b',
        messages: messages.value.map(
          (message: Message) => {
            return {
              role: message.by,
              content: message.message
            }
          }
        )
      }),
    });
    if (!response.body) {
      throw new Error('Network response was not ok');
    }
    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');
    messages.value.push({id:1,message:'',by:"assistant"});
    while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    const ReJson :DsRe= JSON.parse(decoder.decode(value));
    messages.value[index-1].message+=ReJson.message.content;
    scrollToBottom();
    messages.value[index-1].id=-messages.value[index-1].id;
    }
    messages.value[index-1].message=markedInstance.parse(messages.value[index-1].message) as string;
    messages.value[index-1].id=index
    scrollToBottom();
  }catch(e){
    console.error(e);
  }finally{
    isLoad.value=false;
    inputDisabled.value=false;
  }
}
function send(data:string){
  inputDisabled.value=true;
  messages.value.push({id:messages.value.length+1,message:data,by:"user"});
  scrollToBottom();
  chat(data,messages.value.length+1);
}
</script>

<template>
  <div id="index">
    <Ddialog ref="useDdialog">
      <template v-for="value in messages" :key="value.id">
        <DdialogMessage :by="value.by" :message="value.message">
        </DdialogMessage>
      </template>
      <div class="ddialog-load" v-show="isLoad">
          <div class="ddialog-load-box"></div>
      </div>
    </Ddialog>
    <Dinput @send="send" :isDisabled="inputDisabled" :key="inputKey"></Dinput>
  </div>
</template>
<style scoped>
#index{
  width: 100%;
  height: 98vh;
  background-color: #f5f6fa;
}
.scrollContainer{
  width: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: start;
}
.ddialog-load{
    margin: 5px;
}
.ddialog-load-box {
    position: relative;
    width: 30px;
    height: 30px;
    border: 1px solid transparent;
    border-radius: 50%;
    border-top-color: aqua;
    animation: go 1s linear infinite;
}

.ddialog-load-box::before {
    position: absolute;
    content: '';
    display: block;
    top: 3px;
    left: 3px;
    right: 3px;
    bottom: 3px;
    border: 1px solid transparent;
    border-radius: 50%;
    border-top-color: #f368e0;
    animation: go 1.5s linear infinite;
}

.ddialog-load-box::after {
    position: absolute;
    content: '';
    display: block;
    top: 6px;
    left: 6px;
    right: 6px;
    bottom: 6px;
    border: 1px solid transparent;
    border-radius: 50%;
    border-top-color: #5f27cd;
    animation: go 2s linear infinite;
}

@keyframes go {
    0% {
        transform: rotate(0deg)
    }

    100% {
        transform: rotate(360deg)
    }
}
</style>