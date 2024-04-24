let data;
let taskQuery = [0, 0, 1, 1, 2, 2, 3, 3];

let tasks =
    [
        {
            textTask: 'Проанализируйте алгоритм и заполните таблицу трассировки при m=<span id="initM"></span>, n=<span id="initN"></span>',
            imageAlgorithm: 'algorithms/001.png',
            task: function (data, m, n) {
                //Инициализация
                data[0][0] = 'm'
                data[0][1] = 'n'
                data[0][2] = 'm!=n'
                data[0][3] = 'm>n'
                let i = 1;
                let count = 0;
                while (m != n) {
                    data.push([])
                    data[i][0] = m;
                    data[i][1] = n;
                    data[i][2] = m != n ? '+' : '-';
                    data[i][3] = m > n ? '+' : '-';
                    if (m > n) m = m - n; else n = n - m;
                    i++;
                    count += 4;
                }
                //Вывод
                data.push([])
                data[i][0] = m;
                data[i][1] = n;
                data[i][2] = m != n ? '+' : '-';
                data[i][3] = m > n ? '+' : '-';
                if (m > n) m = m - n; else n = n - m;
                count += 4;
                data.outputText = 'm';
                data.output = m;
                scoreMax = count;
            },
            init: function () {
                data = [[]]
                r = getRandomInt(2, 15);
                m = getRandomInt(2, 20) * r;
                n = getRandomInt(2, 21) * r;
                this.task(data, m, n);
                //console.log(r, m, n);
                document.getElementById('imageAlgorithm').src = tasks[currentTask].imageAlgorithm
                document.getElementById('textTask').innerHTML = tasks[currentTask].textTask;
                document.getElementById('initM').textContent = m;
                document.getElementById('initN').textContent = n;
                //console.log(data);
            },
            check: function check(showAnswers = false) {
                let countRed = 0;
                let countGreen = 0;
                let count = 0;
                for (i = 1; i < data.length; i++) {
                    for (j = 0; j < data[i].length; j++) {
                        let el = document.getElementById(i + "" + j);
                        if (showAnswers) el.value = data[i][j];//Показываем все ответы или
                        else {
                            count++;//показываем не все ответы
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
                }
                //score = (count == countGreen ? countGreen : 0);
                score = countGreen;
                errorsTotal += countRed;

                infoUpdate();

            }

        },
        {
            textTask: 'Проанализируйте алгоритм и заполните таблицу трассировки при m=<span id="initM"></span>, n=<span id="initN"></span>',
            imageAlgorithm: 'algorithms/002.svg',
            task: function (data, m, n) {
                //Инициализация
                data[0][0] = 'm'
                data[0][1] = 'n'
                data[0][2] = 'm>=6'

                let i = 1;
                let count = 0;
                while (m >= 6) {
                    data.push([])
                    data[i][0] = m;
                    data[i][1] = n;
                    data[i][2] = m >= 6 ? '+' : '-';
                    count += data[i].length;
                    m = m - 2
                    n = n * 2
                    i++;
                }
                //Вывод
                data.push([])
                data[i][0] = m;
                data[i][1] = n;
                data[i][2] = m >= 6 ? '+' : '-';
                count += data[i].length;
                data.outputText = 'm';
                data.output = m;
                scoreMax = count;
            },
            init: function () {
                data = [[]]
                r = 2;//getRandomInt(2, 15);
                m = getRandomInt(4, 11) * r;
                n = getRandomInt(2, 10);// getRandomInt(2, 21) * r;
                this.task(data, m, n);
                //console.log(r, m, n);
                document.getElementById('imageAlgorithm').src = tasks[currentTask].imageAlgorithm
                document.getElementById('textTask').innerHTML = tasks[currentTask].textTask;
                document.getElementById('initM').textContent = m;
                document.getElementById('initN').textContent = n;
                //console.log(data);
            },
            check: function check(showAnswers = false) {
                let countRed = 0;
                let countGreen = 0;
                let count = 0;
                for (i = 1; i < data.length; i++) {
                    for (j = 0; j < data[i].length; j++) {
                        let el = document.getElementById(i + "" + j);
                        if (showAnswers) el.value = data[i][j];//Показываем все ответы или
                        else {
                            count++;//показываем не все ответы
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
                }
                //score = (count == countGreen ? countGreen : 0);
                score = countGreen;
                errorsTotal += countRed;

                infoUpdate();

            }

        },
        {
            textTask: 'Проанализируйте алгоритм и заполните таблицу трассировки при x=<span id="initX"></span>, y=<span id="initY"></span>',
            imageAlgorithm: 'algorithms/003.svg',
            task: function (data, x, y) {
                //Инициализация
                data[0][0] = 'x'
                data[0][1] = 'y'
                data[0][2] = 'x<30'
                data[0][3] = 'x>=y'
                let i = 1;
                let count = 0;
                while (x < 30) {
                    data.push([])
                    data[i][0] = x;
                    data[i][1] = y;
                    data[i][2] = x < 30 ? '+' : '-';
                    data[i][3] = x >= y ? '+' : '-';
                    count += data[i].length;
                    if (x >= y) {
                        x = x - 5;
                        y = y + 5;
                    }
                    else {
                        x = x + 10;
                        y = y - 10;
                    }
                    i++;
                }
                //Вывод
                data.push([])
                data[i][0] = x;
                data[i][1] = y;
                data[i][2] = x < 30 ? '+' : '-';
                data[i][3] = x >= y ? '+' : '-';
                count += data[i].length;
                scoreMax = count;
            },
            init: function () {
                data = [[]]
                r = 2;//getRandomInt(2, 15);
                x = 15;//getRandomInt(4, 11) * r;
                y = 35 + getRandomInt(0, 3) * 5;// getRandomInt(2, 21) * r;
                this.task(data, x, y);
                //console.log(r, m, n);
                document.getElementById('imageAlgorithm').src = tasks[currentTask].imageAlgorithm
                document.getElementById('textTask').innerHTML = tasks[currentTask].textTask;
                document.getElementById('initX').textContent = x;
                document.getElementById('initY').textContent = y;
                //console.log(data);
            },
            check: function check(showAnswers = false) {
                let countRed = 0;
                let countGreen = 0;
                let count = 0;
                for (i = 1; i < data.length; i++) {
                    for (j = 0; j < data[i].length; j++) {
                        let el = document.getElementById(i + "" + j);
                        if (showAnswers) el.value = data[i][j];//Показываем все ответы или
                        else {
                            count++;//показываем не все ответы
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
                }
                //score = (count == countGreen ? countGreen : 0);
                score = countGreen;
                errorsTotal += countRed;

                infoUpdate();

            }

        },
        {
            textTask: 'Проанализируйте алгоритм и заполните таблицу трассировки при a=<span id="initA"></span>, b=<span id="initB"></span>',
            imageAlgorithm: 'algorithms/004.svg',
            task: function (data, a, b) {
                //Инициализация
                data[0][0] = 'a'
                data[0][1] = 'b'
                data[0][2] = 'b!=32'
                let i = 1;
                let count = 0;
                while (b != 32) {
                    data.push([])
                    data[i][0] = a;
                    data[i][1] = b;
                    data[i][2] = b != 32 ? '+' : '-';
                    count += data[i].length;
                    b = b * 2;
                    a = a + 2;
                    i++;
                }
                //Вывод
                data.push([])
                data[i][0] = a
                data[i][1] = b
                data[i][2] = b != 32 ? '+' : '-';
                count += data[i].length;
                scoreMax = count;
            },
            init: function () {
                data = [[]]
                r = 2;
                a = getRandomInt(4, 11) * r;
                b = 2;// getRandomInt(2, 21) * r;
                this.task(data, a, b);
                //console.log(r, m, n);
                document.getElementById('imageAlgorithm').src = tasks[currentTask].imageAlgorithm
                document.getElementById('textTask').innerHTML = tasks[currentTask].textTask;
                document.getElementById('initA').textContent = a;
                document.getElementById('initB').textContent = b;
                //console.log(data);
            },
            check: function check(showAnswers = false) {
                let countRed = 0;
                let countGreen = 0;
                let count = 0;
                for (i = 1; i < data.length; i++) {
                    for (j = 0; j < data[i].length; j++) {
                        let el = document.getElementById(i + "" + j);
                        if (showAnswers) el.value = data[i][j];//Показываем все ответы или
                        else {
                            count++;//показываем не все ответы
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
                }
                //score = (count == countGreen ? countGreen : 0);
                score = countGreen;
                errorsTotal += countRed;

                infoUpdate();

            }

        }
    ]

function createTable() {
    let table = document.getElementById('traceTable');
    let rows = table.querySelectorAll('tr')
    //console.log(rows);
    if (rows != null)
        rows.forEach(function (row) { table.removeChild(row) });


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
            inp.autocomplete = 'off';
            inp.id = i + "" + j;
            inp.style = 'width:60px';
            //inp.value = data[i][j];
            cell.appendChild(inp);
            row.appendChild(cell)
        }
        table.appendChild(row);
    }
}    