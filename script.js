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

function load() {
    /*
    document.getElementById('btnCheck').addEventListener('click', () => {
        check();
    });*/
    checkTimeStart();
    checkTimeFinish();
    init();
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
                inputText().then((name) => {
                    if (name.value != "") {
                        name = name.value.trim().replace(/\s+/g, " ").split(' ');
                        lastName = name[0];
                        firstName = name[1];
                        sendJSONToDB();
                    };
                })
            }
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

function inputText() {
    return Swal.fire({
        title: "Сохранение",
        html: `Введите свое <strong>фамилию</strong> и <strong>имя</strong>:`,
        input: 'text',
        showCancelButton: true,
        animation: "slide-from-top",
        inputPlaceholder: "Иванов Иван"
    });
}

function infoUpdate() {
    document.getElementById('scores').textContent = score;
    document.getElementById('scoresTotal').textContent = scoreTotal;
    document.getElementById('errorsTotal').textContent = errorsTotal;
    document.getElementById('taskNumber').textContent = taskNumber;
    document.getElementById('scoreMax').textContent = scoreMax;
    document.getElementById('tasksTotal').textContent = taskQuery.length;

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
    /*let infoResult =
    {
        lastName: 'zaaa'
    }*/
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

function getCurrentDate() {
    fetch('https://inform.xn--80ahlrjqm6azc.xn--p1ai/algorithm_test/php/get_date.php')
        .then(response => response.text())
        .then(data => {
            // Обновляем содержимое элемента с id="current-date"
            console.log(data);
        })
        .catch(error => {
            console.error('Ошибка:', error);
        });
}

function sendData() {
    //const data = { name: 'Иван', age: 30 };
    let infoResult = {
        lastName: lastName, firstName: firstName,
        startTime: String(timeStart),
        finishTime: String(timeFinish),
        ball: String(ball),
        errors: String(errorsTotal),
        scoreMaxTotal: String(scoreMaxTotal),
        percent: String(percents),
        testName: testName
    };
    console.log(infoResult)
    fetch('https://inform.xn--80ahlrjqm6azc.xn--p1ai/algorithm_test/php/process_data.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(infoResult)
    })
        .then(response => response.text())
        .then(result => {
            // Обновляем содержимое элемента с id="result"
            console.log(result);
        })
        .catch(error => {
            console.error('Ошибка:', error);
        });
}
