let score = 0;
let si = null;
let scoreTotal = 0;
let errorsTotal = 0;
let taskNumber = 0;
let scoreMax = 0;
let currentTask;

function init() {
    currentTask = taskQuery[taskNumber];
    taskNumber++;
    scoreTotal += score;
    score = 0;
    tasks[currentTask].init();
    //if (si != null) clearInterval(si);
    //startCountdown(100);
    infoUpdate();
    createTable();

    document.getElementById('btnCheck').addEventListener('click', () => {
        tasks[currentTask].check();
    });
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

