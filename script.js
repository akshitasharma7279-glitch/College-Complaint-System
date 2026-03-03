const API_URL = "http://localhost:5000/api/complaints";

// Show Student Form
function showStudent() {
    document.getElementById("studentForm").classList.remove("hidden");
    document.getElementById("adminLogin").classList.add("hidden");
}

// Show Admin Login
function showAdmin() {
    document.getElementById("adminLogin").classList.remove("hidden");
    document.getElementById("studentForm").classList.add("hidden");
}

// Submit Complaint (SEND TO DATABASE)
function submitComplaint() {
    let lab = document.getElementById("lab").value;
    let roll = document.getElementById("roll").value;
    let complaintText = document.getElementById("query").value;

    if (lab && roll && complaintText) {

        fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                lab: lab,
                roll: roll,
                complaint: complaintText,
                status: "Pending"
            })
        })
        .then(res => res.json())
        .then(data => {
            alert("Complaint Submitted Successfully!");
            document.getElementById("lab").value = "";
            document.getElementById("roll").value = "";
            document.getElementById("query").value = "";
        })
        .catch(err => console.log(err));
    }
}

// Admin Login
function checkAdmin() {
    let pass = document.getElementById("adminPass").value;

    if (pass === "admin123") {
        document.getElementById("adminPanel").classList.remove("hidden");
        displayComplaints();
    } else {
        alert("Wrong Password!");
    }
}

// FETCH Complaints from Database
function displayComplaints() {
    fetch(API_URL)
    .then(res => res.json())
    .then(data => {
        let list = document.getElementById("complaintList");
        list.innerHTML = "";

        data.forEach((c) => {
            let li = document.createElement("li");

            li.innerHTML = `
                Lab: ${c.lab}, 
                Roll: ${c.roll}, 
                Complaint: ${c.complaint}, 
                Status: ${c.status}
                <button onclick="markDone('${c._id}')">Mark Reviewed</button>
                <button onclick="deleteComplaint('${c._id}')">Delete</button>
            `;

            list.appendChild(li);
        });
    });
}

// Mark Complaint Reviewed (UPDATE DATABASE)
function markDone(id) {
    fetch(`${API_URL}/${id}`, {
        method: "PUT"
    })
    .then(() => displayComplaints());
}

// Delete Single Complaint (DELETE FROM DATABASE)
function deleteComplaint(id) {
    fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    })
    .then(() => displayComplaints());
}

// Clear All Complaints (DELETE ALL FROM DATABASE)
function clearComplaints() {
    fetch(API_URL + "/clear", {
        method: "DELETE"
    })
    .then(() => {
        displayComplaints();
        alert("All complaints cleared!");
    });
}