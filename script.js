// Sample data
const data = {
    'sulaymaniyah': {
        'جامعة السليمانية': {
            'كلية الطب': {
                'طب عام': { zankoline: 97.6, parallel: 96.6 },
                'طب اسنان': { zankoline: 96.3, parallel: 95.6 },
                'صيدلة': { zankoline: 95.6, parallel: 95.2 },
                'تمريض': { zankoline: 94, parallel: 93 },
                'طب بيطري': { zankoline: 90, parallel: 87.6 }
            }
        }
    },
    'erbil': {
        "جامعة هولير الطبية": {
            "كلية الطب": {
                "طب عام": { zankoline: 96.8, parallel: 95.6 },
                "طب الأسنان": { zankoline: 95.3, parallel: 95.0 },
"صيدلة": { zankoline: 94.6, parallel: 100.3 }          
}
        }
    }
};

// Function to update departments based on the selected city and grade
function getDepartmentsByGrade(city, grade) {
    const universities = data[city];
    const allDepartments = [];

    // Collect departments with grades within the acceptable range
    Object.keys(universities).forEach(university => {
        Object.keys(universities[university]).forEach(college => {
            Object.keys(universities[university][college]).forEach(department => {
                const grades = universities[university][college][department];
                if (grades.zankoline <= grade && grades.zankoline >= grade - 5) {
                    allDepartments.push({
                        department: department,
                        college: college,
                        university: university,
                        zankoline: grades.zankoline,
                        parallel: grades.parallel
                    });
                }
            });
        });
    });

    // Sort departments by zankoline grade in descending order
    allDepartments.sort((a, b) => b.zankoline - a.zankoline);

    return allDepartments;
}

// Function to show notification message
function showNotification() {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = 'هذه الأقسام أقل بـ 5 درجات من معدلك فقط.';
    document.body.appendChild(notification);

    // Animate the notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    // Hide the notification after 4 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300); // Remove from DOM after fade out
    }, 4000);
}

// Function to display results
function displayResults() {
    const city = document.getElementById('city').value;
    const grade = parseFloat(document.getElementById('grade').value);
    const departmentsList = document.getElementById('departments-list');

    if (city && !isNaN(grade) && data[city]) {
        const departments = getDepartmentsByGrade(city, grade);

        // Clear previous results
        departmentsList.innerHTML = '';

        // Display departments
        departments.forEach(dept => {
            const div = document.createElement('div');
            div.className = 'department-item';

            const zankolineColor = dept.zankoline <= grade ? 'green' : 'red';
            const parallelColor = dept.parallel <= grade ? 'green' : 'red';

            div.innerHTML = `
                <strong>الجامعة:</strong> ${dept.university} <br>
                <strong>الكلية:</strong> ${dept.college} <br>
                <strong>القسم:</strong> ${dept.department} <br>
                <strong>معدل زانكولاين:</strong> <span style="color: ${zankolineColor};">${dept.zankoline}</span> <br>
                <strong>معدل باراليل:</strong> <span style="color: ${parallelColor};">${dept.parallel}</span>
            `;
            departmentsList.appendChild(div);
        });

        // Show notification
        showNotification();
    } else {
        departmentsList.innerHTML = '<p>الرجاء إدخال المعدل واختيار المدينة.</p>';
    }
}





// Star animation
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.querySelector('.stars').appendChild(canvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
let numStars = 100;

function initStars() {
    for (let i = 0; i < numStars; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            z: Math.random() * canvas.width
        });
    }
}

function moveStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < stars.length; i++) {
        stars[i].z -= 2;
        if (stars[i].z <= 0) {
            stars[i].z = canvas.width;
        }

        const k = 128.0 / stars[i].z;
        const px = stars[i].x * k + canvas.width / 2;
        const py = stars[i].y * k + canvas.height / 2;

        if (px >= 0 && px <= canvas.width && py >= 0 && py <= canvas.height) {
            const size = (1 - stars[i].z / canvas.width) * 5;
            const shade = parseInt((1 - stars[i].z / canvas.width) * 255);
            ctx.fillStyle = `rgb(${shade}, ${shade}, 255)`; // Blueish stars
            ctx.beginPath();
            ctx.arc(px, py, size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    requestAnimationFrame(moveStars);
}

initStars();
moveStars();
