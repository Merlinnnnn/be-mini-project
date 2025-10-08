const fs = require('fs').promises;
const path = './tasks.json';
let tasks = [];
let loadTasks = async () => {
    try {
        const data = await fs.readFile(path, 'utf8');
        tasks = JSON.parse(data);
    }
    catch (err) {
        tasks = [];
    }
}

let addTasks = async (task) => {
    await loadTasks();
    const maxId = tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) : 0;
    let newTasks = [
        ...tasks,
        {
            id: maxId + 1,
            description: task,
            status: 'todo',
            createdAt: new Date(),
            updatedAt: new Date(),
        }
    ]
    await fs.writeFile('./tasks.json', JSON.stringify(newTasks), 'utf8');
    console.log('Add Success');
}
let updateTasks = async (id, task) => {
    await loadTasks();
    tasks.forEach((t) => {
        if (t.id === id) {
            t.description = task;
            t.updatedAt = new Date();
        }
    });
    await fs.writeFile('./tasks.json', JSON.stringify(tasks), 'utf-8');
    console.log('Update Success');
}
let deleteTasks = async (id) => {
    await loadTasks();
    let newTasks = tasks.filter((t) => t.id != id);
    await fs.writeFile('./tasks.json', JSON.stringify(newTasks), 'utf-8');
    console.log('Delete success');
}
let markingTask = async (state, id) => {
    await loadTasks();
    tasks.forEach((t) => {
        if (t.id == id) {
            t.status = state;
        }
    })
    await fs.writeFile('./tasks.json', JSON.stringify(tasks), 'utf-8');
    console.log('Marking done');
}
let listTasks = async (state, id) => {
    await loadTasks();
    let newTasks = tasks.filter((t) => t.status == state)
    //await fs.writeFile('./tasks.json', JSON.stringify(newTasks), 'utf-8');
    console.log(newTasks);
}
switch (process.argv[2].split('-')[0]) {
    case 'add':
        addTasks(process.argv[3]);
        break;
    case 'update':
        updateTasks(process.argv[3], process.argv[4]);
        break;
    case 'delete':
        deleteTasks(process.argv[3]);
        break;
    case 'mark':
        let state = ''
        if (process.argv[2].split('-').length > 2) {
            state = process.argv[2].split('-')[1] + process.argv[2].split('-')[2];
        }
        else {
            state = process.argv[2].split('-')[1];
        }
        markingTask(state, process.argv[3]);
        break;
    case 'list':
        listTasks(process.argv[3]);
        break;
    default:
        console.log('Không có case nào')
}
