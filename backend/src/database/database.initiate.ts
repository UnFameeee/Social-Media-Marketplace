import * as mysql from "mysql2";

export async function initialize(host, user, password, database){
    const connection = mysql.createConnection({
        host: host,
        user: user,
        password: password,
    });
    connection.query(
        `CREATE DATABASE IF NOT EXISTS \`${database}\`;`,
        async (err, results) => {
            results ? console.log(`Create Database ${database} complete!`) : console.log(err);
        }
    );
    connection.end();
};