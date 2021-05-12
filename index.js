const form = document.querySelector('#form');
const fInput = document.getElementById('file-upload');
const ul = document.querySelector('ul');
let delbtn = document.getElementById('deletebtn');
let fList = undefined;
let sub = document.querySelector('subbtn');

var bar = new ProgressBar.Line(container, {
    strokeWidth: 4,
    easing: 'easeInOut',
    duration: 1400,
    color: '#FFEA82',
    trailColor: '#eee',
    trailWidth: 1,
    svgStyle: {width: '100%', height: '100%'},
    text: {
      style: {
        // Text color.
        // Default: same as stroke color (options.color)
        color: '#999',
        position: 'absolute',
        right: '0',
        top: '30px',
        padding: 0,
        margin: 0,
        transform: null
      },
      autoStyleContainer: false
    },
    from: {color: '#FFEA82'},
    to: {color: '#ED6A5A'},
    step: (state, bar) => {
      bar.setText(Math.round(bar.value() * 100) + ' %');
    }
  });
  
  bar.animate(1.0);  // Number from 0.0 to 1.0

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
            fList.splice(index, 1);
            URL.revokeObjectURL(f);
            const elem = document.querySelector(`[data-index='${index}']`);
            elem.remove();
            console.log('The file was successful delete');

            
            
        });
        p.innerText = f.name;
        // window.setTimeout(window.location.reload(), 5000)
        

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
