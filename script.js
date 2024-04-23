let score = 0;
let si = null;

function init() {
    if (si != null) clearInterval(si);
    tasks[0].init();
    createTable();
    startCountdown(100);
}





function check(showAnswers = false) {
    let countRed = 0;
    let countGreen = 0;
    let count = 0;
    for (i = 1; i < data.length; i++) {
        for (j = 0; j < data[i].length; j++) {
            let el = document.getElementById(i + "" + j);
            if (showAnswers) el.value = data[i][j];
            else {
                count++;
                if (el.value != '')
                    if (data[i][j] == el.value) {
                        el.style.color = 'green';
                        countGreen++;
                    }
                    else {
                        el.style.color = 'red';
                        countRed++;
                    }
            }
        }

        score += (count == countGreen ? countGreen : 0);
        document.getElementById('scores').textContent = score;
    }

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
                check(true);
                document.getElementById('btnNext').style.visibility = 'visible';
                //init();
                //training.Level();
            }
        }, 1000);
    }
}

function next() {
    init();
}