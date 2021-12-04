document.addEventListener('DOMContentLoaded', function(){
    if(localStorage.getItem('tasksList')){
        document.getElementById('tl').innerHTML = '';
        viewTasks();
        return;
    }
    localStorage.setItem('tasksList', '[]');
    return;
});

class userTask{
    constructor(key, task){
        this.key = key;
        this.task = task;
    }
}

let viewTasks = function(){
    let tasks = localStorage.getItem('tasksList');
    tasks = JSON.parse(tasks);
    tasksCount = tasks.length;
    for (let i = 0; i < tasksCount; i++){
        let key = tasks[i].key;
        let task = tasks[i].task;
        createElem(key, task);
    }
}

let generateKey = function(len){
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < len; i++){
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
}

let createElem = function(key, task){
    let outLi = document.createElement('li');
    let display = document.createElement('div');
    let removeE = document.createElement('div');
        let removeCross = document.createElement('div');
    let done = document.createElement('div');
        let doneTick = document.createElement('div');

    outLi.setAttribute('class','taskClass');
    outLi.setAttribute('id', key);

    display.setAttribute('class', 'display');
    display.setAttribute('id', 'display');
    display.innerHTML = task;

    done.setAttribute('class', 'done');
    done.setAttribute('id', 'done');
    //done.setAttribute('onclick', 'doneTask()');
        doneTick.setAttribute('class', 'doneTick');
        done.appendChild(doneTick);

        done.addEventListener('click', function(){
            let a = this.parentElement.id;
            doneTask(a);
        })

    removeE.setAttribute('class', 'remove');
    removeE.setAttribute('id', 'remove');
    //removeE.setAttribute('onclick', 'removeTask()');
        removeCross.setAttribute('class', 'removeCross');
        removeE.appendChild(removeCross);

        removeE.addEventListener('click', function(){
            let a = this.parentElement.id;
            removeTask(a);
        })

    outLi.appendChild(display);
    outLi.appendChild(done);
    outLi.appendChild(removeE);

    let displayTasks = document.getElementById('tl');
    displayTasks.appendChild(outLi);
}


// Create an Element

let Submit = function(){
    let task = document.getElementById('inputBox').value;
    let key = generateKey(4);
    if(task == ''){
        alert('Please enter some tasks...');
        return;
    }
    createElem(key, task);

    let tasks = localStorage.getItem('tasksList');
    tasks = JSON.parse(tasks);
    let obj = new userTask(key, task);
    tasks.push(obj);
    tasks = JSON.stringify(tasks);
    localStorage.setItem('tasksList', tasks);
    
    document.getElementById('inputBox').value = '';
}


// Remove a task

let removeTask = function(a){
    document.getElementById(a).remove();
    let tasks = localStorage.getItem('tasksList');
    tasks = JSON.parse(tasks);
    for(let i =0;i<tasks.length;i++){
        if(tasks[i].key == a){
            tasks.splice(i, 1);
        }
    }
    tasks = JSON.stringify(tasks);
    localStorage.setItem('tasksList', tasks);
}

// Done the task

let doneTask = function(a){
    let display = document.getElementById(a).childNodes[0];
    
    if(display.style.textDecoration == 'line-through'){
        display.style.textDecoration = 'none';     
    }else{
        display.style.textDecoration = 'line-through';
    }

}