# Infrastructure delivery pipeline documentation

## Overview

This project is part of the exam portfolio for the course IDATA2502 - Cloud services administration.
The project aims to create an infrastructure delivery pipeline that automates the deployment, testing and management of cloud-based services. This invloves integrating infrastructure as code, CI/CD workflows and robust testing. This is to have a robust, reliable and efficient deployment process.

I am using OpenStack as the cloud platform which includes a backend and frontend to host a simple concept chat application. You can send messages on the frontend which will be stored on the backend server and can be retrieved and displayed on the web application.

## Architecture overview
### Frontend:
A simple web based user interface where users can send and view sent messages. The frontend communicates with the backend with HTTP-based REST API calls.

You can access the web application here http://10.212.26.212/ . Note that you also have to be connected to NTNU’s network.

### Backend:
This is a Flask based server that handles API requests, processes data, and stores messages. 

### CI/CD pipeline:
This automated testing, deployment, and infrastructure updates by using GitHub Actions (Act) running on an OpenStack instance.

#### Cloud entities
* The project uses cloud infrastructure components which are provided by OpenStack:
* Frontend server - This is a virtual machine which hosts the frontend web application and it can be reached via a public IP. The server is configured with Apache to run the web user interface.
* Backend server - A virtual machine which runs the Flask backend application. The Flask backend application is responsible for handling API requests and data/message storage.
* OpenStack network - This is a network which connects the frontend and backend servers and allows them to communicate safely.
* Security groups - These are custom rules which act as a virtual firewall and it controls the traffic that is allowed to reach and leave resources it is associated with. It restricts access to specific ports, like for example port 5000 for my backend server and port 80 for my frontend server.

## Features
### Chat application
* The users can write messages in the frontend which are then sent to the backend server to be stored.
* The frontend communicates with the backend by using standard API endpoints. 
* There are backend tests which covers edge case scenarios like submissions of empty messages and displaying messages when there are none stored. 

### CI/CD pipeline
* There is a test suite which consists of unit, integration, and end-to-end tests.
* OpenStack resources are set up and managed by using Infrastructure as code (IaC) methods.
* A workflow file automates the testing and the deployment process.

### Security
* All sensitive information is stored in GitHub Secrets which safely stores sensitive information.
* Security groups restricts access to the servers.

## Tests
### Frontend tests
* Ensure that sending and recieving messages are possible.
* Test UI elements and make sure that they are working correctly and are updated when messages are sent or recieved.
* Mock API responses for simulating real scenarios.

### Backend tests
* Make sure that storing and retrieving messages are working.
* Test edge cases like empty message submission and fetching data from backend when nothing is stored yet.

### Integration tests
* Test communication between frontend and backend.
* Ensure that storage and retrieval are being done the correct way.

### End-to-end tests
* Simulate a user interaction where a message is being sent, stored in the backend, and then displayed in the UI.

## Resources
I have gotten help from AI to write parts of the code, improve code, help with writing, and help with solving errors.