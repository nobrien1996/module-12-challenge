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

//VIEW ALL MINIONS
function viewMinions() {
    db.findAllMinions().then(({ rows }) => {
            let minions = rows;
            console.log('\n');
            console.table(minions);
        })
        .then(() => loadMainPrompts());
}

//VIEW ALL MINIONS BY DEPARTMENT
function viewMinionsByDepartment() {
    db.findAllDepartments().then(({ rows }) => {
        let departments = rows;
        const departmentChoices = departments.map(({ id, name }) => ({
            name: name,
            value: id,
        }));
        prompt([
            {
                type: 'list',
                name: 'departmentId',
                message: 'Which department`s minions do you want to see?',
                choices: departmentChoices,
            },
        ])
            .then((res) => db.findAllMinionsByDepartment(res.departmentId))
            .then(({ rows }) => {
                let minions = rows;
                console.log('\n');
                console.table(minions);
            })
            .then(() => loadMainPrompts());
    });
}

//VIEW MINIONS BY OVERLORD
function viewMinionsByOverlord() {
    db.findAllMinions().then(({ rows }) => {
        let overlords = rows;
        const overlordChoices = overlords.map(({ id, first_name, last_name }) => ({
            name: `${first_name} ${last_name}`,
            value: id,
        }));
        prompt([
            {
                type: 'list',
                name: 'overlordId',
                message: 'Which minions do you want direct reports for?',
                choices: overlordChoices,
            },
        ])
            .then((res) => db.findAllMinionsByOverlord(res.overlordId))
            .then(({ rows }) => {
                let minions = rows;
                console.log('\n');
                if (minions.length === 0) {
                    console.log('This minion has no direct reports');
                } else {
                    console.table(minions);
                }
            })
            .then(() => loadMainPrompts());
    });
}

//DELETE MINION
function deleteMinion() {
    db.findAllMinions().then(({ rows }) => {
        let minions = rows;
        const minionChoices = minions.map(({ id, first_name, last_name }) => ({
            name: `${first_name} ${last_name}`,
            value: id,
        }));
        prompt([
            {
                type: 'list',
                name: 'minionId',
                message: 'Which minion do you want to delete?',
                choices: minionChoices,
            },
        ])
            .then((res) => db.deleteMinion(res.minionId))
            .then(() => console.log('Deleted minion from existence'))
            .then(() => loadMainPrompts());
    });
}

//UPDATE MINION ROLE
function updateMinionRole() {
    db.findAllMinions().then(({ rows }) => {
        let minions = rows;
        const minionChoices = minions.map(({ id, first_name, last_name }) => ({
            name: `${first_name} ${last_name}`,
            value: id,
        }));
        prompt([
            {
                type: 'list',
                name: 'minionId',
                message: 'Which minion`s role do you want to update?',
                choices: minionChoices,
            },
        ]).then((res) => {
            let minionId = res.minionId;
            db.findAllRoles().then(({ rows }) => {
                let roles = rows;
                const roleChoices = roles.map(({ id, title }) => ({
                    name: title,
                    value: id,
                }));
                prompt([
                    {
                        type: 'list',
                        name: 'roleId',
                        message: 'Which role do you want to give this minion?',
                        choices: roleChoices,
                    },
                ])
                .then((res) => db.updateMinionRole(minionId, res.roleId))
                .then(() => console.log('Updated minion`s job'))
                .then(() => loadMainPrompts());
            });
        });
    });
}

//UPDATE MINION'S OVERLORD
function updateMinionOverlord() {
    db.findAllMinions().then(({ rows }) => {
        let minions = rows;
        const minionChoices = minions.map(({ id, first_name, last_name }) => ({
            name: `${first_name} ${last_name}`,
            value: id,
        }));
        prompt([
            {
                type: 'list',
                name: 'minionId',
                message: 'Which minion is getting a new overlord?',
                choices: minionChoices,
            },
        ]).then((res) => {
            let minionId = res.minionId;
            db.findAllOverlords(minionId).then(({ rows }) => {
                let overlords = rows;
                const overlordChoices = overlords.map(({ id, first_name, last_name }) => ({
                    name: `${first_name} ${last_name}`,
                    value: id,
                }));
                prompt([
                    {
                        type: 'list',
                        name: 'overlordId',
                        message: 'Which minion is getting to be this minion`s overlord?',
                        choices: overlordChoices,
                    },
                ])
                    .then((rest) => db.updateMinionOverlord(minionId, rest.overlordId))
                    .then(() => console.log('Gave this minion a new overlord'))
                    .then(() => loadMainPrompts());
            });
        });
    });
}

