let score = 0;
let si = null;
let scoreTotal = 0;
let errorsTotal = 0;
let taskNumber = 0;
let scoreMax = 0;
let currentTask;
let percents = 0;


function load() {
    /*
    document.getElementById('btnCheck').addEventListener('click', () => {
        check();
    });*/
    init();
}

function init(next = true) {

    if (taskNumber != taskQuery.length) {
        currentTask = taskQuery[taskNumber];
        if (next) {
            taskNumber++;
            scoreTotal += score;
            percents += scoreMax;
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
        let per = parseInt((scoreTotal - errorsTotal) / percents * 100);
        if (per >= 90) ball = 5;
        if (per >= 80 && per < 90) ball = 4;
        if (per >= 65 && per < 80) ball = 3;
        if (per < 65) ball = 2;
        Swal.fire({
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
            showCancelButton: false,
            focusConfirm: false,
            confirmButtonText: `
               Отлично!
            `
        });
    }
}

function next() {
    init();
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
                //document.getElementById('btnNext').style.visibility = 'visible';
                //document.getElementById('btnCheck').style.disabled = 'disabled';
                //init();
                //training.Level();
            }
        }, 1000);
    }
}

