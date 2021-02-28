let config = {};

config.databaseDetails = {
    'host': process.env.DATABASE_HOSTNAME,
    'user': process.env.DATABASE_USERNAME,
    'password': process.env.DATABASE_PASSWORD,
    'database': process.env.DATABASE_NAME
};
config.brcyptSaltRounds = 10;

config.sortBy = [
    'first_name',
    'last_name',
    'email_id',
    'orgnization_name',
    'employee_id'
];

module.exports = config;
