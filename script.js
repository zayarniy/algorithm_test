let testName = 'TraceTable';
let si = null;
let taskNumber = 0;
//let currentTask = 0;
let percents = 0;
let ball = 0;
let timeStart = '', timeFinish = ''
let lastName = '', firstName = '';
let countAttempt = 2;
let password = '';
const MAX_LENGTH = 6;
const targetPassword = 'qqwwee';

function load() {
    // Прослушиваем события нажатия клавиш
    comboboxInit();
    document.addEventListener('keydown', handlePasswordInput);
    //initTask();
}

function getScoreTotal() {
    return tasks.reduce((accomulator, task) => accomulator + task.balls, 0);
}

function getErrorTotal() {
    return tasks.reduce((accomulator, task) => accomulator + task.errors, 0);
}

function getScoreMaxTotal() {
    return tasks.reduce((accomulator, task) => accomulator + task.maxBalls, 0);
}

function calculatePercent() {
    let _scoreTotal = getScoreTotal();
    let _errorsTotal = getErrorTotal();
    let _scoreMaxTotal = getScoreMaxTotal();
    return parseInt(((_scoreTotal) - ((_errorsTotal) > _scoreMaxTotal ? 0 : _errorsTotal)) / ((_scoreMaxTotal) == 0 ? 1 : _scoreMaxTotal) * 100);
}

function renewTask() {

    if (countAttempt > 0) {
        score = 0;
        errors = 0;
        countAttempt--;
        tasks[taskQuery[taskNumber]].init();
        document.getElementById('colImageAlgorithm').style.display = 'block';
        document.getElementById('colCodeAlgorithm').style.display = 'none';
        infoUpdate();
        createTable();

    }
    else {
        showMessage('Внимание', 'Попытки закончились!', 'warning', false);
    }
}


function initTask() {
    score = 0;
    //currentTask = 0;
    errors = 0;
    tasks[taskQuery[taskNumber]].init();
    infoUpdate();
    createTable();
    checkTimeStart();
    checkTimeFinish();
    timerStart();
}

function timerStart() {
    si = setInterval(tick, 1000);
}

function tick() {
    document.getElementById('durationTime').innerHTML = getDurationTime();
}

