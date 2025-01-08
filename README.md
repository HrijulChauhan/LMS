# Setup instructions
There are 2 folders here "backend" and "frontend", with the backend portion containing the API routes (using Supabase as a cloud hosted postgres database) and the frontend portion being written in VueJS. <br>

Simply clone the repository, and type `npm start` at the root of the repository. You can initialize the backend folder and the frontend folder individually, but I just made a package.json that starts both service concurrently. <br>

In order to run this repo however, you will have to setup a .env file in the root of the repo which contains your **supabase keys and URL** and save them in the following manner
```
SUPABASE_URL=<YOUR_URL>
SUPABASE_KEY=<YOUR_KEY>
```
# Tech stack
**Frontend**: Built with Vue.js and TailwindCSS.<br>
Displays dynamic lists of books based on their status (available, borrowed, etc.).<br>
Search and filtering functionality included for easy navigation.<br>
Provides modals for borrowing and returning books.<br>

**Backend**: Built with Express.js.<br>
Handles routes for adding, editing, borrowing, and returning books.<br>
Communicates with the Supabase database for data persistence.<br>

**Database**: Managed with Supabase.<br>
Contains a books table with fields like id, title, author, availability, borrowed_by, and borrower_id.<br>
<br>

# Features <br>
Add Book: Allows users to add new books to the library by entering the book title, author, and availability. <br>
Edit Book: Provides functionality to update book details. <br>
Borrow Book: Users can borrow books. The app tracks the borrower's information and marks the book as unavailable. <br>
Return Book: A list of all borrowed books, including the borrower's name, with an option to return the book. <br>
Search: Search functionality available on all pages. <br>


# Some Screenshots
<br>

![image](https://github.com/user-attachments/assets/e17df4d4-50d1-4778-ba6e-89287ace2279) <br>
Home page <br>

![image](https://github.com/user-attachments/assets/2c4e05a7-0af6-486d-9101-f47acb22ea6b) <br>
Book list <br>

![image](https://github.com/user-attachments/assets/e4e22b1a-fb16-46f7-844b-8a47f7c69c3b)
Edit page <br>
