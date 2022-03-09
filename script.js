// DOM list
const sectionList = document.getElementById('sectionList')
const sectionNew = document.getElementById('sectionNew')
const sectionEdit = document.getElementById('sectionEdit')
const playerTableBody = document.getElementById('playerTableBody')
const submitNewButton = document.getElementById('submitNewButton')
const listLink = document.getElementById('listLink')
const newLink = document.getElementById('newLink')

const newName =  document.getElementById('newName')
const newJersey = document.getElementById('newJersey')
const newAge = document.getElementById('newAge')
const newBorn = document.getElementById('newBorn')

const editName =  document.getElementById('editName')
const editJersey = document.getElementById('editJersey')
const editAge = document.getElementById('editAge')
const editBorn = document.getElementById('editBorn')

const submitEditButton = document.getElementById('submitEditButton')


const baseApi = 'https://hockeyplayers.systementor.se/gong/player'


// object
class hockeyPlayer{
    constructor(id,namn,jersey,age,born){
        this.id = id;
        this.namn = namn;
        this.jersey = jersey;
        this.age = age;
        this.born = born
    }
}

// search function
const search = document.getElementById('search');

search.addEventListener("keyup", () => {

    const lowerCase = search.value.toLowerCase();

    const filteredList = items.filter(item => item.namn.toLowerCase().includes(lowerCase));
    
    playerTableBody.innerHTML = '';
    filteredList.forEach( (item) => {
        renderTr(item);
    })
});

// display each of the section on the website
function showSection(sectionsId){
    if(sectionsId == 'sectionList'){
        sectionList.style.display = "block";
        sectionNew.style.display = "none";
        sectionEdit.style.display = "none";
    }
    else if(sectionsId == 'sectionNew'){
        sectionList.style.display = "none";
        sectionNew.style.display = "block";
        sectionEdit.style.display = "none";
    }
    else if(sectionsId == 'sectionEdit'){
        sectionList.style.display = "none";
        sectionNew.style.display = "none";
        sectionEdit.style.display = "block";
    }
}

// assign DOM, click -> do this
newLink.addEventListener("click",()=>{ 
        showSection('sectionNew');    
  });

listLink.addEventListener("click",()=>{ 
    showSection('sectionList');    
});

// click -> to create a new player
submitNewButton.addEventListener("click",()=>{ 
    // assign property with value
    const newPlayer = {
        namn: newName.value,
        jersey: newJersey.value,
        age: newAge.value,
        born: newBorn.value,
        
    };

    // provides the correct media type, in this case json file.
    const requestParams = {
        method:"POST",
        headers:{
            "Content-Type" : "application/json" 
        },
        body:JSON.stringify(newPlayer)
    };

    // fetching Stefan's Api
    fetch(baseApi,requestParams)
        .then(response=>response.json())
        .then(json=>{
            const player = new hockeyPlayer(
                json.id,
                newName.value,
                newJersey.value, 
                newAge.value,
                newBorn.value)

            items.push(player); 
            renderTr(player);
            showSection('sectionList');    
        })
});

submitEditButton.addEventListener("click",()=>{
    const changedPlayerValues = {
        namn: editName.value,
        jersey: editJersey.value,
        age: editAge.value,
        born: editBorn.value,
        
    };
    const reqParams = {
        method:"PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify(changedPlayerValues)
    };

    fetch(baseApi + '/' + editingPlayer.id ,reqParams)
        .then(res=>{
            console.log(res)
            refreshItems();
            showSection('sectionList');    
        })
    }
);

let editingPlayer = null;


function editPlayer(id){
    editingPlayer = items.find((item)=>item.id == id)
    editName.value = editingPlayer.namn;
    editJersey.value = editingPlayer.jersey;
    editAge.value = editingPlayer.age;
    editBorn.value = editingPlayer.born;
    showSection('sectionEdit');    
}



function renderTr(player){
    let jsCall = `editPlayer(${player.id})`;
    let template = `<tr>
                        <td>${player.namn}</td>
                        <td>${player.jersey}</td>
                        <td>${player.age}</td>
                        <td>${player.born}</td>
                        <td><a href="#" onclick="${jsCall}">EDIT</td>
                    </tr>`
    playerTableBody.innerHTML = playerTableBody.innerHTML + template;
} 


function refreshItems(){
    items = [];
    playerTableBody.innerHTML = '';

    fetch(baseApi)
        .then(response=>response.json())
        .then(array=>{
            //json -> items
            console.log(array)
            array.forEach(player=>{
                p = new hockeyPlayer(player.id,
                    player.namn,
                    player.jersey,
                    player.age,
                    player.born)                    
                items.push(p)
            });
            items.forEach( (item) => {
                renderTr(item);
            });
    })

}

let items = [];
refreshItems();
// foreach loop create a tr, and td's
// put then new tr as a 'child' to 'playerTableBody'
 
showSection('sectionList');



