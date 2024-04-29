let testName = 'TraceTable';
let score = 0;
let si = null;
let scoreTotal = 0;
let errorsTotal = 0;
let taskNumber = 0;
let scoreMax = 0;
let currentTask;
let percents = 0;
let scoreMaxTotal = 0;
let timeStart = '', timeFinish = ''
let lastName = '', firstName = '';
let ball = 0;
let password = '';
const MAX_LENGTH = 6;
const targetPassword = 'qqwwee';


function load() {
    // Прослушиваем события нажатия клавиш
    comboboxInit();
    document.addEventListener('keydown', handlePasswordInput);
    checkTimeStart();
    checkTimeFinish();
}

function init(next = true) {

    if (taskNumber != taskQuery.length) {
        currentTask = taskQuery[taskNumber];
        if (next) {
            taskNumber++;
            scoreTotal += score;
            scoreMaxTotal += scoreMax;
        }
        else {

        }
        score = 0;
        tasks[currentTask].init();
        //if (si != null) clearInterval(si);
        //startCountdown(100);
        infoUpdate();
        createTable();
    }
    else {
        checkTimeFinish();
        percents = parseInt((scoreTotal - errorsTotal) / scoreMaxTotal * 100);
        if (percents >= 90) ball = 5;
        if (percents >= 80 && percents < 90) ball = 4;
        if (percents >= 65 && percents < 80) ball = 3;
        if (percents < 65) ball = 2;
        showResult(percents).then((result) => {
            if (result.isConfirmed) {
                inputText("Сохранение", `Введите свое <strong>фамилию</strong> и <strong>имя</strong>:`, "Иванов Иван").then((name) => {
                    if (name.value != "") {
                        name = name.value.trim().replace(/\s+/g, " ").split(' ');
                        lastName = name[0];
                        firstName = name[1];
                        showMessage('Внимание', 'Данные сохраняются.<br>Не закрывайте окно', "warning", false);
                        sendJSONToDB();
                        setTimeout(() => window.location.reload(), 5000);
                    };

                })

            }
            else window.location.reload();
        });
    }
}


function next() {
    init();
}


function showResult(per) {
    return Swal.fire({
        title: "<strong>Результаты теста</strong>",
        icon: "info",
        html: `
        <div>
            <span>Ошибок всего:</span><span style="color: red;">${errorsTotal}</span>
        </div>
        <div>
            <span>Баллов всего:</span><span>${scoreTotal}</span>
        </div>
        <div>
            <span>Процент выполнения:</span><span>${(per)}%</span>
        </div>
        <div>
            <span>Оценка:</span><span>${(ball)}</span>
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

function infoUpdate() {
    document.getElementById('scores').textContent = score;
    document.getElementById('scoresTotal').textContent = scoreTotal;
    document.getElementById('errorsTotal').textContent = errorsTotal;
    document.getElementById('taskNumber').textContent = taskNumber;
    document.getElementById('scoreMax').textContent = scoreMax;
    document.getElementById('tasksTotal').textContent = taskQuery.length;
    document.getElementById('percent').textContent = parseInt((scoreTotal - errorsTotal) / (scoreMaxTotal == 0 ? 1 : scoreMaxTotal) * 100);
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
        errors: String(errorsTotal),
        scoreMaxTotal: String(scoreMaxTotal),
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
                console.log("Error to DB!");
                console.log(response.statusText)
                console.log(response);

                //result.style.color = "red";
            }
        }).then(data => {
            console.log(data);
        })

        .catch(error => {
            // если произошла ошибка при отправке, выводим сообщение об ошибке
            console.log("Error to DB");
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
    const key = event.key.toLowerCase();

    // Добавляем новую букву к строке пароля
    password += key;

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
            taskQuery = [0, 1, 2, 3, 4, 5];
            break;
        case 'task02':
            taskQuery = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5];
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
            taskQuery = [0, 0, 0];
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
                taskQuery.push(getRandomInt(1, 5));
            console.log(taskQuery);
            break;
        case 'task16':
            let result = await inputText('Ввод заданий', 'Введите задания с номерами от 0 до 5 через запятую<br>Например:0,0,1,2,3,5', '0,1,2,3,4,5');
            if (result.isConfirmed) {

                console.log(result)
                taskQuery = result.value.split(',').map(str => parseInt(str))
                if (!taskQuery.every(value => typeof value == 'number' && value < 6 && value >= 0)) return;
                console.log(taskQuery);
            }
            else return;
            break;
    }
    init();
    document.getElementById('selectView').style.display = 'none';
    document.getElementById('mainView').style.display = 'block';
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

