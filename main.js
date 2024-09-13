// Local Storage
const storage = JSON.parse(localStorage.getItem('data')) || [];

// HTML Elements
const form = document.querySelector('form');
const editForm = document.querySelector('#edit-form');

// Parameter Query
let params = new URLSearchParams(document.location.search);
let id = params.get('id');


const addForm = (form) => {
    const formData = {
        id: id ? id : getId(),
        name: form['name'].value,
        amount: form['amount'].value,
        item: form['item'].value,
        Mname: form['Mname'].value,
        count: form['count'].value,
        date: form['date'].value,
        empId: form['empId'].value,
        description: form['description'].value
    }

    return formData;
}

const emptyForm = (form) => {
    form['name'].value = '';
    form['amount'].value = '';
    form['item'].value = '';
    form['Mname'].value = '';
    form['count'].value = '';
    form['date'].value = '';
    form['empId'].value = '';
    form['description'].value = '';

    window.location.href = 'home.html';
}

// Form Validation
const validateForm = (form) => {
    if (
        form.name.value === null || form.name.value.trim() === '' ||
        form.item.value === null || form.item.value.trim() === '' ||
        form.Mname.value === null || form.Mname.value.trim() === '' ||
        form.empId.value === null || form.empId.value.trim() === '' ||
        form.description.value === null || form.description.value.trim() === ''
    ){ 
        return false; 
    } else{
        return true;
    }
}

// Find Params Index
const getIndex = (id)=>{
    let index = storage.findIndex(data => data.id === id);
    return index
}

// Update Form
function updateForm(id){
    form.style.display = 'none';
    editForm.style.display = 'block';

    let index = storage.findIndex(data => data.id === id);

    editForm['name'].value = storage[index].name;
    editForm['amount'].value = storage[index].amount;
    editForm['item'].value = storage[index].item;
    editForm['Mname'].value = storage[index].Mname;
    editForm['count'].value = storage[index].count;
    editForm['date'].value = storage[index].date;
    editForm['empId'].value = storage[index].empId;
    editForm['description'].value = storage[index].description;
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

// Implementation 

if (id) updateForm(id);

editForm.addEventListener('submit', e=>{
    e.preventDefault();

    if (validateForm(editForm)){   
        const editInput = addForm(editForm);
        
        storage[getIndex(id)] = editInput;
        localStorage.setItem('data', JSON.stringify(storage));

        emptyForm(editForm);

    } else{
        alert('Fill the form');
    }
})

form.addEventListener('submit', (e) =>{
    e.preventDefault();

    if (validateForm(form)){       

        storage.push(addForm(form));
        localStorage.setItem('data', JSON.stringify(storage));

        emptyForm(form);

    } else{
        alert('Fill the form');
    }
})
