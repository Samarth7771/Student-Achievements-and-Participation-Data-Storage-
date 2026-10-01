/* =========================================================
   STUDENT ACHIEVEMENT MANAGEMENT SYSTEM
   ========================================================= */

/* =========================================================
   LOGIN TYPE SELECTION
   ========================================================= */

function selectLoginType(type) {

    const loginType =
        document.getElementById(
            "loginType"
        );

    const loginFormContainer =
        document.getElementById(
            "loginFormContainer"
        );

    const selectedLoginTitle =
        document.getElementById(
            "selectedLoginTitle"
        );

    const selectedLoginIcon =
        document.getElementById(
            "selectedLoginIcon"
        );

    const usernameLabel =
        document.getElementById(
            "usernameLabel"
        );

    const loginUsername =
        document.getElementById(
            "loginUsername"
        );

    const loginHelp =
        document.getElementById(
            "loginHelp"
        );


    /* Store selected login */

    loginType.value =
        type;


    /* ================= TEACHER ================= */

    if (type === "teacher") {

        selectedLoginTitle.textContent =
            "Teacher Login";

        selectedLoginIcon.textContent =
            "👨‍🏫";

        usernameLabel.textContent =
            "Teacher Username";

        loginUsername.placeholder =
            "Enter teacher username";

        loginHelp.textContent =
            "Authorized teachers can manage all achievement records and reports.";

    }


    /* ================= STUDENT ================= */

    if (type === "student") {

        selectedLoginTitle.textContent =
            "Student Login";

        selectedLoginIcon.textContent =
            "🎓";

        usernameLabel.textContent =
            "Student Roll Number";

        loginUsername.placeholder =
            "Enter your roll number";

        loginHelp.textContent =
            "Students can submit achievements and access only their own records.";

    }


    /* Show login form */

    document
        .querySelector(".login-type-container")
        .classList.add("hidden");


    document
        .querySelector(".login-heading")
        .classList.add("hidden");


    loginFormContainer
        .classList.remove("hidden");


    loginUsername.focus();

}


/* =========================================================
   BACK TO LOGIN SELECTION
   ========================================================= */

function showLoginSelection() {

    const loginFormContainer =
        document.getElementById(
            "loginFormContainer"
        );


    loginFormContainer
        .classList.add("hidden");


    document
        .querySelector(".login-type-container")
        .classList.remove("hidden");


    document
        .querySelector(".login-heading")
        .classList.remove("hidden");


    document.getElementById(
        "loginUsername"
    ).value = "";


    document.getElementById(
        "loginPassword"
    ).value = "";


    document.getElementById(
        "loginType"
    ).value = "";

}


   
/* ================= LOGIN DETAILS ================= */

const TEACHER_USERNAME =
  "vsit@college.edu";

const TEACHER_PASSWORD =
  "vsit@123";


/* ================= STUDENT ACCOUNTS ================= */

const STUDENTS = {

  "vsit.student@college": {
    name: "Welcome",
    classDept: "Student",
    password: "student@123"
  },

  "26302F0008": {
    name: "Student Two",
    classDept: "FYIT F",
    password: "Student@123"
  },

  "26302F0009": {
    name: "Student Three",
    classDept: "FYIT F",
    password: "Student@456"
  },

  "26302F0010": {
    name: "Student Four",
    classDept: "FYIT F",
    password: "Student@789"
  }

};


/* ================= STORAGE ================= */

const STORAGE_KEY =
  "student-achievement-records";

const AUTH_KEY =
  "student-achievement-auth";

const ROLE_KEY =
  "student-achievement-role";

const USER_KEY =
  "student-achievement-user";


/* ================= ELEMENTS ================= */

const loginSection =
  document.getElementById(
    "loginSection"
  );

const appSection =
  document.getElementById(
    "appSection"
  );

const loginForm =
  document.getElementById(
    "loginForm"
  );

const logoutBtn =
  document.getElementById(
    "logoutBtn"
  );

const recordForm =
  document.getElementById(
    "recordForm"
  );

const recordsPanel =
  document.getElementById(
    "recordsPanel"
  );

const studentFormPanel =
  document.getElementById(
    "studentFormPanel"
  );

const reportsSection =
  document.getElementById(
    "reportsSection"
  );

const recordsList =
  document.getElementById(
    "recordsList"
  );

const searchInput =
  document.getElementById(
    "searchInput"
  );

const filterCategory =
  document.getElementById(
    "filterCategory"
  );

