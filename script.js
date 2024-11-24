document
    .getElementById("marital-status")
    .addEventListener("change", function () {
        document.getElementById("spouse-info").style.display =
            this.value === "married" ? "block" : "none";
    });

document
    .getElementById("profession-status")
    .addEventListener("change", function () {
        const value = this.value;
        document.getElementById("study-info").style.display =
            value === "studying" || value === "workingandstudying"
                ? "block"
                : "none";
        document.getElementById("work-info").style.display =
            value === "working" || value === "workingandstudying"
                ? "block"
                : "none";
        document.getElementById("unemployment-info").style.display =
            value === "unemployed" ? "block" : "none";
        document.getElementById("leave-info").style.display =
            value === "parental-leave" ? "block" : "none";
    });

function startSurvey() {
    document.getElementById("welcome-screen").style.display = "none";
    document.getElementById("survey-form").style.display = "flex";
}

function calculateBirthdate() {
    const personalCode = document.getElementById("personal-code").value;
    if (personalCode.length >= 7) {
        const centuryCode = personalCode.charAt(0);
        const year = parseInt(personalCode.substring(1, 3), 10);
        const month = parseInt(personalCode.substring(3, 5), 10);
        const day = parseInt(personalCode.substring(5, 7), 10);

        let fullYear;
        if (centuryCode === "3" || centuryCode === "4") {
            fullYear = 1900 + year;
        } else if (centuryCode === "5" || centuryCode === "6") {
            fullYear = 2000 + year;
        } else if (centuryCode === "1" || centuryCode === "2") {
            fullYear = 1800 + year;
        } else {
            document.getElementById("birthdate").value = "";
            return;
        }

        // Format the birthdate as YYYY-MM-DD
        const birthdate = `${fullYear}-${String(month).padStart(
            2,
            "0"
        )}-${String(day).padStart(2, "0")}`;
        document.getElementById("birthdate").value = birthdate;
    } else {
        document.getElementById("birthdate").value = "";
    }
}

function toggleQualificationFields() {
    const education = document.getElementById("education").value;
    const qualificationFields = document.getElementById("qualification-fields");

    if (
        education === "vocational" ||
        education === "higher-college" ||
        education === "higher-university"
    ) {
        qualificationFields.style.display = "block";
    } else {
        qualificationFields.style.display = "none";
    }
}

let currentStep = 1; // Start at step 1
const totalSteps = 5;
let data = [];

function startSurvey() {
    document.getElementById("welcome-screen").style.display = "none";
    document.getElementById("survey-form").style.display = "block";
    document.getElementById("step1").style.display = "block";

    // Show the progress bar and set it to the first step
    document.getElementById("progress-container").style.display = "block";
    document.getElementById("progress-message").style.display = "block";
    updateProgressBar(); // Initialize progress bar
    updateProgressMessage();
}

function updateProgressBar() {
    const progress = ((currentStep - 1) / totalSteps) * 100; // Calculate progress based on step 1
    document.getElementById("progress-bar").style.width = `${progress}%`;
    // console.log(currentStep, totalSteps);
    // console.log(progress);
}

function updateProgressMessage() {
    const message = `Užpildyta: ${Math.round(
        ((currentStep - 1) / totalSteps) * 100
    )}% (${currentStep} iš ${totalSteps} etapų)`;
    document.getElementById("progress-message").innerText = message;
}

function nextStep(stepNumber) {
    // Hide the current step
    document.getElementById(`step${currentStep}`).style.display = "none";

    // Move to the next step
    currentStep = stepNumber;

    // Show the next step
    document.getElementById(`step${currentStep}`).style.display = "block";

    // Update progress bar and message
    updateProgressBar();
    updateProgressMessage();
}

document.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission behavior

    // Collect data from the form
    const formData = new FormData(event.target);
    data = Object.fromEntries(formData);

    // Display the collected data
    displaySummary(data);
});

function displaySummary() {
    const form = document.querySelector("form"); // Get the form element
    const formData = new FormData(form); // Gather all form data
    const summaryContainer = document.createElement("div");

    let summaryHTML = "<h2>Dinaminės duomenų anketos rezultatai</h2>";

    // Loop through all form data and append only filled fields
    for (let [key, value] of formData.entries()) {
        // Skip empty values
        if (!value.trim()) continue;

        // Special handling for dropdowns to show selected text
        const field = document.getElementById(key);
        if (field && field.tagName === "SELECT") {
            value = field.options[field.selectedIndex].text;
        }

        // Append the data to the summary
        summaryHTML += `<p><strong>${formatKey(key)}:</strong> ${value}</p>`;
    }

    summaryHTML += `
    <div id="progress-container" style="margin-top: 20px;">
        <div id="progress-bar-summary" style="
            width: 100%;
            height: 20px;
            background-color: #4caf50;
        "></div>
    </div>
    <p style="text-align: center; margin-top: 10px;">Užpildyta: 100% (5 iš 5 etapų)</p>
`;

    summaryContainer.innerHTML = summaryHTML;

    // Hide the form and progress bar
    document.getElementById("survey-form").style.display = "none";
    document.getElementById("progress-container").style.display = "none";

    // Append the summary to the body
    document.body.appendChild(summaryContainer);
}

// Helper function to format keys into readable labels
function formatKey(key) {
    const keyMap = {
        sex: "Lytis",
        name: "Vardas",
        "second-name": "Antras vardas",
        surname: "Pavardė",
        "personal-code": "Asmens kodas",
        birthdate: "Gimimo data",
        education: "Išsilavinimas",
        "last-educational-institution": "Paskutinė mokslo įstaiga",
        "graduation-year": "Baigimo metai",
        qualification: "Kvalifikacija",
        "academic-degree": "Mokslo laipsnis",
        "phone-number": "Telefono numeris",
        email: "El. Paštas",
        address: "Adresas",
        "marital-status": "Vedybinė padėtis",
        "spouse-name": "Sutuoktinio vardas",
        "spouse-surname": "Sutuoktinio pavardė",
        "profession-status": "Profesinė padėtis",
        "study-level": "Studijų pakopa",
        "study-year": "Kursas",
        "study-institution": "Studijų įstaiga",
        "expected-graduation": "Tikėtini baigimo metai",
        workplace: "Darbo įstaiga",
        position: "Pareigos",
        "unemployment-reason": "Nedarbo priežastis",
        "leave-end": "Atostogų pabaiga",
        "work-experience": "Darbo patirtis",
        "work-area": "Darbo sritis",
    };

    return (
        keyMap[key] ||
        key.replace(/-/g, " ").replace(/^\w/, (c) => c.toUpperCase())
    );
}
