let score = 0;
let si = null;
let scoreTotal = 0;
let errorsTotal = 0;
let taskNumber = 0;

function init() {
    if (si != null) clearInterval(si);
    tasks[0].init();
    taskNumber++;
    createTable();
    startCountdown(100);
    document.getElementById('btnCheck').addEventListener('click', () => {
        tasks[0].check();
    });
}

function infoUpdate() {
    document.getElementById('scores').textContent = score;
    document.getElementById('scoresTotal').textContent = scoreTotal;
    document.getElementById('errorsTotal').textContent = errorsTotal;
    document.getElementById('taskNumber').textContent = taskNumber;

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

function next() {
    init();
}