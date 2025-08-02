
### Prisma Commands
````
npx prisma generate
npx prisma migrate dev --name init
npx prisma studio    -- to check the tables inside the database
npx tsx ./db/seed   -- to seed/migrate the sample data to the prisma database
````

### What is 'T' generic data type in Tysecript
It means that the function can accept any datatype whether string, array, number etc.


### Serverless environment config
````
npm i @neondatabase/serverless 

// not working 
npm i @neondatabase/serverless @prisma-adapter-neon ws

npm i -D @types/ws bufferutil
````


### Run these commands after creating Prisma tables for User authetication (Next Auth)
````
npx prisma generate
npx prisma migrate dev --name add_user_based_tables
````

#### Bcyrpt library in TypeScript
````
npm i bcrypt-ts-edge
````