let data;

let tasks =
    [
        {
            task: function (data, m, n) {
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
            },
            init: function () {
                data = [[]]
                r = getRandomInt(2, 15);
                m = getRandomInt(2, 20) * r;
                n = getRandomInt(2, 21) * r;
                this.task(data, m, n);
                console.log(r, m, n);
                document.getElementById('initM').textContent = m;
                document.getElementById('initN').textContent = n;
                console.log(data);
            }

        }
    ]

function createTable() {
    let table = document.getElementById('traceTable');
    let rows = table.querySelectorAll('tr')
    console.log(rows);
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
            inp.id = i + "" + j;
            inp.style = 'width:60px';
            //inp.value = data[i][j];
            cell.appendChild(inp);
            row.appendChild(cell)
        }
        table.appendChild(row);
    }
}    