const filterAcademicYear =
  document.getElementById(
    "filterAcademicYear"
  );


/* ================= RECORDS ================= */

let records =
  JSON.parse(
    localStorage.getItem(
      STORAGE_KEY
    )
  ) || [];


/* ================= HELPERS ================= */

function getRole() {

  return localStorage.getItem(
    ROLE_KEY
  );

}


function getCurrentUser() {

  return localStorage.getItem(
    USER_KEY
  );

}


function isLoggedIn() {

  return (
    localStorage.getItem(
      AUTH_KEY
    ) === "true"
  );

}


function saveRecords() {

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(records)
  );

}


function formatDate(date) {

  if (!date) {
    return "-";
  }

  return new Date(
    date + "T00:00:00"
  ).toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric"
    }
  );

}


/* =========================================================
   LOGIN
   ========================================================= */

loginForm.addEventListener(
  "submit",
  function (event) {

    event.preventDefault();


    const type =
      document.getElementById(
        "loginType"
      ).value;


    const username =
      document.getElementById(
        "loginUsername"
      ).value.trim();


    const password =
      document.getElementById(
        "loginPassword"
      ).value.trim();


    /* ================= TEACHER ================= */

    if (type === "teacher") {

      if (
        username ===
          TEACHER_USERNAME &&
        password ===
          TEACHER_PASSWORD
      ) {

        loginSuccess(
          "teacher",
          username
        );

        return;

      }


      alert(
        "Invalid teacher username or password."
      );

      return;

    }


    /* ================= STUDENT ================= */

    if (type === "student") {

      const student =
        STUDENTS[username];


      if (
        student &&
        student.password ===
          password
      ) {

        loginSuccess(
          "student",
          username
        );

        return;

      }


      alert(
        "Invalid student roll number or password."
      );

    }

  }
);


/* =========================================================
   LOGIN SUCCESS
   ========================================================= */

function loginSuccess(
  role,
  username
) {

  localStorage.setItem(
    AUTH_KEY,
    "true"
  );

  localStorage.setItem(
    ROLE_KEY,
    role
  );

  localStorage.setItem(
    USER_KEY,
    username
  );


  showApplication();


  if (role === "student") {

    setupStudent();

  } else {

    setupTeacher();

  }


  renderRecords();

  updateStatistics();

  generateReport();

}


/* =========================================================
   SHOW APPLICATION
   ========================================================= */

function showApplication() {

  loginSection.classList.add(
    "hidden"
  );

  appSection.classList.remove(
    "hidden"
  );

  logoutBtn.classList.remove(
    "hidden"
  );

}


/* =========================================================
   STUDENT SETUP
   ========================================================= */

function setupStudent() {

  const roll =
    getCurrentUser();

  const student =
    STUDENTS[roll];


  if (!student) {
    return;
  }


  /* Welcome */

  document.getElementById(
    "welcomeName"
  ).textContent =
    student.name;


  document.getElementById(
    "welcomeInfo"
  ).textContent =
    `${roll} • ${student.classDept}`;


  document.getElementById(
    "roleBadge"
  ).textContent =
    "Student";


  /* Student can submit form */

  studentFormPanel.classList.remove(
    "hidden"
  );


  /* Student should NOT see complete records */

  recordsPanel.classList.add(
    "hidden"
  );


  /* Reports hidden from student */

  reportsSection.classList.add(
    "hidden"
  );


  /* Fill own details */

  const studentName =
    document.getElementById(
      "studentName"
    );

  const rollNumber =
    document.getElementById(
      "rollNumber"
    );

  const classDept =
    document.getElementById(
      "classDept"
    );


  studentName.value =
    student.name;

  rollNumber.value =
    roll;

  classDept.value =
    student.classDept;


  studentName.readOnly =
    true;

  rollNumber.readOnly =
    true;

  classDept.readOnly =
    true;

}


/* =========================================================
   TEACHER SETUP
   ========================================================= */

function setupTeacher() {

  document.getElementById(
    "welcomeName"
  ).textContent =
    "Teacher Dashboard";


  document.getElementById(
    "welcomeInfo"
  ).textContent =
    "Manage all student achievement records";


  document.getElementById(
    "roleBadge"
  ).textContent =
    "Teacher";


  studentFormPanel.classList.remove(
    "hidden"
  );


  recordsPanel.classList.remove(
    "hidden"
  );


  reportsSection.classList.remove(
    "hidden"
  );


  document.getElementById(
    "studentName"
  ).readOnly = false;


  document.getElementById(
    "rollNumber"
  ).readOnly = false;


  document.getElementById(
    "classDept"
  ).readOnly = false;

}