function getDurationTime() {
    let diffInMilliseconds = new Date() - timeStart;
    // Преобразуем миллисекунды в часы, минуты и секунды
    let hours = String(Math.floor(diffInMilliseconds / (1000 * 60 * 60))).padStart(2, '0');
    let minutes = String(Math.floor((diffInMilliseconds % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
    let seconds = String(Math.floor((diffInMilliseconds % (1000 * 60)) / 1000)).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;

}

function finish() {
    clearInterval(si);
    checkTimeFinish();
    percents = calculatePercent();
    if (percents >= 90) ball = 5;
    if (percents >= 75 && percents < 90) ball = 4;
    if (percents >= 50 && percents < 75) ball = 3;
    if (percents < 50) ball = 2;
    showResult(percents).then((result) => {
        if (result.isConfirmed) {
            inputText("Сохранение", `Введите свое <strong>фамилию</strong> и <strong>имя</strong>:`, "Иванов Иван").then((name) => {
                if (name.isConfirmed && name.value != "") {
                    name = name.value.trim().replace(/\s+/g, " ").split(' ');
                    lastName = name[0];
                    firstName = name[1];
                    showMessage('Внимание', 'Данные сохраняются.<br>Не закрывайте окно', "warning", false);
                    sendJSONToDB();
                    setTimeout(() => window.location.reload(), 5000);
                }
                else window.location.reload();

            })

        }
        else window.location.reload();
    });

}

function next() {
    ++taskNumber;
    if (taskNumber < taskQuery.length) {
        //currentTask = taskQuery[taskNumber];
        countAttempt = 3;
        renewTask();
    }
    else {
        finish();
    }
}


function showResult(per) {
    return Swal.fire({
        title: "<strong>Результаты</strong>",
        icon: "info",
        html: `
        <div>
            <span>Качество:</span><span>${(per)}%</span>
        </div>
        <div>
            <span>Оценка:</span><span>${(ball)}</span>
        </div>
        <div>
            <span>Ошибок всего:</span><span style="color: red;">${getErrorTotal()}</span>
        </div>
        <div>
            <span>Баллов всего:</span><span>${getScoreTotal()}</span>
        </div>
        <div>
        <span>Продолжительность:</span><span>${(getDurationTime())}</span>
        </div>

        `,
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: `
           Сохранить
        `,
        cancelButtonText: 'Отлично!'
    });

}


function showMessage(captionHTML = 'info', messageHTML, icon = 'info', showCloseButton = true, confirmButtonText = `Понял`) {
    return Swal.fire({
        title: captionHTML,
        icon: icon,
        html: messageHTML,
        showCloseButton: showCloseButton,
        focusConfirm: false,
        confirmButtonText: confirmButtonText
    });

}


function inputText(title, html, inputPlaceholder) {
    return Swal.fire({
        title: title,
        html: html,
        input: 'text',
        showCancelButton: true,
        animation: "slide-from-top",
        inputPlaceholder: inputPlaceholder
    });
}

function infoUpdate(score = 0, errors = 0, scoreMax = 0) {
    document.getElementById('scores').textContent = tasks[taskQuery[taskNumber]].balls;
    document.getElementById('scoresTotal').textContent = getScoreTotal();
    document.getElementById('errors').textContent = tasks[taskQuery[taskNumber]].errors;
    document.getElementById('errorsTotal').textContent = getErrorTotal();
    document.getElementById('taskNumber').textContent = (taskNumber + 1);
    document.getElementById('scoreMax').textContent = tasks[taskQuery[taskNumber]].maxBalls;
    document.getElementById('tasksTotal').textContent = taskQuery.length;
    document.getElementById('percent').textContent = calculatePercent();
    document.getElementById('countAttempt').textContent = countAttempt;
}




function checkTimeStart() {
    timeStart = new Date();
    // var n = timeBegin.toLocaleTimeString();
    //document.getElementById("time_begin").innerHTML=n;
}

function checkTimeFinish() {
    timeFinish = new Date();
    //var n = timeEnd.toLocaleTimeString();
    //document.getElementById("time_end").innerHTML=n;
}

function sendJSONToDB() {
    // формируем данные в виде объекта
    let infoResult = {
        lastName: lastName,
        firstName: firstName,
        startTime: timeStart,
        finishTime: timeFinish,
        ball: String(ball),
        errors: String(getErrorTotal()), //String(errorsTotal),
        scoreMaxTotal: String(getScoreTotal()), //String(scoreMaxTotal),
        percent: String(percents),
        testName: testName
    };
    //console.log(infoResult);
    //console.log(JSON.stringify(infoResult))
    // отправляем данные на сервер с помощью fetch
    fetch("https://inform.xn--80ahlrjqm6azc.xn--p1ai/algorithm_test/php/db_insert.php",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(infoResult)
        }).then((response) => {
            //console.log(response)
            if (response.ok) {
                // если всё прошло успешно, выводим сообщение
                //console.log("Submit to DB");
                //console.log(response.text());
                //result.style.color = "green";
                return response.text();
            } else {
                // если возникла ошибка, выводим сообщение об ошибке
                console.log("Error saved to DB!");
                console.log(response.statusText)
                console.log(response);

                //result.style.color = "red";
            }
        }).then(data => {
            console.log(data);
        })

        .catch(error => {
            // если произошла ошибка при отправке, выводим сообщение об ошибке
            console.log("Error send data to DB");
            console.log(error)
            console.log(error.name)
            console.log(error.message)
            //result.innerHTML = "Error to DB";
            //result.style.color = "red";
        });

}


//https://inform.xn--80ahlrjqm6azc.xn--p1ai/algorithm_test/php/get_tests_results.php

function get_tests_results() {
    // Отправляем запрос на PHP-скрипт для получения данных из базы данных
    fetch('https://inform.xn--80ahlrjqm6azc.xn--p1ai/algorithm_test/php/get_tests_results.php')
        .then(response => response.json())
        .then(data => {
            // Создаем таблицу для вывода данных
            const table = document.createElement('table');
            table.classList.add('table');
            const thead = document.createElement('thead');
            const tbody = document.createElement('tbody');

            // Создаем заголовки таблицы
            const headers = Object.keys(data[0]);
            const headerRow = document.createElement('tr');
            headers.forEach(header => {
                const th = document.createElement('th');
                th.textContent = header;
                headerRow.appendChild(th);
            });
            thead.appendChild(headerRow);
            table.appendChild(thead);

            // Создаем строки данных
            data.forEach(row => {
                const dataRow = document.createElement('tr');
                Object.values(row).forEach(value => {
                    const td = document.createElement('td');
                    td.textContent = value;
                    dataRow.appendChild(td);
                });
                tbody.appendChild(dataRow);
            });
            table.appendChild(tbody);

            // Выводим таблицу в блок div с id 'tableResults'
            const resultsDiv = document.getElementById('tableResults');
            resultsDiv.innerHTML = '';
            resultsDiv.appendChild(table);
            document.getElementById('tableResults').style.display = 'block';
        })
        .catch(error => {
            console.error('Ошибка при получении данных из базы данных:', error);
        });
};


function handlePasswordInput(event) {
    const eventKey = event.key;
    const key = eventKey.toLowerCase();
    // Добавляем новую букву к строке пароля
    if (key.length == 1)
        password += key;
    console.log(password)

    // Ограничиваем длину строки пароля до MAX_LENGTH
    if (password.length > MAX_LENGTH) {
        password = password.slice(1);
    }

    // Если строка пароля совпадает с целевым паролем, вызываем функцию
    if (password === targetPassword) {
        executeFunction();
        password = ''; // Сбрасываем строку пароля после выполнения функции
    }
}

function executeFunction() {
    // Здесь можно разместить любой код, который нужно выполнить при вводе пароля
    console.log('Пароль введен успешно!');
    get_tests_results();
}

function hideTableResults() {
    document.getElementById('tableResults').style.display = 'none';
}



let comboboxInput;
let comboboxSelect;

function comboboxInit() {
    comboboxInput = document.getElementById('combobox-input');
    comboboxSelect = document.getElementById('combobox-select');

    comboboxInput.addEventListener('click', () => {
        comboboxSelect.style.display = 'block';
    });

    comboboxSelect.addEventListener('change', () => {
        comboboxInput.value = comboboxSelect.value;
        comboboxSelect.style.display = 'none';
    });

    document.addEventListener('click', (event) => {
        const isClickInside = comboboxInput.contains(event.target) || comboboxSelect.contains(event.target);
        if (!isClickInside) {
            comboboxSelect.style.display = 'none';
        }
    });
}

async function startTask(element) {
    console.log(element)
    let idElement = element.id;
    switch (idElement) {
        case 'task01':
            taskQuery = [6, 1, 0, 2, 3, 4, 5];
            break;
        case 'task02':
            taskQuery = [];
            for (let i = 0; i < tasks.length; i++) {
                taskQuery.push(i);
                taskQuery.push(i);
            }
            break;
        case 'task03':
            taskQuery = [0, 0, 0, 0, 0];
            break;
        case 'task04':
            taskQuery = [1, 1, 1, 1, 1];
            break;
        case 'task05':
            taskQuery = [2, 2, 2, 2, 2];
            break;
        case 'task06':
            taskQuery = [3, 3, 3, 3, 3];
            break;
        case 'task07':
            taskQuery = [4, 4, 4, 4, 4];
            break;
        case 'task08':
            taskQuery = [5, 5, 5, 5, 5];
            break;
        case 'task09':
            taskQuery = [6, 1, 3];
            break;
        case 'task10':
            taskQuery = [1, 1, 1];
            break;
        case 'task11':
            taskQuery = [2, 2, 2];
            break;
        case 'task12':
            taskQuery = [3, 3, 3];
            break;
        case 'task13':
            taskQuery = [4, 4, 4];
            break;
        case 'task14':
            taskQuery = [5, 5, 5];
            break;
        case 'task15':
            console.log(document.getElementById('combobox-input').value)

            let count = parseInt(document.getElementById('combobox-input').value);
            if (isNaN(count)) {
                showMessage('Внимание!', 'Введите число', 'warning');
                return;
            }
            if (count < 1 || count > 100) {
                showMessage('Внимание!', 'Введите число от 1 до 100', 'warning');
                return;
            }
            taskQuery = [];
            for (let i = 0; i < count; i++)
                taskQuery.push(getRandomInt(0, tasks.length - 1));
            console.log(taskQuery);
            break;
        case 'task16':
            let result = await inputText('Ввод заданий', 'Введите задания с номерами от 0 до 5 через запятую<br>Например:0,0,1,2,3,5', '0,1,2,3,4,5');
            if (result.isConfirmed) {
                //console.log(result)
                taskQuery = result.value.split(',').map(str => parseInt(str))
                if (!taskQuery.every(value => typeof value == 'number' && value < 6 && value >= 0)) return;
                console.log(taskQuery);
            }
            else return;
            break;
    }
    document.getElementById('selectView').style.display = 'none';
    document.getElementById('mainView').style.display = 'block';
    initTask();
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}


function startCountdown(countDown) {
    //if (training.isStartCountdown) 
    {
        let cd = document.getElementById('countDown');
        let pbf = document.getElementById('progress-bar-fill');
        si = setInterval(() => {
            if (countDown > 1) {
                countDown--;
                pbf.style.width = countDown + "%";
                cd.textContent = countDown;
            } else {
                clearInterval(si)
                countDown = 0;
                pbf.style.width = countDown + "%";
                cd.textContent = countDown;
                tasks[0].check(true);

            }
        }, 1000);
    }
}


function clearTable() {
    for (i = 1; i < data.length; i++) {
        for (j = 0; j < data[i].length; j++) {
            let el = document.getElementById(i + "" + j);
            el.value = '';
            el.style.backgroundColor = 'white';
            //el.style.color = 'black';
            //el.style=cellStyle;
        }
    }
}


function createTable() {
    let table = document.getElementById('traceTable');
    table.innerHTML = '';
    let tableCaption = document.createElement('caption')
    tableCaption.textContent = "Таблица трассировки"
    tableCaption.classList.add('text-center')
    table.appendChild(tableCaption)
    let tbody = document.createElement('tbody');

    // let rows = tbody.querySelectorAll('tr')
    //console.log(rows);
    // if (rows != null)
    //     rows.forEach(function (row) { table.removeChild(row) });

    table.appendChild(tbody)

    let row = document.createElement('tr');
    let cell = document.createElement('th');
    cell.textContent = '№';
    cell.style.width = '40px'
    row.appendChild(cell)
    for (j = 0; j < data[0].length; j++) {
        let cell = document.createElement('th');
        cell.textContent = data[0][j]
        cell.style.width = '40px'
        row.appendChild(cell)
    }
    tbody.appendChild(row);
    //let cell;
    for (i = 1; i < data.length; i++) {

        let row = document.createElement('tr');
        cell = document.createElement('td');
        cell.textContent = i;
        row.appendChild(cell)

        for (j = 0; j < data[i].length; j++) {
            let cell = document.createElement('td');
            let inp = document.createElement('input');
            inp.autocomplete = 'off';
            inp.id = i + "" + j;
            inp.style = 'width:40px';
            //inp.value = data[i][j];
            cell.appendChild(inp);
            row.appendChild(cell)
        }
        tbody.appendChild(row);
        //let computedStyle = window.getComputedStyle(cell);
        //console.log(computedStyle)
    }
}

let isHintVisible = false;

function toggleHint() {
    const hintContent = document.querySelector('.hint-content');
    const hintToggle = document.querySelector('.hint-toggle');

    if (isHintVisible) {
        hintContent.style.display = 'none';
        hintToggle.textContent = 'Подсказка';
        isHintVisible = false;
    } else {
        hintContent.style.display = 'block';
        hintToggle.textContent = 'Спрятать';
        isHintVisible = true;
    }
}



function switchBlock() {
    console.log(document.getElementById('colImageAlgorithm').style.display)
    if (document.getElementById('colImageAlgorithm').style.display == 'none') {
        document.getElementById('colImageAlgorithm').style.display = 'block';
        document.getElementById('colCodeAlgorithm').style.display = 'none';
    }
    else {
        document.getElementById('colImageAlgorithm').style.display = 'none';
        document.getElementById('colCodeAlgorithm').style.display = 'block';
    }
}
