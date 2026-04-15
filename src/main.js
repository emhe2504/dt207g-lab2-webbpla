 
 document.addEventListener("DOMContentLoaded", () => {

     console.log("DOM laddad");

    const form = document.getElementById("add-form");
    console.log("FORM:", form);

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        addWork();

    })
 })
 
 async function addWork() {

    const companyName = document.getElementById("companyname").value;
    const jobTitle = document.getElementById("jobtitle").value;
    const location = document.getElementById("location").value;
    const startDate = document.getElementById("startdate").value;
    const endDate = document.getElementById("enddate").value;
    const description = document.getElementById("description").value;

    let work = {
        companyname: companyName,
        jobtitle: jobTitle,
        location: location,
        startdate: startDate,
        enddate: endDate,
        description: description
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
}