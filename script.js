function task1(data, m, n) {
    //Инициализация
    data[0][0] = 'm'
    data[0][1] = 'n'
    data[0][2] = 'm!=n'
    data[0][3] = 'm>n'
    let i = 1;
    while (m != n) {
        data.push([])
        data[i][0] = m;
        data[i][1] = n;
        data[i][2] = m != n ? '+' : '-';
        data[i][3] = m > n ? '+' : '-';
        if (m > n) m = m - n; else n = n - m;
        i++;
    }
    //Вывод
    data.push([])
    data[i][0] = m;
    data[i][1] = n;
    data[i][2] = m != n ? '+' : '-';
    data[i][3] = m > n ? '+' : '-';
    if (m > n) m = m - n; else n = n - m;
    data.outputText = 'm';
    data.output = m;
}


function init() {
    set1();
    createTable();
    startCountdown(100);
}

function set1() {
    data = [[]]
    r = getRandomInt(2, 15);
    m = getRandomInt(2, 20) * r;
    n = getRandomInt(2, 21) * r;
    task1(data, m, n);
    console.log(r, m, n);
    document.getElementById('initM').textContent = m;
    document.getElementById('initN').textContent = n;
    console.log(data);
}

function createTable() {
    let table = document.getElementById('traceTable');
    let row = document.createElement('tr');
    let cell = document.createElement('th');
    cell.textContent = '№';
    row.appendChild(cell)
    for (j = 0; j < data[0].length; j++) {
        let cell = document.createElement('th');
        cell.textContent = data[0][j]
        row.appendChild(cell)
    }
    table.appendChild(row);

    for (i = 1; i < data.length; i++) {

        let row = document.createElement('tr');
        let cell = document.createElement('td');
        cell.textContent = i;
        row.appendChild(cell)

        for (j = 0; j < data[i].length; j++) {
            let cell = document.createElement('td');
            let inp = document.createElement('input');
            inp.id = i + "" + j;
            inp.style = 'width:60px';
            //inp.value = data[i][j];
            cell.appendChild(inp);
            row.appendChild(cell)
        }
        table.appendChild(row);
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function check() {
    for (i = 1; i < data.length; i++) {
        for (j = 0; j < data[i].length; j++) {
            let el = document.getElementById(i + "" + j);
            if (data[i][j] == el.value)
                el.style.color = 'green';
            else
                el.style.color = 'red';
        }
    }
}

function startCountdown(countDown) {
    //if (training.isStartCountdown) 
    {
        let cd = document.getElementById('countDown');
        let pbf = document.getElementById('progress-bar-fill');
        let si = setInterval(() => {
            if (countDown > 1) {
                countDown--;
                pbf.style.width = countDown + "%";
                cd.textContent = countDown;
            } else {
                clearInterval(si)
                countDown = 0;
                pbf.style.width = countDown + "%";
                cd.textContent = countDown;
                //training.Level();
            }
        }, 1000);
    }
}
