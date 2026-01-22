// All 12 courses
const courses = [
  // Completed
  { code: "WDD130", name: "Web Fundamentals", type: "WDD", completed: true },
  { code: "WDD131", name: "JavaScript Basics", type: "WDD", completed: true },
  { code: "WDD231", name: "Advanced Web Dev", type: "WDD", completed: true },
  { code: "CSE110", name: "Intro to Programming", type: "CSE", completed: true },
  { code: "CSE111", name: "Programming Concepts", type: "CSE", completed: true },
  { code: "CSE210", name: "Data Structures", type: "CSE", completed: true },

  // Not completed yet
  { code: "CSE212", name: "Discrete Mathematics", type: "CSE", completed: false },
  { code: "CSE270", name: "Systems Programming", type: "CSE", completed: false },
  { code: "CSE300", name: "Software Engineering", type: "CSE", completed: false },
  { code: "CSE310", name: "Algorithms", type: "CSE", completed: false },
  { code: "CSE325", name: "Database Systems", type: "CSE", completed: false },
  { code: "CSE340", name: "Operating Systems", type: "CSE", completed: false }
];

const container = document.getElementById("course-container");

// Render courses
function renderCourses(list) {
  container.innerHTML = "";
  list.forEach(course => {
    const card = document.createElement("div");
    card.classList.add("course-card");
    if (course.completed) card.classList.add("completed");
    card.innerHTML = `<h3>${course.code}</h3><p>${course.name}</p>`;
    container.appendChild(card);
  });
}

// Initial render: show all
renderCourses(courses);

// Filter buttons (All, WDD, CSE)
document.querySelectorAll(".filters button").forEach(btn => {
  btn.addEventListener("click", () => {
    const filter = btn.dataset.filter;
    let filtered = courses;
    if (filter === "wdd") {
      filtered = courses.filter(c => c.type === "WDD");
    } else if (filter === "cse") {
      filtered = courses.filter(c => c.type === "CSE");
    }
    renderCourses(filtered);
  });
});

// Individual course buttons
document.querySelectorAll(".course-buttons button").forEach(btn => {
  btn.addEventListener("click", () => {
    const courseCode = btn.dataset.course;
    const filtered = courses.filter(c => c.code === courseCode);
    renderCourses(filtered);
  });
});

// Render courses
function renderCourses(list) {
  container.innerHTML = "";
  list.forEach(course => {
    const card = document.createElement("div");
    card.classList.add("course-card");
    if (course.completed) card.classList.add("completed");
    card.innerHTML = `<h3>${course.code}</h3><p>${course.name}</p>`;
    container.appendChild(card);
  });
}

// Initial render
renderCourses(courses);

// Filter buttons
document.querySelectorAll(".filters button").forEach(btn => {
  btn.addEventListener("click", () => {
    const filter = btn.dataset.filter;
    let filtered = courses;
    if (filter === "wdd") {
      filtered = courses.filter(c => c.type === "WDD");
    } else if (filter === "cse") {
      filtered = courses.filter(c => c.type === "CSE");
    }
    renderCourses(filtered);
  });
});

// Render into element with id="course-list"
const courseList = document.getElementById('course-list');

if (courseList) {
  courses.forEach(course => {
    const li = document.createElement('li');
    li.textContent = `${course.title} (${course.level})`;
    courseList.appendChild(li);
  });
}