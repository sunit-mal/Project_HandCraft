# Hand Craft

_Deployed By [Sunit Mal](https://github.com/sunit-mal)_

## Preview
![Screenshot (4)](https://github.com/sunit-mal/Project_HandCraft/assets/110469858/268291aa-bbe6-4014-8fa5-013acdf01cda)

![c0f3b214-f752-4d3e-ae6e-2d695826a7ba](https://github.com/sunit-mal/Project_HandCraft/assets/110469858/4e83a19d-c7db-416f-9bf7-974fa58dac63)

## Project Overview

Hand Craft is a sophisticated ecommerce platform designed to facilitate the buying and selling of handcrafted products. The platform provides a seamless experience for both sellers and buyers, offering a wide range of features to ensure smooth transactions and customer satisfaction.

### Key Features

- User-friendly interface for easy navigation and seamless user experience.
- Secure authentication and authorization mechanisms to protect user data and transactions.
- Advanced search and filtering options to help users find products quickly and efficiently.

## Technical Information

### Frontend

The frontend of Hand Craft is developed using React.js, a popular JavaScript library for building user interfaces. React.js provides a dynamic and interactive user experience, allowing for efficient rendering of components and seamless data updates.

### Backend

The backend of Hand Craft is powered by Spring Boot, a lightweight framework for building Java-based applications. Spring Boot provides robust features for developing scalable and high-performance web applications, including RESTful APIs, data access, and security.

### Database

Hand Craft utilizes MySQL Server as its backend database management system. MySQL is a reliable and efficient relational database that offers excellent performance and scalability for handling large volumes of data.

## Running the Application

To run the Hand Craft application locally, follow these steps:

### Prerequisites

- [Node.js](https://nodejs.org/en/download) and npm installed on your system.
- Java Development Kit ([JDK](https://download.oracle.com/java/21/latest/jdk-21_windows-x64_bin.exe)) installed on your system.
- [MySQL](https://dev.mysql.com/downloads/installer/) Server installed and running.

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/sunit-mal/Project_HandCraft.git
   ```

### Steps For run project

#### First you need to change you db config on properties file

_Steps :_
```bash
cd .\project_handicraft_backend\src\main\resources\
```
```bash
notepad .\application.properties
```
make your changes.

#### Now run backend 
```bash
.\mvnw spring-boot:run
```
#### Run Frontend:
```bash
cd .\project_handicraft_frontend\
```
```bash
npm i
```
```bash
num run
```
