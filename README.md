# Real-Time Face Detection & Authentication System

## Overview

This project is a browser-based Face Detection and Face Authentication System developed using React.js and MediaPipe Face Mesh.

The application captures webcam input, detects facial landmarks in real time, validates face alignment, and performs user authentication by comparing facial landmark data.

The system runs entirely on the client side and does not require a backend server.

---

## Features

* Real-time face detection using MediaPipe Face Mesh
* Detection of multiple faces
* Face alignment validation
* Face quality scoring
* Automatic image capture with countdown
* Face registration
* Face authentication
* Webcam integration
* Local storage-based face data persistence

---
## Hosted Link
https://face-detection-m680.onrender.com/

## Technologies Used

* React.js
* JavaScript
* MediaPipe Face Mesh
* Webcam API
* Local Storage
* CSS

---

## System Workflow

### 1. Camera Initialization

* User grants webcam permission.
* Webcam stream starts.
* Application waits until the camera becomes ready.

### 2. Face Detection

* MediaPipe Face Mesh processes webcam frames.
* Facial landmarks are extracted.
* Number of faces is calculated.

Requirements:

* Exactly one face must be visible.
* Multiple faces are rejected.

### 3. Face Validation

The application calculates a Face Score based on:

* Face visibility
* Face position
* Landmark consistency
* Face alignment

Conditions:

Face Score > 70

AND

Face Count = 1

Only then the face is considered valid.

### 4. Automatic Capture

When a valid face is detected:

3...

2...

1...

The application automatically captures an image from the webcam.

### 5. Face Registration

When the user clicks **Register Face**:

* Current facial landmarks are extracted.
* Landmark data is stored in browser localStorage.

### 6. Face Authentication

When the user clicks **Authenticate**:

* Registered facial landmarks are loaded.
* Current facial landmarks are captured.
* Both landmark sets are compared.

### 7. Authentication Result

If similarity exceeds the predefined threshold:

Authentication Success

Otherwise:

Authentication Failed

---

## Project Structure

src/

├── components/

│ ├── CameraView.js

│ └── FaceCamera.js

│

├── hooks/

│ └── useFaceDetection.js

│

├── utils/

│ ├── faceValidator.js

│ └── faceMatcher.js

│

└── App.js

---

## Installation

Clone the repository:

```bash
git clone <repository-url>
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm start
```

---

## Future Improvements

### Backend Integration

* Node.js
* Express.js
* MongoDB

### Advanced Face Recognition

* Face-api.js
* InsightFace
* FaceNet

### Security Enhancements

* JWT Authentication
* Database Storage
* User Accounts

### Anti-Spoofing Protection

* Photo attack detection
* Replay attack prevention
* Liveness detection

---

## Limitations

Current version uses client-side storage and landmark comparison only.

Limitations include:

* No backend server
* No database
* LocalStorage can be cleared
* Not suitable for production security
* Landmark-based matching only

---

## Learning Outcomes

Through this project, I learned:

* React component architecture
* React Hooks
* Webcam integration
* Real-time computer vision concepts
* Facial landmark detection
* Client-side authentication workflows
* State management
* Browser storage mechanisms

---

## Author

Annliya Jiju

Developed as a learning project to explore real-time face detection and biometric authentication concepts using React and MediaPipe.
