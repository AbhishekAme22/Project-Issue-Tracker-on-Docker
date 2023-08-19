
docker build -t project-issue-tracker-app .

docker build -t project-issue-tracker-mysql -f Dockerfile.mysql .

docker run -d --name mysql-container -e MYSQL_ROOT_PASSWORD=root_password -e MYSQL_DATABASE=issue_tracker -e MYSQL_USER=dev -e MYSQL_PASSWORD=1234 project-issue-tracker-mysql


docker run -d --name app-container -p 8080:3000 --link mysql-container project-issue-tracker-app


note get data from id add into html 