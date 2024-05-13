let data;
let taskQuery = [0, 1, 2, 3, 4, 5];
//let taskQuery = [0, 1];
let color1 = '#FFCB00';
let color2 = '';

let tasks =
    [
        {
            textTask: 'Проанализируйте алгоритм в виде блок-схемы и заполните таблицу трассировки при m=<span id="initM"></span>, n=<span id="initN"></span>',
            imageAlgorithm: 'algorithms/001.svg',
            textCode: `
            <pre>
            m=int(input())
            n=int(input())
            while m!=n:
                if m>n:
                    m=m-n
                else:
                    n=n-m
            print(m)                        
            </pre>
            `,
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
                data[i][3] = '*';//m > n ? '+' : '-';
                if (m > n) m = m - n; else n = n - m;
                count += 4;
                data.outputText = 'm';
                data.output = m;
                this.maxBalls = count;
                this.balls = 0;
                this.errors = 0;
            },
            init: function () {
                data = [[]]
                r = getRandomInt(2, 15);
                do {
                    m = getRandomInt(2, 20) * r;
                    n = getRandomInt(2, 21) * r;
                }
                while (m == n);
                this.task(data, m, n);
                document.getElementById('imageAlgorithm').src = this.imageAlgorithm
                document.getElementById('colCodeAlgorithm').innerHTML = this.textCode;
                document.getElementById('textTask').innerHTML = this.textTask;
                document.getElementById('initM').textContent = m;
                document.getElementById('initN').textContent = n;
            },
            balls: 0,
            errors: 0,
            maxBalls: 0
        },
        {
            textTask: 'Проанализируйте алгоритм и заполните таблицу трассировки при m=<span id="initM"></span>, n=<span id="initN"></span>',
            imageAlgorithm: 'algorithms/002.svg',
            textCode: `

            <pre>
            n = int(input())
            m = int(input())
            while m >= 6:
                m = m - 2
                n = n * 2
            print(n)                      
        </pre>
            `,
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
                this.maxBalls = count;
                this.balls = 0;
                this.errors = 0;
            },
            init: function () {
                data = [[]]
                r = 2;//getRandomInt(2, 15);
                m = getRandomInt(4, 11) * r;
                n = getRandomInt(2, 10);// getRandomInt(2, 21) * r;
                this.task(data, m, n);
                //console.log(r, m, n);
                document.getElementById('imageAlgorithm').src = this.imageAlgorithm
                document.getElementById('colCodeAlgorithm').innerHTML = this.textCode;
                document.getElementById('textTask').innerHTML = this.textTask;
                document.getElementById('initM').textContent = m;
                document.getElementById('initN').textContent = n;
                //console.log(data);
            },
            balls: 0,
            errors: 0,
            maxBalls: 0

        },
        {
            textTask: 'Проанализируйте алгоритм и заполните таблицу трассировки при x=<span id="initX"></span>, y=<span id="initY"></span>',
            imageAlgorithm: 'algorithms/003.svg',
            textCode: `
            <pre>
            x = int(input())
            y = int(input())
            while x < 30:
                if x>=y:
                    x = x - 5
                    y = y + 5
                else:
                    x = x + 10
                    y = y - 10
            print(x, y)                    
            </pre>                        
            `,
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
                data[i][3] = '*';//x >= y ? '+' : '-';
                count += data[i].length;
                this.maxBalls = count;
                this.balls = 0;
                this.errors = 0;
            },
            init: function () {
                data = [[]]
                r = 2;//getRandomInt(2, 15);
                x = 15;//getRandomInt(4, 11) * r;
                y = 35 + getRandomInt(0, 3) * 5;// getRandomInt(2, 21) * r;
                this.task(data, x, y);

                //console.log(r, m, n);
                document.getElementById('imageAlgorithm').src = this.imageAlgorithm
                document.getElementById('colCodeAlgorithm').innerHTML = this.textCode;
                document.getElementById('textTask').innerHTML = this.textTask;
                document.getElementById('initX').textContent = x;
                document.getElementById('initY').textContent = y;
                //console.log(data);
            },
            balls: 0,
            errors: 0,
            maxBalls: 0

        },
        {
            textTask: 'Проанализируйте алгоритм и заполните таблицу трассировки при a=<span id="initA"></span>, b=<span id="initB"></span>',
            imageAlgorithm: 'algorithms/004.svg',
            textCode: `
            <pre>
            a = int(input())
            b = int(input())
            while b != 32:
                b = b * 2
                a = a + 2
            print(a)               
            </pre>
            `,
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
                this.maxBalls = count;
                this.balls = 0;
                this.errors = 0;
            },
            init: function () {
                data = [[]]
                r = 2;
                a = getRandomInt(4, 11) * r;
                b = 2;// getRandomInt(2, 21) * r;
                this.task(data, a, b);
                //console.log(r, m, n);
                document.getElementById('imageAlgorithm').src = this.imageAlgorithm
                document.getElementById('colCodeAlgorithm').innerHTML = this.textCode;
                document.getElementById('textTask').innerHTML = this.textTask;
                document.getElementById('initA').textContent = a;
                document.getElementById('initB').textContent = b;
                //console.log(data);
            },
            balls: 0,
            errors: 0,
            maxBalls: 0
        },

        {
            textTask: 'Проанализируйте алгоритм и заполните таблицу трассировки при a=<span id="initA"></span>, b=<span id="initB"></span>',
            imageAlgorithm: 'algorithms/005.svg',
            textCode: `
            <pre>
            a = int(input())
            b = int(input())
            while b != 4:
                b = b + 1
                a = a * 2
            print(a)          
        </pre>
            `,
            task: function (data, a, b) {
                //Инициализация
                data[0][0] = 'a'
                data[0][1] = 'b'
                data[0][2] = 'b!=4'
                let i = 1;
                let count = 0;
                while (b != 4) {
                    data.push([])
                    data[i][0] = a;
                    data[i][1] = b;
                    data[i][2] = b != 4 ? '+' : '-';
                    count += data[i].length;
                    b = b + 1;
                    a = a * 2;
                    i++;
                }
                //Вывод
                data.push([])
                data[i][0] = a
                data[i][1] = b
                data[i][2] = b != 4 ? '+' : '-';
                count += data[i].length;
                this.maxBalls = count;
                this.balls = 0;
                this.errors = 0;
                scoreMax = count;
            },
            init: function () {
                data = [[]]
                r = 1;
                a = getRandomInt(1, 4) * r;
                b = 0;// getRandomInt(2, 21) * r;
                this.task(data, a, b);
                //console.log(r, m, n);
                document.getElementById('imageAlgorithm').src = this.imageAlgorithm
                document.getElementById('colCodeAlgorithm').innerHTML = this.textCode;
                document.getElementById('textTask').innerHTML = this.textTask;
                document.getElementById('initA').textContent = a;
                document.getElementById('initB').textContent = b;
                //console.log(data);
            },
            balls: 0,
            errors: 0,
            maxBalls: 0

        },
        {
            textTask: 'Проанализируйте алгоритм и заполните таблицу трассировки при x=<span id="initX"></span>, y=<span id="initY"></span>',
            imageAlgorithm: 'algorithms/006.svg',
            textCode: `
            <pre>
            x = int(input())
            y = int(input())
            while y < 16:
                if x<=y:
                    x = x + 5
                    y = y - 5
                else:
                    x = x - 3
                    y = y + 5
            print(x, y)                  
            </pre>
            `,
            task: function (data, x, y) {
                //Инициализация
                data[0][0] = 'x'
                data[0][1] = 'y'
                data[0][2] = 'y<16'
                data[0][3] = 'x<=y'
                let i = 1;
                let count = 0;
                while (y < 16) {
                    data.push([])
                    data[i][0] = x;
                    data[i][1] = y;
                    data[i][2] = y < 16 ? '+' : '-';
                    data[i][3] = x <= y ? '+' : '-';
                    count += data[i].length;
                    if (x <= y) {
                        x = x + 5;
                        y = y - 5;
                    }
                    else {
                        x = x - 3;
                        y = y + 5;
                    }
                    i++;
                }
                //Вывод
                data.push([])
                data[i][0] = x;
                data[i][1] = y;
                data[i][2] = y < 16 ? '+' : '-';
                data[i][3] = '*';//x <= y ? '+' : '-';
                count += data[i].length;
                this.maxBalls = count;
                this.balls = 0;
                this.errors = 0;
                scoreMax = count;
            },
            init: function () {
                data = [[]]
                r = 2;//getRandomInt(2, 15);
                x = 8 + getRandomInt(1, 2) * r;
                y = 15;// + getRandomInt(0, 3) * 5;// getRandomInt(2, 21) * r;
                this.task(data, x, y);
                //console.log(r, m, n);
                document.getElementById('imageAlgorithm').src = this.imageAlgorithm
                document.getElementById('colCodeAlgorithm').innerHTML = this.textCode;
                document.getElementById('textTask').innerHTML = this.textTask;
                document.getElementById('initX').textContent = x;
                document.getElementById('initY').textContent = y;
                //console.log(data);
            },
            balls: 0,
            errors: 0,
            maxBalls: 0
        },
        {
            textTask: 'Проанализируйте алгоритм и заполните таблицу трассировки при a=<span id="initA"></span>',
            imageAlgorithm: 'algorithms/007.svg',
            textCode: `
            <pre>
            код не предусмотрен
            </pre>
            `,
            task: function (data, a) {
                //Инициализация
                data[0][0] = 'a'
                data[0][1] = 'a<95'
                let i = 1;
                let count = 0;
                while (a < 95) {
                    data.push([])
                    data[i][0] = a;
                    data[i][1] = a < 95 ? '+' : '-';
                    count += data[i].length;
                    a += 25;
                    i++;
                }
                //Вывод                
                data[1][1] = '*';
                //Вывод
                data.push([])
                data[i][0] = a;
                data[i][1] = a < 95 ? '+' : '-';
                count += data[i].length;
                this.maxBalls = count;
                this.balls = 0;
                this.errors = 0;
                scoreMax = count;
            },
            init: function () {
                data = [[]]
                let a = getRandomInt(0, 10);
                this.task(data, a);
                document.getElementById('imageAlgorithm').src = this.imageAlgorithm
                document.getElementById('colCodeAlgorithm').innerHTML = this.textCode;
                document.getElementById('textTask').innerHTML = this.textTask;
                document.getElementById('initA').textContent = a;
            },
            balls: 0,
            errors: 0,
            maxBalls: 0
        }

    ]



function check(showAnswers = false) {
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
                        //el.style.color = 'green';
                        //el.style.color = '#0D6EFD';//lightgreen';
                        el.style.backgroundColor = '#0D6EFD';
                        countGreen++;
                    }
                    else {
                        //el.style.color = 'red';
                        el.style.backgroundColor = '#FFCB00';//'#FFA100';
                        countRed++;
                    }
            }
        }
    }
    //score = (count == countGreen ? countGreen : 0);
    tasks[taskQuery[taskNumber]].balls = countGreen;
    tasks[taskQuery[taskNumber]].errors += countRed;
    infoUpdate();
}

