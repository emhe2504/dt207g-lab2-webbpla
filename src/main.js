
document.addEventListener("DOMContentLoaded", () => {

    fetchWork()

    const form = document.getElementById("add-form");
    if (!form) return;

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        addWork();

    })
})

async function addWork() {

    const companyName = document.getElementById("companyname");
    const jobTitle = document.getElementById("jobtitle");
    const location = document.getElementById("location");
    const startDate = document.getElementById("startdate");
    const endDate = document.getElementById("enddate");
    const description = document.getElementById("description");

    let work = {
        companyname: companyName.value,
        jobtitle: jobTitle.value,
        location: location.value,
        startdate: startDate.value,
        enddate: endDate.value,
        description: description.value
    }

    let response = await fetch('http://localhost:5000/works', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(work)
    });

    let data = await response.json();
    console.log(data);

    companyName.value = "";
    jobTitle.value = "";
    location.value = "";
    startDate.value = "";
    endDate.value = "";
    description.value = "";
}



async function fetchWork() {

    const link = "http://localhost:5000/works";

    try {

        const data = await fetch(link);
        const jsonData = await data.json();

        renderWork(jsonData);

    } catch (error) {
        console.log(error);
    }
}

function renderWork(jsonData) {

    console.log(jsonData);

    const listDiv = document.getElementById("list-div");
    listDiv.innerHTML = "";

    jsonData.forEach(element => {

        const id = element.id;
        const companyname = element.companyname;
        const jobtitle = element.jobtitle;
        const location = element.location;
        const startdate = element.startdate;
        const enddate = element.enddate;
        const description = element.description;

        const ulList = document.createElement("ul");
        ulList.id = `ul-${id}`;

        const compLi = document.createElement("li");
        compLi.textContent = companyname;

        const jobtLi = document.createElement("li");
        jobtLi.textContent = jobtitle;

        const locLi = document.createElement("li");
        locLi.textContent = location;

        const startLi = document.createElement("li");
        startLi.textContent = startdate;

        const endLi = document.createElement("li");
        endLi.textContent = enddate;

        const descLi = document.createElement("li");
        descLi.textContent = description;

        const deleteLi = document.createElement("li");
        const deleteButton = document.createElement("button");
        deleteButton.id = `button-${id}`;
        deleteButton.textContent = "Radera";
        deleteLi.appendChild(deleteButton);

        ulList.append(compLi, jobtLi, locLi, startLi, endLi, descLi, deleteLi);
        listDiv.appendChild(ulList);

        deleteList(id);
    });
}

function deleteList(id) {

    const list = document.getElementById(`ul-${id}`);
    const deleteButton = document.getElementById(`button-${id}`);

    deleteButton.addEventListener("click", () => {

        list.remove();
        deleteWork(id);
    })
}


async function deleteWork(id) {

    let response = await fetch(`http://localhost:5000/works/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    let data = await response.json();
    console.log(data);
}