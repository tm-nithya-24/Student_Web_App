// Sample student data
const students = [
    {
        id: 1,
        name: "T M Nithya",
        email: "nithya@example.com",
        age: 22,
        department: "Computer Science",
        year: "Final Year",
        rollNumber: "CSE001",
        skills: "HTML, CSS, JavaScript",
    },

    {
        id: 2,
        name: "Sachin Ramesh",
        email: "sachin@example.com",
        age: 27,
        department: "Information Technology",
        year: "Third Year",
        rollNumber: "IT002",
        skills: "Python, SQL, Java",
    },

    {
        id: 3,
        name: "Saniya Nizam",
        email: "saniya@example.com",
        age: 23,
        department: "Computer Science",
        year: "Final Year",
        rollNumber: "CSE003",
        skills: "React, JavaScript, CSS",
    },

    {
        id: 4,
        name: "Mahadev Swamy",
        email: "mahadev@example.com",
        age: 25,
        department: "Electronics",
        year: "Second Year",
        rollNumber: "ECE004",
        skills: "C, Python, Arduino",
    },

    {
        id: 5,
        name: "Shreya L R",
        email: "shreya@example.com",
        age: 24,
        department: "Information Technology",
        year: "Final Year",
        rollNumber: "IT005",
        skills: "HTML, Bootstrap, JavaScript",
    },

    {
        id: 6,
        name: "Varsha K M",
        email: "varsha@example.com",
        age: 22,
        department: "Computer Science",
        year: "Third Year",
        rollNumber: "CSE006",
        skills: "Java, DSA, SQL",
    }
];


// Get HTML elements
const profileContainer = document.getElementById("profileContainer");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const loadBtn = document.getElementById("loadBtn");
const count = document.getElementById("count");
const status = document.getElementById("status");

const profileModal = document.getElementById("profileModal");
const profileDetails = document.getElementById("profileDetails");
const closeModal = document.getElementById("closeModal");


// Display student profile cards
function displayProfiles(studentList) {

    profileContainer.innerHTML = "";

    count.textContent = `Profiles displayed: ${studentList.length}`;

    if (studentList.length === 0) {

        profileContainer.innerHTML = `
            <div class="empty-message">
                <div class="empty-icon">🔍</div>
                <h3>No students found</h3>
                <p>Try searching with another name or email.</p>
            </div>
        `;

        status.textContent = "No matching profiles found";

        return;
    }

    status.textContent = "Student profiles loaded successfully";

    studentList.forEach(function(student) {

        const card = document.createElement("article");

        card.className = "profile-card";

        card.innerHTML = `
            <img
                src="${student.avatar}"
                alt="Profile photo of ${student.name}"
                class="profile-avatar"
            >

            <h3>${student.name}</h3>

            <p class="profile-email">${student.email}</p>

            <div class="profile-info">

                <p>
                    <strong>Department:</strong>
                    ${student.department}
                </p>

                <p>
                    <strong>Year:</strong>
                    ${student.year}
                </p>

                <p>
                    <strong>Age:</strong>
                    ${student.age}
                </p>

                <p>
                    <strong>Roll No:</strong>
                    ${student.rollNumber}
                </p>

            </div>

            <button class="view-btn" data-student-id="${student.id}">
                View Profile
            </button>
        `;

        profileContainer.appendChild(card);

    });
}


// Load all profiles
loadBtn.addEventListener("click", function() {

    searchInput.value = "";

    displayProfiles(students);

});


// Search profiles
function searchProfiles() {

    const searchText = searchInput.value.trim().toLowerCase();

    if (searchText === "") {

        status.textContent = "Enter a name or email to search";

        searchInput.focus();

        return;
    }

    const filteredStudents = students.filter(function(student) {

        return (
            student.name.toLowerCase().includes(searchText) ||
            student.email.toLowerCase().includes(searchText)
        );

    });

    displayProfiles(filteredStudents);

}


// Search button click
searchBtn.addEventListener("click", searchProfiles);


// Search when Enter is pressed
searchInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        searchProfiles();
    }

});


// Open individual student profile
profileContainer.addEventListener("click", function(event) {

    const button = event.target.closest(".view-btn");

    if (!button) {
        return;
    }

    const studentId = Number(button.dataset.studentId);

    const student = students.find(function(item) {

        return item.id === studentId;

    });

    if (!student) {
        return;
    }

    profileDetails.innerHTML = `
        <img
            src="${student.avatar}"
            alt="Profile photo of ${student.name}"
            class="profile-avatar"
        >

        <h2>${student.name}</h2>

        <p class="profile-email">${student.email}</p>

        <div class="profile-info">

            <p>
                <strong>Student ID:</strong>
                ${student.id}
            </p>

            <p>
                <strong>Roll Number:</strong>
                ${student.rollNumber}
            </p>

            <p>
                <strong>Department:</strong>
                ${student.department}
            </p>

            <p>
                <strong>Age:</strong>
                ${student.age}
            </p>

            <p>
                <strong>Academic Year:</strong>
                ${student.year}
            </p>

            <p>
                <strong>Skills:</strong>
                ${student.skills}
            </p>

        </div>
    `;

    profileModal.style.display = "flex";

});


// Close the profile popup
closeModal.addEventListener("click", function() {

    profileModal.style.display = "none";

});


// Close popup when clicking outside it
profileModal.addEventListener("click", function(event) {

    if (event.target === profileModal) {
        profileModal.style.display = "none";
    }

});


// Close popup with Escape key
document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {
        profileModal.style.display = "none";
    }

});