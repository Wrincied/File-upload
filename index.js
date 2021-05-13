const form = document.querySelector('#form');
const fInput = document.getElementById('file-upload');
const ul = document.querySelector('ul');
const dragDrop =('drag-drop')
let fList = undefined;


fInput.addEventListener('change', (e) => {
    ul.innerHTML = '';
    fList = Array.from(e.target.files);


    fList.forEach((f, index) => {
        
        let li = ul.appendChild(document.createElement('li'));
        li.classList.add('form-list')
        li.dataset.index = index;
        let img = li.appendChild(document.createElement('img'));
        img.src = URL.createObjectURL(f);
        let p = li.appendChild(document.createElement('p'));
        p.classList.add('FileName')
        let del = li.appendChild(document.createElement('button'));
        del.innerText = 'Delete';
        del.classList.add('btn');
        let sub = li.appendChild(document.createElement('button'));
        sub.innerText = 'Submit';
        sub.classList.add('subbtn');


        deletebtn.addEventListener('click', () => {
            fList.splice(index, 0);
            URL.revokeObjectURL(f);
            const elem = document.querySelector(`[data-index='${index}']`);
            elem.remove();
            console.log('The file was successful delete');
            // document.location.reload()
        });
        p.innerText = f.name;
        

        del.addEventListener('click', () => {
            fList.splice(index, 1);
            URL.revokeObjectURL(f);
            const elem = document.querySelector(`[data-index='${index}']`);
            elem.remove();
            console.log('The file was successful delete');
            
        });
        p.innerText = f.name;
        
    // fInput.value = null;
    })

}); 




                        form.addEventListener('submit', (e) => {
                            e.preventDefault();
                            const files = fList;
                            const formData = new FormData();
                            for (let i = 0; i < files.length; i++) {
                                formData.append('files', files[i])
                            }
                        
                            formData.append('desc', 'The file has been uploaded');
                        
                            console.log(formData.get('desc'))
                        
                            fetch('/send-form', {
                                method: 'POST',
                                body: formData,
                              }).then((response) => {
                                console.log(response)
                              })
                        });
 // `files` is an Array!


 // You can pass in a DOM node or a selector string!
 dragDrop('#dropTarget', (files, pos, fileList, directories) => {
   console.log('Here are the dropped files', files)
   console.log('Dropped at coordinates', pos.x, pos.y)
   console.log('Here is the raw FileList object if you need it:', fileList)
   console.log('Here is the list of directories:', directories)
 
   // `files` is an Array!
   files.forEach(file => {
     console.log(file.name)
     console.log(file.size)
     console.log(file.type)
     console.log(file.lastModifiedDate)
     console.log(file.fullPath) // not real full path due to browser security restrictions
     console.log(file.path) // in Electron, this contains the actual full path
 
     // convert the file to a Buffer that we can use!
     const reader = new FileReader()
     reader.addEventListener('load', e => {
       // e.target.result is an ArrayBuffer
       const arr = new Uint8Array(e.target.result)
       const buffer = new Buffer(arr)
 
       // do something with the buffer!
     })
     reader.addEventListener('error', err => {
       console.error('FileReader error' + err)
     })
     reader.readAsArrayBuffer(file)
   })
 })