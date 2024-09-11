
// Variable to hold data from local storage
const storage = JSON.parse(localStorage.getItem('data')) || [];

// Getting the html elements
const form = document.querySelector('form');
const editForm = document.querySelector('#edit-form');
const display = document.getElementById('show-text');

let params = new URLSearchParams(document.location.search);
let id = params.get('id');

if (id){
    form.style.display = 'none';
    editForm.style.display = 'block';

    updateForm(id);
}

// function to get index of params Id
const getIndex = (id)=>{
    // use id to get index
    let index = storage.findIndex(data => data.id === id);
    return index
}

editForm.addEventListener('submit', e=>{
    e.preventDefault();

    const formData = {
        id: id,
        name: editForm['name'].value,
        amount: editForm['amount'].value,
        item: editForm['item'].value
    }      
    
    storage[getIndex(id)] = formData;
    localStorage.setItem('data', JSON.stringify(storage));

    form['name'].value = '';
    form['amount'].value = '';
    form['item'].value = '';

    window.location.href = 'index.html';
})

form.addEventListener('submit', (e) =>{
    e.preventDefault();
    // const name = ;
    // const amount = ;
    // const item = ;
    // const mName = form['M-name'].value;
    // const count = form['count'].value;
    // const date = form['date'].value;
    // const eId = form['id'].value;
    // const description = form['description'].value;

    
    const formData = {
        id: getId(),
        name: form['name'].value,
        amount: form['amount'].value,
        item: form['item'].value
    }        

    storage.push(formData);
    localStorage.setItem('data', JSON.stringify(storage));

    form['name'].value = '';
    form['amount'].value = '';
    form['item'].value = '';

    window.location.href = 'home.html';
})



// Functions
function updateForm(id){
    let index = storage.findIndex(data => data.id === id);
    console.log(index);
    editForm['name'].value = storage[index].name;
    editForm['amount'].value = storage[index].amount;
    editForm['item'].value = storage[index].item;
}


function getId(){
    let date = new Date();

    let id = date.toLocaleTimeString('en-us', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });

    return id;
}