/* =========================================================
   SAVE RECORD
   ========================================================= */

recordForm.addEventListener(
  "submit",
  async function (event) {

    event.preventDefault();


    const role =
      getRole();

    const currentUser =
      getCurrentUser();


    let studentName =
      document.getElementById(
        "studentName"
      ).value.trim();


    let rollNumber =
      document.getElementById(
        "rollNumber"
      ).value.trim();


    let classDept =
      document.getElementById(
        "classDept"
      ).value.trim();


    /* ================= SECURITY ================= */

    if (role === "student") {

      const student =
        STUDENTS[currentUser];


      if (!student) {

        alert(
          "Student account not found."
        );

        return;

      }


      /* Force logged-in student's details */

      studentName =
        student.name;

      rollNumber =
        currentUser;

      classDept =
        student.classDept;

    }


    /* ================= FILE ================= */

    const fileInput =
      document.getElementById(
        "certificate"
      );


    let documentData = "";


    if (
      fileInput.files &&
      fileInput.files[0]
    ) {

      const file =
        fileInput.files[0];


      /* Limit size */

      if (
        file.size >
        5 * 1024 * 1024
      ) {

        alert(
          "Certificate file must be below 5 MB."
        );

        return;

      }


      documentData =
        await readFileAsDataURL(
          file
        );

    }


    /* ================= RECORD ================= */

    const newRecord = {

      id:
        Date.now(),

      studentName:
        studentName,

      rollNumber:
        rollNumber,

      classDept:
        classDept,

      category:
        document.getElementById(
          "category"
        ).value,

      eventName:
        document.getElementById(
          "eventName"
        ).value.trim(),

      level:
        document.getElementById(
          "level"
        ).value,

      achievementDate:
        document.getElementById(
          "achievementDate"
        ).value,

      academicYear:
        document.getElementById(
          "academicYear"
        ).value,

      result:
        document.getElementById(
          "result"
        ).value.trim(),

      description:
        document.getElementById(
          "description"
        ).value.trim(),

      documentData:
        documentData

    };


    records.push(
      newRecord
    );


    saveRecords();


    /* ================= MESSAGE ================= */

    const message =
      document.getElementById(
        "successMessage"
      );


    message.textContent =
      "Achievement record saved successfully.";


    message.classList.remove(
      "hidden"
    );


    setTimeout(
      () => {

        message.classList.add(
          "hidden"
        );

      },
      3000
    );


    /* ================= UPDATE ================= */

    renderRecords();

    updateStatistics();

    generateReport();


    /* Clear fields */

    document.getElementById(
      "eventName"
    ).value = "";

    document.getElementById(
      "level"
    ).value = "";

    document.getElementById(
      "achievementDate"
    ).value = "";

    document.getElementById(
      "academicYear"
    ).value = "";

    document.getElementById(
      "result"
    ).value = "";

    document.getElementById(
      "description"
    ).value = "";

    fileInput.value = "";

  }
);


/* ================= FILE READER ================= */

function readFileAsDataURL(
  file
) {

  return new Promise(
    (resolve, reject) => {

      const reader =
        new FileReader();


      reader.onload =
        () => resolve(
          reader.result
        );


      reader.onerror =
        reject;


      reader.readAsDataURL(
        file
      );

    }
  );

}


/* =========================================================
   RENDER RECORDS
   ========================================================= */

