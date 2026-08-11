function todo() {
  function openFeatures() {
    var allElems = document.querySelectorAll(".elem");
    var fullElems = document.querySelectorAll(".FullElem");
    var closeButtons = document.querySelectorAll(".FullElem .close");

    allElems.forEach(function (elem) {
      elem.addEventListener("click", function () {
        fullElems[elem.id].style.display = "block";
      });
    });

    closeButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        fullElems[button.id].style.display = "none";
      });
    });
  }
  openFeatures();

  let form = document.querySelector(".addTask form");
  let taskInput = document.querySelector(".addTask input");
  let currentTask = [];

  if (localStorage.getItem("currentTask")) {
    currentTask = JSON.parse(localStorage.getItem("currentTask"));
  } else {
    console.log("Task List is empty");
  }

  function renderTasks() {
    var allTask = document.querySelector(".allTask");

    var sum = "";

    currentTask.forEach(function (task, index) {
      sum += `<div class="task">
    <h5>${task.Task}</h5>
    <button ${task.Completed ? "disabled" : ""} data-index="${index}">
    Mark as Complete!
    </button>
    </div>`;
    });

    allTask.innerHTML = sum;

    localStorage.setItem("currentTask", JSON.stringify(currentTask));

    document
      .querySelectorAll(".allTask .task button")
      .forEach(function (button) {
        button.addEventListener("click", function () {
          currentTask.splice(button.id, 1);
          renderTasks();
        });
      });
  }

  renderTasks();

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    currentTask.push({
      Task: taskInput.value,
      Completed: false,
    });
    taskInput.value = "";
    renderTasks();
  });
}
todo();

function dailyPlanner() {
  var dayPlanData = JSON.parse(localStorage.getItem("dayPlanData")) || {};

  var dayPlanner = document.querySelector(".dayPlanner");

  var hours = Array.from({ length: 18 }, (_, index) => {
    return `${index + 6}:00 - ${index + 7}:00`;
  });

  var wholedaysum = "";

  hours.forEach(function (elem, index) {
    var inputValue = dayPlanData[index] || "";
    wholedaysum += `<div class="dayPlannertime">
  <p>${elem}</p>
  <input id="${index}" type="text" placeholder="Task" value="${inputValue}">
  </div>`;
  });

  dayPlanner.innerHTML = wholedaysum;

  var dayPlannerInputs = document.querySelectorAll(".dayPlannertime input");
  dayPlannerInputs.forEach(function (elem) {
    elem.addEventListener("input", function () {
      dayPlanData[elem.id] = elem.value;
      localStorage.setItem("dayPlanData", JSON.stringify(dayPlanData));
    });
  });
}
dailyPlanner();

function motivation() {
  var motivationQuote = document.querySelector(".motivation-container #quote");
  var motivationAuthor = document.querySelector(
    ".motivation-container #author",
  );

  async function fetchQuote() {
    let response = await fetch(
      "https://motivational-spark-api.vercel.app/api/quotes/random",
    );
    let data = await response.json();
    motivationQuote.innerHTML = data.quote;
    motivationAuthor.innerHTML = `~ ${data.author}`;
  }
  fetchQuote();
}
motivation();

function pomodoro() {
  let totalSeconds = 25 * 60;
  let timer = document.querySelector(".pomo-timer #timer");
  var startBtn = document.querySelector(".pomo-timer .pomo-controls #start");
  var pauseBtn = document.querySelector(".pomo-timer .pomo-controls #pause");
  var resetBtn = document.querySelector(".pomo-timer .pomo-controls #reset");
  let session = document.querySelector(".pomodoro .session");
  let timerInterval = null;
  var isworkSession = true;

  function updateTimer() {
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    timer.innerHTML = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }

  updateTimer();

  function startTimer() {
    clearInterval(timerInterval);

    if (isworkSession) {
      timerInterval = setInterval(function () {
        if (totalSeconds > 0) {
          totalSeconds--;
          updateTimer();
        } else {
          isworkSession = false;
          totalSeconds = 5 * 60;
          session.innerHTML = "Break Time";
          clearInterval(timerInterval);
          updateTimer();
        }
      }, 1000);
    } else {
      timerInterval = setInterval(function () {
        if (totalSeconds > 0) {
          totalSeconds--;
          updateTimer();
        } else {
          isworkSession = true;
          session.innerHTML = "Work Session";
          clearInterval(timerInterval);
          totalSeconds = 25 * 60;
          updateTimer();
        }
      }, 1000);
    }
  }

  function pauseTimer() {
    clearInterval(timerInterval);
  }

  function resetTimer() {
    totalSeconds = 25 * 60;
    clearInterval(timerInterval);
    session.innerHTML = "Work Session";
    isworkSession = true;
    updateTimer();
  }

  startBtn.addEventListener("click", startTimer);
  pauseBtn.addEventListener("click", pauseTimer);
  resetBtn.addEventListener("click", resetTimer);
}
pomodoro();

