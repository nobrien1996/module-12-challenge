//SETTING THE REQUIREMENTS AND INITIALIZING

const { prompt } = require('inquirer');
const logo = require('asciiart-logo');
const db = require ('./db');

init();


//LOADING MAIN STUFF AND DISPLAYING LOGO TEXT

function init() {
    const logoText = logo({ name : 'Employee Manager' }).render();
    console.log(logoText);
    loadMainPrompts();
};

function loadMainPrompts() {
    prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What do you want?',
            choices: [
                {
                    name: 'View All Minions',
                    value: 'VIEW_MINIONS',
                },
                {
                    name: 'View All Minions By Department',
                    value: 'VIEW_MINIONS_BY_DEPARTMENT',
                },
                {
                    name: 'View All Minions By Overlord',
                    value: 'VIEW_MINIONS_BY_OVERLORD',
                },
                {
                    name: 'Add Minion',
                    value: 'ADD_MINION',
                },
                {
                    name: 'Delete Minion',
                    value: 'DELETE_MINION',
                },
                {
                    name: 'Update Minion Role',
                    value: 'UPDATE_MINION_ROLE',
                },
                {
                    name: 'Update Minion Overlord',
                    value: 'UPDATE_MINION_OVERLORD',
                },
                {
                    name: 'View All Roles',
                    value: 'VIEW_ROLES',
                },
                {
                    name: 'Add Role',
                    value: 'ADD_ROLE',
                },
                {
                    name: 'Delete Role',
                    value: 'DELETE_ROLE',
                },
                {
                    name: 'View All Departments',
                    value: 'VIEW_DEPARTMENTS',
                },
                {
                    name: 'Add Department',
                    value: 'ADD_DEPARTMENT',
                },
                {
                    name: 'Delete Department',
                    value: 'DELETE_DEPARTMENT',
                },
                {
                    name: 'View Total Utilized Budget By Department',
                    value: 'VIEW_BUDGET_BY_DEPARTMENT',
                },
                {
                    name: 'Quit',
                    value: 'QUIT',
                },
            ],
        },
    ]).then((res) => {
        let choice = res.choice;
        switch (choice) {
            case 'VIEW_MINIONS':
                viewMinions();
                break;
            case 'VIEW_MINIONS_BY_DEPARTMENT':
                viewMinionsByDepartment();
                break;
            case 'VIEW_MINIONS_BY_OVERLORD':
                viewMinionsByOverlord();
                break;
            case 'ADD_MINION':
                addMinion();
                break;
            case 'DELETE_MINION':
                deleteMinion();
                break;
            case 'UPDATE_MINION_ROLE':
                updateMinionRole();
                break;
            case 'UPDATE_MINION_OVERLORD':
                updateMinionOverlord();
                break;
            case 'VIEW_DEPARTMENTS':
                viewDepartments();
                break;
            case 'ADD_DEPARTMENT':
                addDepartment();
                break;
            case 'DELETE_DEPARTMENT':
                deleteDepartment();
                break;
            case 'VIEW_BUDGET_BY_DEPARTMENT':
                viewBudgetByDepartment();
                break;
            case 'VIEW_ROLES':
                viewRoles();
                break;
            case 'ADD_ROLE':
                addRole();
                break;
            case 'DELETE_ROLE':
                deleteRole();
                break;
            default:
                quit();
        }
    });
}