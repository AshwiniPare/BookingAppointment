var itemList = document.getElementById('items');

function saveToLocalStorage(event)
{
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const phone = event.target.phone.value;

    const myObj = {
        name,
        email,
        phone
    }

   // localStorage.setItem(myObj.email,JSON.stringify(myObj));
   //showUserOnScreen(myObj);
    axios.post('https://crudcrud.com/api/931c3d9d71d544b8b9b84ecb50d78760/appointmentData', myObj)
    .then((response) => {
        showUserOnScreen(response.data)
        console.log(response)
    })
    .catch((err) => {
        document.body.innerHTML = document.body.innerHTML + "<h4> something is wrong</h4>"
        console.error(err);
    })   
}

window.addEventListener("DOMContentLoaded", () => {
    axios.get("https://crudcrud.com/api/931c3d9d71d544b8b9b84ecb50d78760/appointmentData")
        .then((response) => {
            console.log(response)

            for(let i=0; i<response.data.length; i++)
                showUserOnScreen(response.data[i]);
        })
        .catch(error => console.error(error))
})

function showUserOnScreen(myObj)
{
    const parentElem = document.getElementById('items');
    const childElem = document.createElement('li');
    childElem.textContent = myObj.name+"-"+myObj.email+"-"+myObj.phone;

    //adding delete button
    const deleteBtn = document.createElement('input');
    deleteBtn.type="button";
    deleteBtn.value="Delete";
    deleteBtn.onclick = () => {
       // localStorage.removeItem(myObj.email);
       axios.delete(`https://crudcrud.com/api/931c3d9d71d544b8b9b84ecb50d78760/appointmentData/${myObj._id}`)
        parentElem.removeChild(childElem);
    }

    //Edit button
    const editBtn = document.createElement('input');
    editBtn.type="button";
    editBtn.value='Edit';
    editBtn.onclick = () => {
        localStorage.removeItem(myObj.email);
        parentElem.removeChild(childElem);
        document.getElementById('name').value = myObj.name;
        document.getElementById('email').value =myObj.email;
        document.getElementById('phone').value =myObj.phone;
    }
    childElem.appendChild(editBtn);
    childElem.appendChild(deleteBtn);
    parentElem.appendChild(childElem);
    
}
