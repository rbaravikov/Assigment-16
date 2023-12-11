/* 
* Po forma sukurkite lentelę joje atvaizduokite informaciją iš localStorage.
* Papildomai: pirmo ir paskutinio ištrynimas iš localstorage */


const text = document.getElementById("text")
const add = document.getElementById("add")
const delFirst = document.getElementById("deleteFirst")
const delLast = document.getElementById("deleteLast")
const output = document.getElementById("output")
const forma = document.querySelector("form")
const table = document.querySelector("table")
let namesArray = []

forma.addEventListener("click", (e) => e.preventDefault())

class FullName{
    constructor(text){
        this.text = text
    }

    // padalinti į vardą ir pavardę
    separateName(){
    const split = this.text.value.split(" ").filter(x => x != '').map(x => x.charAt(0).toUpperCase() + x.slice(1).toLowerCase())
    const fullName = {name: split[0], surname:split[1]}
    if (fullName.surname == undefined) return alert("Enter full name")
    namesArray.push(fullName)

    }

    // užkrovimas iš storage
    loadNamesArray(){
    const getNamesArray = localStorage.namesArray
    return JSON.parse(getNamesArray)
    }
}
let entry = new FullName(text)

add.addEventListener('click', () => {
    if(!text.value) return alert("Enter full name")
    // sukuriam const fullName
    entry.separateName()
    localStorage.setItem("namesArray", JSON.stringify(namesArray))
    table.innerHTML = `<tr>
    <th>Name</th>
    <th>Surname</th>
</tr>`
    namesArray.forEach(appendTr)
    this.text.value = ""
})

const appendTr = (data) => {
    const tr = document.createElement("tr")
    tr.innerHTML =  `<td>${data.name}</td><td>${data.surname}</td>`
    table.appendChild(tr)

}

// // Pirmas užkrovimas
if (localStorage.namesArray != null){
    namesArray = entry.loadNamesArray()
    namesArray.forEach(appendTr)
}

delFirst.addEventListener('click', () => {
    namesArray.shift()
    table.innerHTML = `<tr>
    <th>Name</th>
    <th>Surname</th>
</tr>`
    namesArray.forEach(appendTr)
    localStorage.setItem("namesArray", JSON.stringify(namesArray))  
})

delLast.addEventListener('click', ()=>{
    namesArray.pop()
    table.innerHTML = `<tr>
    <th>Name</th>
    <th>Surname</th>
</tr>`
    namesArray.forEach(appendTr)
    localStorage.setItem("namesArray", JSON.stringify(namesArray))
})