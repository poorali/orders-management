import {h, render} from "vue";
import {jsPDF} from "jspdf";

export const generate = (template: any, props: any) =>{
    return new Promise((resolve, reject) => {
        try{
            const div = document.createElement('div');
            div.style.fontSize= "10px"
            render(h(template, {...props}), div);
            const doc = new jsPDF('p','pt','a4');
            doc.html(div.innerHTML, {callback: (doc) => {
                    const blob = new Blob([doc.output()],{ type: 'application/pdf' })
                    resolve(URL.createObjectURL(blob))
                }})
        }catch (error){
            reject(error)
        }
    })
}