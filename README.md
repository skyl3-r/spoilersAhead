# spoilersAhead
Web forum to discuss movies and books, developed for CVWO application

![image](https://github.com/user-attachments/assets/e2483f9a-680e-4068-a4f6-870205f22401)

## Set up
1. Ensure that you have go downloaded (or download it [here](https://go.dev/doc/install))
2. Ensure that you have PostGres (preferably PostGres 16) downloaded (or download it [here](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads))
3. Create a user and password if this is your first time using PostGres. This can be done in pgAdmin, which should be downloaded with PostGres.
4. Create a database named `spoilersahead` under the user you just created.
5. Now, in your desired directory, `git clone https://github.com/skyl3-r/spoilersAhead.git`
6. Open your terminal in the spoilersAhead directory and run `cd backend`
7. Create a `.env` in `/backend` and put in information in the format below:
```
SECRET_KEY= write_anything_here
DB_USER= write_your_user_here
DB_PASSWORD= write_your_password_here
DB_NAME=spoilersahead
```
8. While still in `/backend`, run `go run main.go`. The backend is now running.
9. Now, create another terminal in the spoilersAhead directory and run `cd frontend`
10. Run `npm install` to install dependencies. 
11. Run `npm run dev` to run the app. 
12. Before properly exploring the app, go to `http://localhost:3000/seed` and press "Seed Data" to seed the database with some data to begin with. If all is good, `status: ok` should be shown.
13. Go to `http://localhost:3000/` to check out the app! You can either create your own account or log in as Alice (password: 123456).

## Features
### Log in and Sign up
![image](https://github.com/user-attachments/assets/42463acf-f873-4dee-aeb8-8501b04adc5e)
![image](https://github.com/user-attachments/assets/bd5efd2b-1309-44cf-a592-38d60e2833c3)
- Logging in is not required, so that casual viewers can still browse the page.
- Accounts are easily created in the sign up page.
- Users can log in and out at any time by clicking on the button in the Header at the top.

### Popular Now Banner
- In the home page, a banner displays the top 4 fandoms with the most amount of posts, arranging them by number of posts and date of latest post.
- This allows users to increase exposure to new fandoms.

### Search posts
- Easily search for posts by entering keywords in the title or the fandoms to include.
- Users can also choose to only display posts they have made. If the user is not logged in, no posts will be shown.

### Add new post
![image](https://github.com/user-attachments/assets/175fdd4b-4a0c-4653-b2b8-4e43b03d5e83)
- Only logged in users can see the button to add new post.
- When adding new post, users must choose a fandom, either from an existing list or add their own, and must enter in the title and body of the post.
- Empty fields will be flagged out to the user.
- After posting, the new post can immediately be seen in the home page.

### View post in more detail
![image](https://github.com/user-attachments/assets/e3a0139b-9098-40e2-8b7f-c88ad81ef5cd)
- In the home page, clicking on any of the posts displayed will lead to their main page.
- The full title, body date and time of creation can be seen here, as well as the comments and number of likes.
- If the user is the one who wrote the post, they will see the option to edit and delete the post.

### Like and unlike a post
- In the post view, clicking on the like button under the post will toggle the like.

### Comment on a post
![image](https://github.com/user-attachments/assets/d626d2de-27de-4aa7-943d-4520af7cbec1)
- In the post view, clicking on the comment button under the post will open up a form to add the comment.
- After commenting, the new comment can immediately be seen in the page.
- If the user is the one who wrote the comment, they will see the option to delete the post.

### Delete a comment
![image](https://github.com/user-attachments/assets/2a8ee9f0-1e70-41d5-ae79-401d7e242d50)
- Only the commmenter can delete their own comment.
- A pop up alert will double check that the user intends to delete the comment.

### Edit a post
![image](https://github.com/user-attachments/assets/94309e50-8b68-4fee-a606-d1c5eeeaca92)
- Only the poster can edit their own post.
- A form will open up. Similar to creating a post, users must choose a fandom, either from an existing list or add their own, and must enter in the title and body of the post.
- After updating, the time posted will also be changed.

### Delete a post
- Only the poster can delete their own post.
- A pop up alert will couble check that the user intends to delete the post.
