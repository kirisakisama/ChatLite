// Create reference instance
import { marked } from 'marked';

// Override function
const renderer = {
  paragraph(text) {
    let res=text.text
    if(res.length>=7 && res.slice(0,7)=="<think>")
        res='<think><p>'+res.slice(7,res.length);
    if(res.length>=8 && res.slice(-8)=="</think>")
        res=res.slice(0,res.length-8)+'</p></think>';
    return res;
}
// ,
//   text(text) {
//     text=text.text
//     if(text.slice(0,7)=="<think>")
//         return '<think>'+text.slice(7,text.length-1);
//     if(text.slice(-8)=="</think>")
//         return text.slice(0,text.length-8)+'</think>';
//     return text;
//     // if (text.includes('<think>') && text.includes('</think>')) {
//     //     const startIndex = text.indexOf('<think>') + 7;
//     //     const endIndex = text.indexOf('</think>', startIndex);
//     //     if (endIndex !== -1) {
//     //       return `<think>${text.slice(startIndex, endIndex)}</think>`;
//     //     }
//     //   }
//     //   return text;
//}
};

marked.use({ renderer });

// Run marked
console.log(marked.parse('<think>dadwadadaddad</think>'));

/*
{
    head(){...}
}
{
    head=()=>{...}
}
*/