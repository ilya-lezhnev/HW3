var input = document.querySelector('.task');
var inputdate = document.querySelector('.date')
var ul = document.querySelector('ul');
var list = document.querySelectorAll('li');
var container = document.querySelector('div');
var span = document.querySelectorAll('.trash');
var clearBtn = document.querySelector('#clear');
var addBtn = document.querySelector('#add');
function loadTodo() {
    if (localStorage.getItem('todoList')) {
        ul.innerHTML = localStorage.getItem('todoList');
    }
    span = document.querySelectorAll('.trash')
}
function deletload() {
    for (var i = 0; i < span.length; i++) {
        span[i].addEventListener("click", function () {
            ul.removeChild(this.parentNode)
            saveTodo()
        })
    }
}
addBtn.addEventListener('click', function () {
    var li = document.createElement('li');
    var spanElement = document.createElement('span');
    var spanElementDate = document.createElement('span');
    var spanElementClock = document.createElement('span');
    var icon = document.createElement('i');
    var newTodo = input.value + ' ';
    input.value = '';
    var dateTodo = new Date(inputdate.value)
    inputdate.value = ''
    initializeClock(spanElementClock, dateTodo)
    icon.classList.add('fas', 'fa-trash-alt');
    spanElement.append(icon);
    spanElementDate.innerHTML =  dateTodo.getFullYear() + '-' + ('0' + (dateTodo.getMonth()+1)).slice(-2) + '-' + ('0' + dateTodo.getDate()).slice(-2)
    spanElement.setAttribute('class', 'trash')
    spanElementDate.setAttribute('class', 'Edate')
    spanElementClock.setAttribute('class', 'clock')
    ul.appendChild(li).append(spanElement, newTodo, spanElementDate, spanElementClock)
    saveTodo()
    loadTodo()
    deletload()
    updateClock()

})
function initializeClock(spanElementClock, dateTodo) {
    var t = getTimeRemaining(dateTodo);
    spanElementClock.innerHTML = " - " + t.days + " дней " + ('0' + t.hours).slice(-2) + " часов " + ('0' + t.minutes).slice(-2) + " минут " + ('0' + t.seconds).slice(-2) + " секунд";
}
function updateClock() {
    var elementsdate = document.querySelectorAll('.Edate')
    var elementsclock = document.querySelectorAll('.clock')
    for (var i = 0; i < elementsclock.length; i++) {
        var t = getTimeRemaining(elementsdate[i].innerHTML);
        if (t.total <= 0){
            ul.removeChild(elementsdate[i].parentNode)
        }
            elementsclock[i].innerHTML = ". Осталось до выполнение задачи - " + t.days + " дней " + + ('0' + t.hours).slice(-2) + " часов " + ('0' + t.minutes).slice(-2) + " минут " + ('0' + t.seconds).slice(-2) + " секунд";
    }
    var inter = setInterval(updateClock,1000)
    if(elementsclock.length == 0)
        clearInterval(inter)
}
function saveTodo() {
    localStorage.setItem("todoList", ul.innerHTML)
}
function setData() {
    var date = new Date()
}
clearBtn.addEventListener('click', function () {
    ul.innerHTML = '';
    localStorage.clear();
});
function getTimeRemaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
}
loadTodo();
deletload();
updateClock();