const { read, writeFile } = require('fs');

// id    date     description    amount
const fs = require('fs').promises;
let path = './expense.json';
let data = [];
const readFile = async () => {
    try {
        data = JSON.parse(await fs.readFile(path, 'utf-8'));
    }
    catch (err) {
        data = [];
    }
}
const add = async (des, amount) => {
    await readFile();
    console.log(data);
    const maxId = data.length > 0 ?
        (Math.max(...data.map(item => item.id)) + 1) : 1;
    const newExpense = [
        ...data,
        {
            id: maxId,
            date: new Date(),
            description: des,
            amount: amount,
        }]
    try {
        await fs.writeFile(path, JSON.stringify(newExpense), 'utf-8');
        console.log(`Expense added successfully (ID : ${maxId})`);
    } catch (error) {
        console.log(error);
    }
}
const list = async () => {
    const toDateFormat = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDay() + 1).padStart(2, '0');
        return `${year}/${month}/${day}`;
    }
    await readFile();
    console.log('ID   Date           Description               Amount \n');
    data.forEach((item) => {
        console.log(`${item.id}  ${toDateFormat(item.date)}       ${item.description}    ${item.amount}\n`);
    })
}
async function sum(time = 'none', value = '0') {
    await readFile();
    let sumValue = 0;
    if (time != 'none' && value != '0' && time && value) {
        switch (time) {
            case '--day':
                data.filter((item) => {
                    const date = new Date(item.date);
                    const day = date.getDay() + 1;
                    return String(day) === value;
                }).forEach((item) => {
                    sumValue += Number(item.amount);
                })
                console.log(sumValue);
                break;
            case '--month':
                data.filter((item) => {
                    const date = new Date(item.date);
                    const month = date.getMonth() + 1;
                    return String(month) === value;
                }).forEach((item) => {
                    sumValue += Number(item.amount);
                })
                console.log(sumValue);
                break;
            case '--year':
                data.filter((item) => {
                    const date = new Date(item.date);
                    const year = date.getFullYear();
                    return String(year) === value;
                }).forEach((item) => {
                    sumValue += Number(item.amount);
                })
                console.log(sumValue);
                break;
            default:
                console.log(sumValue);
                break;
        }
    }
    else {
        data.forEach((item) => {
            sumValue += Number(item.amount);
        })
        console.log(sumValue);
    }
}

async function deleteEx(id) {
    await readFile();
    newData = data.filter((item) => { return item.id != id });
    await fs.writeFile(path, JSON.stringify(newData), 'utf-8');
    console.log('Delte Success: ', newData);
}
switch (process.argv[3]) {
    case 'add':
        add(process.argv[5], process.argv[7]);
        break;
    case 'list':
        list();
        break;
    case 'summary':
        sum(process.argv[4], process.argv[5]);
        break;
    case 'delete':
        deleteEx(process.argv[5]);
        break;
    default:
        console.log('Fail');
}

