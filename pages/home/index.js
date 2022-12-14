const vacanciesList = document.querySelector(".vacancies__list")

const selectedVacanciesList = document.querySelector(".vacanciesSelecteds__list")

selectedVacanciesList.insertAdjacentHTML("beforeend","<p>Você ainda não aplicou para nenhuma vaga</p>")



function renderVacancyList(list){
    vacanciesList.innerHTML = ""
    list.forEach((vac)=>{
        const vacancy = document.createElement("li")
        vacancy.classList.add("vacancy")
        const titlevacancy = document.createElement("h2")
        const divLocEnter = document.createElement("div")
        const spanEnter = document.createElement("span")
        spanEnter.classList.add("vacancy__enterprise")
        const spanLoc = document.createElement("span")
        spanLoc.classList.add("vacancy__location")
        const discrVacancy = document.createElement("p")
        const divModalitiesButton = document.createElement("div")
        divModalitiesButton.classList.add("modalitiesButton")
        const divModalities = document.createElement("div")
        const spanModal = document.createElement("span")
        spanModal.classList.add("vacancy__modality")
        const spanModal2 = document.createElement("span")
        spanModal2.classList.add("vacancy__modality")
        const btnVacancy = document.createElement("button")
        btnVacancy.classList.add("btn")

        titlevacancy.innerText = vac.title
        spanEnter.innerText = vac.enterprise
        spanLoc.innerText = vac.location
        discrVacancy.innerText = vac.descrition
        spanModal.innerText = vac.modalities[0]
        spanModal2.innerText = vac.modalities[1]

        const list = JSON.parse(localStorage.getItem("list")) || []
        const find = list.find(vacancy => vacancy.id == vac.id)

        if(find){
            btnVacancy.innerText = "Remover Candidatura"
        }else{
            btnVacancy.innerText = "Candidatar"
        }

        btnVacancy.id = vac.id

        btnVacancy.addEventListener("click", removeOrAddVacancy)

        vacanciesList.appendChild(vacancy)
        vacancy.appendChild(titlevacancy)
        vacancy.appendChild(divLocEnter)
        divLocEnter.append(spanEnter, spanLoc)
        vacancy.appendChild(discrVacancy)
        vacancy.appendChild(divModalitiesButton)
        divModalitiesButton.appendChild(divModalities)
        divModalities.append(spanModal, spanModal2)
        divModalitiesButton.appendChild(btnVacancy)
    });

   
}


const removeOrAddVacancy = (event)=>{
    const id = event.target.id
    const list = JSON.parse(localStorage.getItem("list")) || []
    const find = list.find(vacancy => vacancy.id == id)
    
    if(find){
        const index = list.findIndex(vacancy=> vacancy.id == id)
        list.splice(index, 1)
        localStorage.setItem("list", JSON.stringify(list))
        renderSelectedVacancy(list)
        renderVacancyList(jobsData)
    }else{
        const vacancy = jobsData.find(vacancy=> vacancy.id == id)
        list.push(vacancy)
        localStorage.setItem("list", JSON.stringify(list))
        renderSelectedVacancy(list)
        renderVacancyList(jobsData)
    }
}

function renderSelectedVacancy(list){
    
    selectedVacanciesList.insertAdjacentHTML("beforeend","<p>Você ainda não aplicou para nenhuma vaga</p>")
    
    selectedVacanciesList.innerHTML = ""

    
    if(list.length == 0){
        selectedVacanciesList.insertAdjacentHTML("beforeend","<p>Você removeu todas as vagas</p>") 
    }
    list.forEach((vac)=>{
        const selectedVacancy = document.createElement("li")
        selectedVacancy.classList.add("vacancySelected")
        const divItemSelectedVacancy = document.createElement("div")
        divItemSelectedVacancy.classList.add("vacancySelected__item")
        const titleSelectedVacancy = document.createElement("h2")
        const divLocEnterSelecetedVacancy = document.createElement("div")
        const spanEnterSelectedVacancy= document.createElement("span")
        spanEnterSelectedVacancy.classList.add("vacancy__enterprise")
        const spanLocSelecetedVacancy = document.createElement("span")
        spanLocSelecetedVacancy.classList.add("vacancy__location")
        const btnTrash = document.createElement("button")
        btnTrash.classList.add("btnTrash")
        const imgTrash = document.createElement("img")
        
        titleSelectedVacancy.innerText = vac.title
        spanEnterSelectedVacancy.innerText = vac.enterprise
        spanLocSelecetedVacancy.innerText = vac.location
        btnTrash.id = vac.id
        imgTrash.src = "../../assets/img/trash (1).png"
        imgTrash.id = vac.id
        
        btnTrash.addEventListener("click", removeOrAddVacancy)
        
        selectedVacanciesList.appendChild(selectedVacancy)
        selectedVacancy.appendChild(divItemSelectedVacancy)
        divItemSelectedVacancy.appendChild(titleSelectedVacancy)
        divItemSelectedVacancy.appendChild(divLocEnterSelecetedVacancy)
        divLocEnterSelecetedVacancy.append(spanEnterSelectedVacancy, spanLocSelecetedVacancy)
        selectedVacancy.appendChild(btnTrash)
        btnTrash.appendChild(imgTrash)
    })
}

renderVacancyList(jobsData)