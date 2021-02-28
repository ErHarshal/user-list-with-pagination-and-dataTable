module.exports = {
    'createTableUser': 'create table if not exists users(id int primary key auto_increment,first_name varchar(100)not null,last_name varchar(100)not null,email_id varchar(100)not null, pwd_hash varchar(500)not null);',
    'createTableEmployee': 'create table if not exists employee(employee_id int not null,orgnization_name varchar(100)not null,user_id int,CONSTRAINT FK_user_id FOREIGN KEY (user_id)REFERENCES users(id));',
    'insertIntoUserTable': 'insert into users(first_name, last_name, email_id, pwd_hash) values(?,?,?,?)',
    'insertIntoEmployeeTable': 'insert into employee(employee_id, orgnization_name, user_id) values(?,?,?)',
    'checkEmployeeIdExits': 'select user_id from employee where employee_id = ?',
    'getPassword': 'select pwd_hash from users where email_id = ?',
    'getUserList': 'SELECT first_name as firstName, last_name as lastName, email_id as emailId, orgnization_name as orgnizationName, employee_id as employeeId FROM users INNER JOIN employee ON user_id = id {{searchQuery}} {{orderBy}} limit ? offset ?;',
    'getTotalRecords': 'SELECT count(id) as total FROM users INNER JOIN employee ON user_id = id {{searchQuery}}'
}