function renderRecords() {

  if (!recordsList) {
    return;
  }


  let visibleRecords =
    [...records];


  const role =
    getRole();


  const currentUser =
    getCurrentUser();


  /* ================= STUDENT FILTER ================= */

  if (role === "student") {

    visibleRecords =
      visibleRecords.filter(
        record =>
          record.rollNumber ===
          currentUser
      );

  }


  /* ================= SEARCH ================= */

  const search =
    searchInput.value
      .trim()
      .toLowerCase();


  if (search) {

    visibleRecords =
      visibleRecords.filter(
        record =>

          record.studentName
            .toLowerCase()
            .includes(search)

          ||

          record.rollNumber
            .toLowerCase()
            .includes(search)

          ||

          record.eventName
            .toLowerCase()
            .includes(search)

          ||

          record.category
            .toLowerCase()
            .includes(search)

      );

  }


  /* ================= CATEGORY ================= */

  const category =
    filterCategory.value;


  if (
    category &&
    category !== "All"
  ) {

    visibleRecords =
      visibleRecords.filter(
        record =>
          record.category ===
          category
      );

  }


  /* ================= ACADEMIC YEAR ================= */

  const year =
    filterAcademicYear.value;


  if (
    year &&
    year !== "All"
  ) {

    visibleRecords =
      visibleRecords.filter(
        record =>
          record.academicYear ===
          year
      );

  }


  /* ================= EMPTY ================= */

  if (
    visibleRecords.length === 0
  ) {

    recordsList.innerHTML = `

      <div class="empty-state">

        No achievement records found.

      </div>

    `;

    return;

  }


  /* ================= DISPLAY ================= */

  recordsList.innerHTML =
    visibleRecords
      .map(
        record => `

        <article class="record-item">

          <div class="record-header">

            <div>

              <h3>
                ${escapeHTML(
                  record.studentName
                )}
              </h3>

              <div class="meta">

                <span>
                  ${escapeHTML(
                    record.rollNumber
                  )}
                </span>

                <span>
                  ${escapeHTML(
                    record.classDept
                  )}
                </span>

              </div>

            </div>


            <span class="tag">

              ${escapeHTML(
                record.category
              )}

            </span>

          </div>


          <div class="meta">

            <span>
              ${escapeHTML(
                record.eventName
              )}
            </span>

            <span>
              ${escapeHTML(
                record.level
              )}
            </span>

            <span>
              ${formatDate(
                record.achievementDate
              )}
            </span>

            <span>
              Academic Year:
              ${escapeHTML(
                record.academicYear
              )}
            </span>

          </div>


          <p>

            <strong>
              ${escapeHTML(
                record.result
              )}
            </strong>

            —
            ${escapeHTML(
              record.description
            )}

          </p>


          ${
            record.documentData

              ? `

                <a
                  class="doc-link"
                  href="${record.documentData}"
                  target="_blank">

                  View Certificate

                </a>

              `

              : ""

          }


          ${
            role === "teacher"

              ? `

                <div class="record-actions">

                  <button
                    class="edit-btn"
                    onclick="editRecord(${record.id})">

                    Edit

                  </button>


                  <button
                    class="delete-btn"
                    onclick="deleteRecord(${record.id})">

                    Delete

                  </button>

                </div>

              `

              : ""

          }

        </article>

      `
      )
      .join("");

}


/* =========================================================
   EDIT RECORD
   ========================================================= */

function editRecord(id) {

  if (
    getRole() !== "teacher"
  ) {

    return;

  }


  const record =
    records.find(
      item => item.id === id
    );


  if (!record) {
    return;
  }


  document.getElementById(
    "studentName"
  ).value =
    record.studentName;


  document.getElementById(
    "rollNumber"
  ).value =
    record.rollNumber;


  document.getElementById(
    "classDept"
  ).value =
    record.classDept;


  document.getElementById(
    "category"
  ).value =
    record.category;


  document.getElementById(
    "eventName"
  ).value =
    record.eventName;


  document.getElementById(
    "level"
  ).value =
    record.level;


  document.getElementById(
    "achievementDate"
  ).value =
    record.achievementDate;


  document.getElementById(
    "academicYear"
  ).value =
    record.academicYear;


  document.getElementById(
    "result"
  ).value =
    record.result;


  document.getElementById(
    "description"
  ).value =
    record.description;


  /* Remove old record */

  records =
    records.filter(
      item => item.id !== id
    );


  saveRecords();

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });


  renderRecords();

  updateStatistics();

}


/* =========================================================
   DELETE
   ========================================================= */

function deleteRecord(id) {

  if (
    getRole() !== "teacher"
  ) {

    return;

  }


  const confirmDelete =
    confirm(
      "Are you sure you want to delete this achievement record?"
    );


  if (!confirmDelete) {
    return;
  }


  records =
    records.filter(
      record =>
        record.id !== id
    );


  saveRecords();

  renderRecords();

  updateStatistics();

  generateReport();

}


/* =========================================================
   STATISTICS
   ========================================================= */

