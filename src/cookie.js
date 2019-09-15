/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующей cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если добавляемая cookie не соответсвует фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующей cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

function isMatching(full, chunk) {
    if (chunk == null) {
        chunk = '';
    }
    if (full == null) {
        full = '';
    }

    let fullS = full.toLowerCase();
    let chunkS = chunk.toLowerCase();

    if (fullS.indexOf(chunkS) > -1) {
        return true;
    }
    return false;
}

addButton.addEventListener('click', createCookieTr);
function createCookieTr(name, value) {
    name = addNameInput.value;
    value = addValueInput.value;
    let filter = filterNameInput.value;
    let cokasNames = document.querySelectorAll('.cookie_name');
    if (filter.length > 0) {
        if (isMatching(value, filter) == false) {
            for (var prop in cokasNames) {
                if (isMatching(cokasNames[prop].innerHTML, name) && !isMatching(cokasNames[prop].nextElementSibling.innerHTML, value)) {
                    var thisTr = cokasNames[prop].parentNode;

                    listTable.removeChild(thisTr);
                    cokasNames[prop].parentNode.style.backgroundColor = 'red';
                    document.cookie = name + '=' + value;
                    return;
                }
            }
        }
        if (isMatching(name, filter) || isMatching(value, filter)) {
            listTable.appendChild(createTr(name, value));
            document.cookie = name + '=' + value;
            return;
        } 
        if (!isMatching(name, filter)) {
            document.cookie = name + '=' + value;
            return;
        }
    }
    if (document.querySelectorAll('.cookie_name').length == 0) {
        listTable.appendChild(createTr(name, value));
        document.cookie = name + '=' + value;
        return;
    }
    if (document.querySelectorAll('.cookie_name').length > 0) {
        for (var key in document.querySelectorAll('.cookie_name')) {    
            if (document.querySelectorAll('.cookie_name')[key].innerHTML != name) {
                continue;
            } else if (document.querySelectorAll('.cookie_name')[key].innerHTML == name) {
                document.querySelectorAll('.cookie_name')[key].nextElementSibling.innerHTML = value;
                document.cookie = name + '=' + value;
                return;
            }
        }
    } 
    listTable.appendChild(createTr(name, value));
    document.cookie = name + '=' + value;
}

function createTr(name, value) {
    let tr = document.createElement('tr');
    let td1 = document.createElement('td');
    td1.setAttribute('class', 'cookie_name');
    let td2 = document.createElement('td');
    td2.setAttribute('class', 'cookie_value');
    let td3 = document.createElement('td');
    td3.setAttribute('class', 'deleteCookies');
    td1.innerHTML = name;
    td2.innerHTML = value;
    let button = document.createElement('button');
    button.innerHTML = 'Удалить';
    button.classList.add('deleteCookies');
    td3.appendChild(button);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    return tr;
}

homeworkContainer.addEventListener('click', deleteTableRow);
function deleteTableRow(e) {
    if (e.target.classList.contains('deleteCookies')) {
        listTable.removeChild(e.target.parentNode.parentNode);
        let cookieNameToDelete = e.target.parentNode.parentNode.children[0].innerHTML;
        let cookieValueToDelete = e.target.parentNode.parentNode.children[1].innerHTML; 
        document.cookie = cookieNameToDelete + '=' + cookieValueToDelete + ';expires=' + new Date(0);
    } 
}

filterNameInput.addEventListener('keyup', function() {
    makeTable();
});

function makeTable() {
    let x = document.cookie.split('=').join().split(';').join().split(',');
    let filterInputValue = filterNameInput.value;
    listTable.innerHTML = '';
    if (!filterInputValue) {
        for (let z = 0; z < x.length; ) {
             let p = z + 1;

            listTable.appendChild(createTr(x[z], x[p]));
            z = z + 2
        }
        return;
    }
    for (let i = 0; i < x.length; ) {
        let k = i + 1;
        if (isMatching(x[i], filterInputValue) || isMatching(x[k], filterInputValue) ) {
            listTable.appendChild(createTr(x[i], x[k]));
        }
        i = i + 2;
    }
}