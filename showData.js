const storage = JSON.parse(localStorage.getItem('data')) || [];
const tbody = document.querySelector('tbody');

console.log(storage);



const createTableElement = (data)=>{
    const tRow = document.createElement('tr');
    const name = document.createElement('td');
    const amount = document.createElement('td');
    const expensesItem = document.createElement('td');
    const managerName = document.createElement('td');
    const editBtn = document.createElement('td');
    const delBtn = document.createElement('td');

    name.innerHTML = data.name;
    amount.innerHTML = data.amount;
    expensesItem.innerHTML = data.item;
    managerName.innerHTML = data.Mname;
    delBtn.innerHTML = `<a href="home.html" id="${data.id}" onclick="deleteData(this.id)">Delete Data</a>`
    editBtn.innerHTML = `<a href="index.html?id=${data.id}">Edit Data</a>`
    

    tRow.append(name, amount, expensesItem, managerName, editBtn, delBtn);
    tbody.appendChild(tRow);
}

const deleteData = (id) => {
    let index = storage.findIndex(data => data.id === id);
    storage.splice(index, 1);

    localStorage.setItem('data', JSON.stringify(storage));
}


if (storage.length === 0){
    document.querySelector('#title').innerHTML = 'No Data in Local Storage';
    document.querySelector('table').style.display = 'none';
} else{
    storage.forEach(createTableElement);
}
