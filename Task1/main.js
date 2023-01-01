const StoreData=()=>{//function to store user submit data
    let Name= document.getElementById('username').value;
    let Age = document.getElementById('age').value;
    let ID = document.getElementById('id').value; 
    let Statuscheck=document.getElementById('active')
    let UserData={
        username:Name,
        age:Age,
        status:Statuscheck.value
    }
    if(Statuscheck.checked!=true){
        UserData.status="not active"
    }
        window.localStorage.setItem(ID,JSON.stringify(UserData))
}
const show=()=>{ //show user data in div
    let id = document.getElementById('show').value;
    let datatoshow = window.localStorage.getItem(id);
    let paragraph = document.createElement("p");
    let i = document.createTextNode(datatoshow);
    paragraph.appendChild(i);
    let element = document.getElementById("datashow");
    element.appendChild(paragraph);

}
const removeItem=()=>{  
    let id = document.getElementById('removeKey').value;
    localStorage.removeItem(id)
}

const clearStorage=()=>{ 
    localStorage.clear()
}
window.onload =function(){ 
    document.getElementById("user").onsubmit = StoreData
    document.getElementById("showitemButton").onclick = show
    document.getElementById("removeButton").onclick = removeItem
    document.getElementById("clearButton").onclick = clearStorage
}