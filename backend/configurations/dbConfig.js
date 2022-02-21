module.exports = {
    user: "sa",
    password: "teodora1230",
    server: "DESKTOP-H0J9TJ1\\SQLEXPRESS",
    database: "DB_MySpecialEducator",
    port: 1433,
    options: {
        encrypt: false,
        useUTC: true,
    },
    pool: {
        max: 100,
        min: 0,
        idleTimeoutMillis: 3600000
    }
};