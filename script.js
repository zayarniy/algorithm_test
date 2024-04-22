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
}


function init() {
    set();
    createTable();
}

function set() {
    data = [[]]
    task1(data, 54, 16);
    console.log(data);
}

function createTable() {
    let table = document.getElementById('mainTable');
    for (i = 0; i < data.length; i++) {

        let row = document.createElement('tr');
        for (j = 0; j < data[i].length; j++) {
            let cell = document.createElement('td');
            let inp = document.createElement('input');
            inp.style = 'width:80px';
            inp.value = data[i][j];
            cell.appendChild(inp);
            row.appendChild(cell)
        }
        table.appendChild(row);
    }
}