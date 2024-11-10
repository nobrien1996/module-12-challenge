const pool = require('./connection');

class DB {
    constructor() {}

    async query(sql, args = []) {
        const client = await pool.connect();
        try {
            const result = await client.query(sql, args);
            return result;
        } finally {
            client.release();
        }
    }

    //FIND ALL MINIONS AND DISPLAY ALL THEIR INFO
    findAllMinions() {
        return this.query(
            'SELECT minion.id, minion.first_name, minion.last_name, role.title, department.name AS department, role.salary, CONCAT(overlord.first_name, " ", overlord.last_name) AS overlord FROM minion LEFT JOIN role on minion.role_id = role.id LEFT JOIN minion overlord on overlord.id = minion.overlord_id'
        );
    }

    //FIND ALL MINIONS EXCEPT SELECTED MINION
    findAllOverlords(minionId) {
        return this.query(
            'SELECT id, first_name, last_name FROM minion WHERE id != $1', [ minionId ]
        );
    }

    //CREATE NEW MINION
    createMinion(minion) {
        const { first_name, last_name, role_id, overlord_id } = minion;
        return this.query(
            'INSERT INTO minion (first_name, last_name, role_id, overlord_id) VALUES ($1, $2, $3, $4)',
            [first_name, last_name, role_id, overlord_id]
        );
    }

    //REMOVE SELECTED MINION
    deleteMinion(minionId) {
        return this.query('DELETE FROM minion WHERE id = $1', [ minionId ]);
    }

    //UPDATE SELECTED MINION'S JOB
    updateMinionRole(minionId, roleId) {
        return this.query('UPDATE minion SET role_id = $1 WHERE id = $2', [ roleId, minionId ]);
    }

    //UPDATE SELECTED MINION'S OVERLORD
    updateMinionOverlord(minionId, overlordId) {
        return this.query('UPDATE minion SET overlord_id = $1 WHERE id = $2', [ overlordId, minionId ]);
    }

    //FINE ALL ROLES AND DISPLAY DEPARTMENT NAME
    findAllRoles() {
        return this.query(
            'SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;'
        );
    }

    //CREATE NEW ROLE
    createRole(role) {
        const { title, salary, department_id } = role;
        return this.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [ title, salary, department_id ]);
    }

    //DELETE ROLE FROM DB
    deleteRole(roleId) {
        return this.query('DELETE FROM role WHERE id = $1', [ roleId ]);
    }

    //FIND ALL DEPARTMENTS
    findAllDepartments() {
        return this.query('SELECT department.id, department.name FROM department');
    }

    //FIND ALL DEPARMTNETS AND SHOW MINIONS, ROLES, AND BUDGETS
    viewBudgetByDepartment() {
        return this.query('SELECT department.id, department.name, SUM(role.salary AS utilized_budget FROM minion LEFT JOIN role on minion.role_id = role.id LEFT JOIN department on role.department_id = department.id GROUP BY department.id, department.name;'
        );
    }

    //CREATE DEPARTMENT
    createDepartment(department) {
        return this.query('INSERT INTO department (name) VALUES ($1)', [ department.name, ]);
    }

    //DELETE DEPARTMENT
    removeDepartment(departmentId) {
        return this.query('DELETE FROM department WHERE id = $1', [ departmentId ]);
    }

    //FIND MINION BY DEPARTMENT
    findAllMinionsByDepartment(departmentId) {
        return this.query(
            'SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department department on role.department_id = department.id WHERE department.id = $1;', 
            [ departmentId ]
        );
    }

    //FIND ALL MINIONS BY OVERLORD AND SHOW TITLES AND DEPARTMENT NAMES
    findAllMinionsByOverlord(overlordId) {
        return this.query(
            'SELECT employee.id, employee.first_name, employee.last_name, department.name AS department, role.title FROM employee LEFT JOIN role on role.id = employee.role_id LEFT JOIN department ON department.id = role.department_id WHERE manager_id = $1;',
            [ managerId ]
        );
    }
}

module.exports = new DB();