//VIEW ALL ROLES
function viewRoles() {
    db.findAllRoles().then(({ rows }) => {
        let roles = rows;
        console.log('\n');
        console.table(roles);
    })
    .then(() => loadMainPrompts());
}

//ADD NEW ROLE
function addRole() {
    db.findAllDepartments().then(({ rows }) => {
        let departments = rows;
        const departmentChoices = departments.map(({ id, name }) => ({
            name: name,
            value: id,
        }));
        prompt([
            {
                name: 'title',
                message: 'What is this role`s name?',
            },
            {
                name: 'salary',
                message: 'What are we paying for this role?',
            },
            {
                type: 'list',
                name: 'department_id',
                message: 'What deparment is this role in?',
                choices: departmentChoices,
            },
        ]).then((role) => {
            db.createRole(role).then(() =>
            console.log(`Added ${role.title} to the database`))
            .then(() => loadMainPrompts());
        });
    });
}

//DELETE ROLE
function deleteRole() {
    db.findAllRoles().then(({ rows }) => {
        let roles = rows;
        const roleChoices = roles.map(({ id, title}) => ({
            name: title,
            value: id,
        }));
        prompt([
            {
                type: 'list',
                name: 'roleId',
                message: 'Which role are you deleting? (WARNING: WILL ALSO DELETE MINIONS)',
                choices: roleChoices,
            },
        ])
        .then((res) => db.deleteRole(res.roleId))
        .then(() => console.log('Deleted role from existence'))
        .then(() => loadMainPrompts());
    });
}

//VIEW DEPARTMENTS
function viewDepartments() {
    db.findAllDepartments().then(({ rows }) => {
        let departments = rows;
        console.log('\n');
        console.table(departments);
    }).then(() => loadMainPrompts());
}

//ADD DEPARTMENT
function addDepartment() {
    prompt([
        {
            name: 'name',
            message: 'What`s the department`s name?',
        },
    ]).then((res) => {
        let name = res;
        db.createDepartment(name).then(() =>
        console.log(`Added ${name.name} to the database`))
        .then (() => loadMainPrompts());
    });
}

//DELETE DEPARTMENT
function deleteDepartment() {
    db.findAllDepartments().then(({ rows }) => {
        let departments = rows;
        const departmentChoices = departments.map(({ id, name }) => ({
            name: name,
            value: id,
        }))
        prompt({
            type: 'list',
            name: 'departmentId',
            message: 'Which department are you deleting? (WARNING: WILL ALSO DELETE ASSOCIATED ROLES AND MINIONS',
            choices: departmentChoices,
        })
            .then((res) => db.removeDepartment(res.departmentId))
            .then(() => console.log('Deleted this department from existence'))
            .then(() => loadMainPrompts());
    }) ;
}

//VIEW DEPARTMENTS AND SHOW BUDGETS
function viewBudgetByDepartment() {
    db.viewBudgetByDepartment().then(({ rows }) => {
        let departments = rows;
        console.log('\n');
        console.table(departments);
    })
    .then(() => loadMainPrompts());
}

//ADD NEW MINION
function addMinion() {
    prompt([
        {
            name: 'first_name',
            message: 'What is this minion`s first name?',
        },
        {
            name: 'last_name',
            message: 'What is this minion`s surname?',
        },
    ]).then((res) => {
        let firstName = res.first_name;
        let lastName = res.last_name;
        db.findAllRoles().then(({ rows }) => {
            let roles = rows;
            const roleChoices = roles.map(({ id, title}) => ({
                name: title,
                value: id,
            }));
            prompt({
                type: 'list',
                name: 'roleId',
                message: 'What will this minion`s role be?',
                choices: roleChoices,
            }).then((res) => {
                let roleId = res.roleId;
                db.findAllMinions().then(({ rows }) => {
                    let minions = rows;
                    const overlordChoices = minions.map(({ id, first_name, last_name }) => ({
                        name: `${first_name} ${last_name}`,
                        value: id,
                    }));
                    overlordChoices.unshift({ name: 'None', value: null });
                    prompt({
                        type: 'list',
                        name: 'managerId',
                        message: 'Who is this minion`s overlord?',
                        choices: overlordChoices,
                    })
                    .then((res) => {
                        let minion = {
                            overlord_id: res.overlordId,
                            role_id: roleId,
                            first_name: firstName,
                            last_name: lastName,
                        };
                        db.createMinion(minion);
                    })
                    .then(() =>
                        console.log(`Added ${firstName} ${lastName} to the database`)
                    )
                    .then(() => loadMainPrompts());
                });
            });
        });
    });
}

//QUIT APPLICATION
function quit() {
    console.log('See you later... maybe.');
    process.exit();
}