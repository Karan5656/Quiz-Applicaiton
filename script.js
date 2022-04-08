let questionDB = [{
    number: 1,
    question: "1. What does HTML stands for?",
    answer: "label2",
    options: [
      "Hyper Text Preprocessor",
      "Hyper Text Markup Language",
      "Hyper Text Multiple Language",
      "Hyper Text Multi Language",
    ],
  },
  {
    number: 2,
    question: "2. What does CSS stands for?",
    answer: "label3",
    options: [
      "Current Style Sheets",
      "Current Shhets Style",
      "Cascading Style Sheets",
      "Cascading Sheets Sytle",
    ],
  },
  {
    number: 3,
    question: "3. Which of the following is true about Javascript?",
    answer: "label2",
    options: [
      "It is a server side scripting language",
      "It is client side scripting language",
      "It is a Software",
      "It is a database",
    ],
  },
  {
    number: 4,
    question: "4. SQL stands for",
    answer: "label1",
    options: [
      "Structured Query Language",
      "Statistical Query Language",
      "Standard Query Language",
      "Superior Query Language",
    ],
  },
  {
    number: 5,
    question: "5. What does PHP stands for?",
    answer: "label4",
    options: [
      "Preprocessor Home Page",
      "Pretext Hypertext Processor",
      "Personal Hyper Processor",
      "Hypertext Preprocessor",
    ],
  },
];

var userName = document.querySelector("#nameInput");
var email = document.querySelector("#emailInput");

const logIn = document.querySelector(".log-in");
const quiz = document.querySelector(".quiz");
const form = document.getElementById("login-form");

const question = document.querySelector(".question");
const label1 = document.querySelector("#label1");
const label2 = document.querySelector("#label2");
const label3 = document.querySelector("#label3");
const label4 = document.querySelector("#label4");

var questionCount = 0;
var userAnswer = [];
var totalMarks = 0;

// Start quiz button onclick event 
function startQuiz() {

  form.addEventListener("submit", (e) => {
    e.preventDefault();
  });
  if (userName.value && email.value) {
    logIn.style.display = "none";
    quiz.style.display = "block";
    nextQuestion();
  }
}

// Load question when called
function loadQuestion() {
  const questionList = questionDB[questionCount];

  question.innerText = questionList.question;
  label1.innerText = questionList.options[0];
  label2.innerText = questionList.options[1];
  label3.innerText = questionList.options[2];
  label4.innerText = questionList.options[3];

  var progress = questionCount * 20;
  document.querySelector("#progressBar").style.width = progress + "%";
}

// For next question button onclick event
function nextQuestion() {
  const formOption = document.getElementById("option-form");
  var option = Array.from(document.getElementsByName("option"));
  document.getElementById("nextQue").disabled = true;
  // Store user answer to 'userAnswer' array 
  option.forEach((a) => {
    if (a.checked) {
      userAnswer.push(a.value);
    }
  });
  //loadQuestion if question count is less than total question available
  if (questionCount < questionDB.length) {
    loadQuestion();
  }
  // Change button from 'next question' to 'show result' when last question is appeared 
  if (questionCount == questionDB.length - 1) {
    document.getElementById("nextQue").innerText = "Show Result";
  }
  // When show result button is clicked
  if (questionCount == questionDB.length) {
    document.querySelector(".quiz").style.display = "none";
    document.querySelector(".result").style.display = "block";
    showResult();
  }
  // Question count increases after button is clicked
  questionCount++;

  option.forEach((a) => (a.checked = false));

  formOption.addEventListener("submit", (e) => {
    e.preventDefault();
  });
}

// For skip question button onclick event
function skipQuestion() {
  userAnswer.push("skipped");

  if (questionCount < questionDB.length) {
    loadQuestion();
  }

  if (questionCount == questionDB.length - 1) {
    document.getElementById("nextQue").innerText = "Show Result";
  }

  if (questionCount == questionDB.length) {
    document.querySelector(".quiz").style.display = "none";
    document.querySelector(".result").style.display = "block";
    showResult();
  }

  questionCount++;
}
// Enable next question button if user have selected one answer
function enableButton() {
  document.getElementById("nextQue").disabled = false;
}

// Show result after all question attemeted
function showResult() {
  var container = document.querySelector(".container");

  //Here all options has different id from[id=label1 to id=label20]
  //label 20 is last question's last option 
  //5 question * 4 options = total 20 options
  for (i = 0; i < questionDB.length; i++) {
    container.innerHTML +=
      `<div class="question mt-5" id="question">
        <span>` + questionDB[i].question + `</span>
      </div>
      <div class="icon d-flex justify-content-end" id="icon` + i + `"></div>
      <div class="option-list">

        <div class="option my-3">
          <div class="label" id="label` + (1 + 4 * i) + `">
            <span>` + questionDB[i].options[0] + `</span>
          </div>
        </div>
        <div class="option my-3">
          <div class="label" id="label` + (2 + 4 * i) + `">
            <span>` + questionDB[i].options[1] + `</span>
          </div>
        </div>
        <div class="option my-3">
          <div class="label" id="label` + (3 + 4 * i) + `">
            <span>` + questionDB[i].options[2] + `</span>
          </div>
        </div>
        <div class="option my-3">
          <div class="label" id="label` + (4 + 4 * i) + `">
            <span>` + questionDB[i].options[3] + `</span>
          </div>
        </div>
      </div>`;
    styleResult(i);
  }
  console.log(userName)
  document.getElementById('name-marks').innerText = "" + userName.value + " have scored " + totalMarks + " marks"
}

// Here i = question number - 1
function styleResult(i) {
  var answer = questionDB[i].answer; // answer = label3
  answer = "label" + (parseInt(answer.substring(5)) + 4 * i); // answer.substring(5) = 3
  var answerStyle = document.querySelector(".result #" + answer + "").style;

  if (userAnswer[i] != 'skipped') {
    userAnswer[i] = "label" + (parseInt(userAnswer[i].substring(5)) + 4 * i);
    var wrongAnswerStyle = document.querySelector(".result #" + userAnswer[i] + "").style;
  }

  console.log(userAnswer[i] + '-->' + answer)
  // if answer given by user is true
  if (userAnswer[i] == answer) {
    answerStyle.color = "var(--bs-green)";
    answerStyle.border = "1px solid var(--bs-green)";
    answerStyle.background = "rgba(25, 135, 84,0.2)";
    document.querySelector(".result #icon" + i + "").innerHTML =
      `<p class="icon">Correct</p><i class="fa-solid fa-circle-check ms-1 icon"></i>`;
    // totalMarks increases if answer is true  
    totalMarks++;
  }
  // if answer given by user is false or user skipped 
  else {
    answerStyle.color = "var(--bs-green)";
    answerStyle.border = "1px solid var(--bs-green)";
    answerStyle.background = "rgba(25, 135, 84,0.2)";
    document.querySelector(".result #icon" + i + "").innerHTML =
      `<p class="icon-skipped">Skipped</p><i class="fa-solid fa-circle-xmark ms-1 icon-skipped"></i>`;

    // if answer given by user is false
    if (userAnswer[i] != "skipped") {
      wrongAnswerStyle.color = "var(--bs-red)"
      wrongAnswerStyle.border = "1px solid var(--bs-red)"
      wrongAnswerStyle.background = "rgba(220, 53, 69, 0.2)"

      document.querySelector(".result #icon" + i + "").innerHTML =
        `<p class="icon-false">Wrong</p><i class="fa-solid fa-circle-xmark ms-1 icon-false"></i></span>`;
    }
  }
}