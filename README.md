# spoilersAhead
Web forum to discuss movies and books, developed for CVWO application

## Set up
1. Ensure that you have PostGres (preferably PostGres 16) downloaded (or download it [here](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads))
2. Create a user and password if this is your first time using PostGres. This can be done in pgAdmin, which should be downloaded with PostGres.
3. Create a database named `spoilersahead` under the user you just created.
4. Now, in your desired directory, `git clone https://github.com/skyl3-r/spoilersAhead.git`
5. Open your terminal in the spoilersAhead directory and run `cd backend`
6. Create a `.env` in `/backend` and put in information in the format below:
```
SECRET_KEY= write_anything_here
DB_USER= write_your_user_here
DB_PASSWORD= write_your_password_here
DB_NAME=spoilersahead
```
8. While still in `/backend`, run `go run main.go`. The backend is now running.
9. Now, create another terminal in the spoilersAhead directory and run `cd frontend`
10. Run `npm install` to install dependencies. 
11. Run `npm run dev` to run the app. Go to `http://localhost:3000/` to see the app!
