const form = document.querySelector('#form');
const fInput = document.getElementById('file-upload');
const ul = document.querySelector('ul');
let fList = undefined;

fInput.addEventListener('change', (e) => {
    ul.innerHTML = '';
    fList = Array.from(e.target.files);

    fList.forEach((f, index) => {
        let li = ul.appendChild(document.createElement('li'));
        li.dataset.index = index;
        let img = li.appendChild(document.createElement('img'));
        img.src = URL.createObjectURL(f);
        let p = li.appendChild(document.createElement('p'));
        let btn = li.appendChild(document.createElement('button'));
        btn.innerText = 'Delete';
        btn.classList.add('btn');
        let sub = li.appendChild(document.createElement('button'));
        sub.innerText = 'Submit';
        sub.classList.add('subbtn');

        btn.addEventListener('click', () => {
            fList.splice(index, 1);
            URL.revokeObjectURL(f);
            const elem = document.querySelector(`[data-index='${index}']`);
            elem.remove();

        });
        p.innerText = f.name;
    });
    fInput.value = null;
});


form.addEventListener('submit', (e) => {
    e.preventDefault();
    const files = fList;
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i])
    }

    formData.append('desc', 'igame Added');

    console.log(formData.get('desc'))

    fetch('/send-form', {
        method: 'POST',
        body: formData,
      }).then((response) => {
        console.log(response)
      })
});