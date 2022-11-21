# Plagiarism-Dashboard

# What is this project about ?
A web application to visualize code plagiarism for teachers who are teaching introductory programming classes. It has an assignment management system, which allows 
to register new courses and upload assignments. Students can be enrolled in the user management module, and the student who are enrolled will receive an email 
notification along with the uploaded assignemnt.

Once the student submissions are saved in their respective assignment folder, then after logging into the application the dashboard fetches the similarity scores of the
assignments and displays visualizations. Similarity scores of each compared assignment can also be viewed in the submission view of the assignment table.
This allows a teacher to manage better and understand which courses need attention or which student requires more attention.

# How the similarity scores are calculated?
This project uses Dolos as the backend logic to calculate similarity scores.
Here is the link to Dolos: https://github.com/dodona-edu/dolos
Citation: Maertens et. al. (2022) J. Computer Assisted Learning doi:10.1111/jcal.12662

# What are the versions required?
Below are the required versions of the technologies to run this application:
Angular 14, Node 16, npm 8
Django 4, Dolos v1.7, Tree-sitter v0.20

# How to run this web application?
After installing the above versions run these commands:

-In NodeJS_Dolos -> open cmd and input command ( node app.js )
-In PlagDash -> open cmd and input command ( ng serve -o )
-In backendDash -> open cmd and input command ( python manage.py runserver )


Note: In NodeJS_Dolo s-> app.js, you need to add your own email ID and pass in app.get("/sendEmail" ..   method to send email notifications.