function updateStatistics() {

  let data =
    [...records];


  if (
    getRole() === "student"
  ) {

    data =
      data.filter(
        record =>
          record.rollNumber ===
          getCurrentUser()
      );

  }


  document.getElementById(
    "totalRecords"
  ).textContent =
    data.length;


  document.getElementById(
    "academicCount"
  ).textContent =
    data.filter(
      r =>
        r.category ===
        "Academic"
    ).length;


  document.getElementById(
    "technicalCount"
  ).textContent =
    data.filter(
      r =>
        r.category ===
        "Technical"
    ).length;


  document.getElementById(
    "miscCount"
  ).textContent =

    data.filter(
      r =>
        [
          "Sports",
          "Cultural",
          "Extracurricular"
        ].includes(
          r.category
        )
    ).length;

}


/* =========================================================
   REPORT
   ========================================================= */

const reportYear =
  document.getElementById(
    "reportAcademicYear"
  );

const generateReportBtn =
  document.getElementById(
    "generateReportBtn"
  );

const reportTableBody =
  document.getElementById(
    "reportTableBody"
  );


generateReportBtn.addEventListener(
  "click",
  generateReport
);


reportYear.addEventListener(
  "change",
  generateReport
);


function generateReport() {

  if (
    getRole() !== "teacher"
  ) {

    return;

  }


  const selectedYear =
    reportYear.value;


  let reportRecords =
    [...records];


  if (
    selectedYear !== "All"
  ) {

    reportRecords =
      reportRecords.filter(
        record =>
          record.academicYear ===
          selectedYear
      );

  }


  /* ================= SUMMARY ================= */

  document.getElementById(
    "reportSummary"
  ).classList.remove(
    "hidden"
  );


  document.getElementById(
    "reportYear"
  ).textContent =
    selectedYear === "All"
      ? "All Years"
      : selectedYear;


  document.getElementById(
    "reportTotal"
  ).textContent =
    reportRecords.length;


  /* ================= EMPTY ================= */

  if (
    reportRecords.length === 0
  ) {

    reportTableBody.innerHTML = `

      <tr>

        <td
          colspan="8"
          class="empty-table">

          No achievements found
          for ${selectedYear}.

        </td>

      </tr>

    `;

    return;

  }


  /* ================= TABLE ================= */

  reportTableBody.innerHTML =
    reportRecords
      .map(
        (record, index) => `

        <tr>

          <td>
            ${index + 1}
          </td>

          <td>
            ${escapeHTML(
              record.studentName
            )}
          </td>

          <td>
            ${escapeHTML(
              record.rollNumber
            )}
          </td>

          <td>
            ${escapeHTML(
              record.category
            )}
          </td>

          <td>
            ${escapeHTML(
              record.eventName
            )}
          </td>

          <td>
            ${escapeHTML(
              record.level
            )}
          </td>

          <td>
            ${escapeHTML(
              record.result
            )}
          </td>

          <td>
            ${escapeHTML(
              record.academicYear
            )}
          </td>

        </tr>

      `
      )
      .join("");

}


/* =========================================================
   SEARCH / FILTER
   ========================================================= */

searchInput.addEventListener(
  "input",
  renderRecords
);


filterCategory.addEventListener(
  "change",
  renderRecords
);


filterAcademicYear.addEventListener(
  "change",
  renderRecords
);


/* =========================================================
   RESET FORM
   ========================================================= */

document.getElementById(
  "resetFormBtn"
).addEventListener(
  "click",
  function () {

    recordForm.reset();


    if (
      getRole() === "student"
    ) {

      setupStudent();

    }

  }
);


/* =========================================================
   LOGOUT
   ========================================================= */

logoutBtn.addEventListener(
  "click",
  function () {

    localStorage.removeItem(
      AUTH_KEY
    );

    localStorage.removeItem(
      ROLE_KEY
    );

    localStorage.removeItem(
      USER_KEY
    );


    window.location.reload();

  }
);


/* =========================================================
   SECURITY / HTML
   ========================================================= */

function escapeHTML(value) {

  if (value === null ||
      value === undefined) {

    return "";

  }


  return String(value)

    .replace(
      /&/g,
      "&amp;"
    )

    .replace(
      /</g,
      "&lt;"
    )

    .replace(
      />/g,
      "&gt;"
    )

    .replace(
      /"/g,
      "&quot;"
    )

    .replace(
      /'/g,
      "&#039;"
    );

}


/* =========================================================
   INITIAL LOAD
   ========================================================= */

if (
  isLoggedIn()
) {

  showApplication();


  if (
    getRole() ===
    "student"
  ) {

    setupStudent();

  } else {

    setupTeacher();

  }


  renderRecords();

  updateStatistics();

  generateReport();

}