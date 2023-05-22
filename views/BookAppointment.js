var itemList = document.getElementById('items');

function saveToLocalStorage(event)
{
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const phoneNumber = event.target.phone.value;

    const myObj = {
        name,
        email,
        phoneNumber
    }

   // localStorage.setItem(myObj.email,JSON.stringify(myObj));
   //showUserOnScreen(myObj);
    axios.post('http://localhost:3000/user/add-user', myObj)
    .then((response) => {
        showUserOnScreen(response.data.newUserDetail);
        console.log(response)
    })
    .catch((err) => {
        document.body.innerHTML = document.body.innerHTML + "<h4> something is wrong</h4>"
        console.error(err);
    })   
}

window.addEventListener("DOMContentLoaded", () => {
    axios.get("http://localhost:3000/user/get-users")
        .then((response) => {
            console.log(response)

            for(let i=0; i<response.data.allUsers.length; i++)
                showUserOnScreen(response.data.allUsers[i]);
        })
        .catch(error => console.error(error))
})

function showUserOnScreen(myObj)
{
    const parentElem = document.getElementById('items');
    const childElem = document.createElement('li');
    childElem.textContent = myObj.name+"-"+myObj.email+"-"+myObj.phoneNumber;

    //adding delete button
    const deleteBtn = document.createElement('input');
    deleteBtn.type="button";
    deleteBtn.value="Delete";
    deleteBtn.onclick = () => {
       // localStorage.removeItem(myObj.email);
       console.log('for delete '+myObj.id);
       axios.delete(`http://localhost:3000/user/delete-user/${myObj.id}`)
        .then((response) => {
            parentElem.removeChild(childElem);
        })
        .catch(error => console.error(error))
    }

    //Edit button
    const editBtn = document.createElement('input');
    editBtn.type="button";
    editBtn.value='Edit';
    editBtn.onclick = () => {
        //localStorage.removeItem(myObj.email);
        axios.delete(`http://localhost:3000/user/delete-user/${myObj.id}`)
            .then((response) => {
                parentElem.removeChild(childElem);
                document.getElementById('name').value = myObj.name;
                document.getElementById('email').value =myObj.email;
                document.getElementById('phone').value =myObj.phoneNumber;
            })
            .catch(error => console.error(error))
    }
    childElem.appendChild(editBtn);
    childElem.appendChild(deleteBtn);
    parentElem.appendChild(childElem);
    
}