function weather() {
  var header1Time = document.querySelector(".header1 h1");
  var header1Date = document.querySelector(".header1 h2");
  var city = "Shahada";
  var data = null;
  var header2Temp = document.querySelector(".header2 h2");
  var header2Condition = document.querySelector(".header2 h4");
  var wind = document.querySelector(".header2 .wind");
  var humidity = document.querySelector(".header2 .humidity");

  async function weatherAPIcall() {
    var response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=2600d116453343bf9ba164924261704&q=${city}`,
    );
    data = await response.json();

    header2Temp.innerHTML = ` ${data.current.temp_c}°C`;
    header2Condition.innerHTML = `${data.current.condition.text}`;
    wind.innerHTML = `Wind: ${data.current.wind_kph} km/h`;
    humidity.innerHTML = `Humidity: ${data.current.humidity}%`;
  }
  weatherAPIcall();

  function timeDate() {
    var weekDays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    var mahina = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    var date = new Date();

    var dayOfWeek = weekDays[date.getDay()];
    var Hours = [date.getHours()];
    var Minutes = [date.getMinutes()];
    var Seconds = [date.getSeconds()];
    var Tarik = [date.getDate()];
    var Month = mahina[date.getMonth()];
    var Year = [date.getFullYear()];
    header1Date.innerHTML = `${Tarik} ${Month} ${Year}`;

    if (Hours > 12) {
      header1Time.innerHTML = `${dayOfWeek}, ${String(Hours-12).padStart("2", "0")}:${String(Minutes).padStart("2", "0")}:${String(Seconds).padStart("2", "0")} PM`;
    } else {
      header1Time.innerHTML = `${dayOfWeek}, ${String(Hours).padStart("2", "0")}:${String(Minutes).padStart("2", "0")}:${String(Seconds).padStart("2", "0")} AM`;
    }
  }

  setInterval(() => {
    timeDate();
  }, 1000);
}
weather();

function theme() {
  var theme = document.querySelector(".theme");
  var rootElement = document.documentElement;

  var flag = 0;
  theme.addEventListener("click", function () {
    if (flag == 0) {
      rootElement.style.setProperty("--pri", "#181C14");
      rootElement.style.setProperty("--sec", "#3C3D37");
      rootElement.style.setProperty("--tri", "#697565");
      rootElement.style.setProperty("--tri2", "#ECDFCC");
      flag = 1;
    } else if (flag == 1) {
      rootElement.style.setProperty("--pri", "#355872");
      rootElement.style.setProperty("--sec", "#7AAACE");
      rootElement.style.setProperty("--tri", "#9CD5FF");
      rootElement.style.setProperty("--tri2", "#F7F8F0");
      flag = 2;
    } else if (flag == 2) {
      rootElement.style.setProperty("--pri", "#222831");
      rootElement.style.setProperty("--sec", "#393E46");
      rootElement.style.setProperty("--tri", "#948979");
      rootElement.style.setProperty("--tri2", "#DFD0B8");
      flag = 3;
    } else if (flag == 3) {
      rootElement.style.setProperty("--pri", "#A47251");
      rootElement.style.setProperty("--sec", "#DD9E59");
      rootElement.style.setProperty("--tri", "#F0D8A1");
      rootElement.style.setProperty("--tri2", "#DCF0C3");
      flag = 0;
    }
  });
}
theme();





// Done!