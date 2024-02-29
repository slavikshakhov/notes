1. npm init
2. install deps
3. add tsconfig.json
4. create server (app.ts)

// add MySql db 5. in MySql workbench:
create database notes;
use notes;
create table notestable(id int primary key not null auto_increment, description varchar(30)); 6. src/utils/database.ts --- connect to db

(3) tsconfig.json:
{
"compilerOptions": {
"target": "es6",
"module": "commonjs", // allow import
"outDir": "./dist", // > npm tsc compiles to ...
"strict": true,
"esModuleInterop": true,
"skipLibCheck": true,
"forceConsistentCasingInFileNames": true
},
"include": ["src/**/*.ts"],
"exclude": ["node_modules"]
}

!! postman: headers-- Content-Type: application/json
