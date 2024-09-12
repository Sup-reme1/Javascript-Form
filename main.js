
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
        item: editForm['item'].value,
        Mname: form['Mname'].value,
        count: form['count'].value,
        date: form['date'].value,
        empId: form['id'].value,
        description: form['description'].value
    }      
    
    storage[getIndex(id)] = formData;
    localStorage.setItem('data', JSON.stringify(storage));

    form['name'].value = '';
    form['amount'].value = '';
    form['item'].value = '';
    form['Mname'].value = '';
    form['count'].value = '';
    form['date'].value = '';
    form['id'].value = '';
    form['description'].value = '';

    window.location.href = 'home.html';
})

form.addEventListener('submit', (e) =>{
    e.preventDefault();


    if (validateForm()){
        const formData = {
            id: getId(),
            name: form['name'].value,
            amount: form['amount'].value,
            item: form['item'].value,
            Mname: form['Mname'].value,
            count: form['count'].value,
            date: form['date'].value,
            empId: form['id'].value,
            description: form['description'].value
        }        
        

        storage.push(formData);
        localStorage.setItem('data', JSON.stringify(storage));

        form['name'].value = '';
        form['amount'].value = '';
        form['item'].value = '';
        form['Mname'].value = '';
        form['count'].value = '';
        form['date'].value = '';
        form['id'].value = '';
        form['description'].value = '';

        window.location.href = 'home.html';

    } else{
        alert('Fill the form');
    }
    

})



// Functions
function validateForm(){
    if (
        form.name.value === null || form.name.value.trim() === '' ||
        form.item.value === null || form.item.value.trim() === '' ||
        form.Mname.value === null || form.Mname.value.trim() === '' ||
        form.id.value === null || form.id.value.trim() === '' ||
        form.description.value === null || form.description.value.trim() === ''
    ){ return false; } else{
        return true;
    }

}

// Fuction to update the form
function updateForm(id){
    let index = storage.findIndex(data => data.id === id);

    editForm['name'].value = storage[index].name;
    editForm['amount'].value = storage[index].amount;
    editForm['item'].value = storage[index].item;
    editForm['Mname'].value = storage[index].Mname;
    editForm['count'].value = storage[index].count;
    editForm['date'].value = storage[index].date;
    editForm['id'].value = storage[index].empId;
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