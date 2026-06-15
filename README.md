# Face Capture Application

A React-based face capture system that uses MediaPipe FaceMesh for real-time face detection and validation before allowing image capture.

## Features

* Real-time webcam preview using React Webcam
* Face detection using MediaPipe FaceMesh
* Full-face validation before capture
* Face alignment verification
* Automatic photo capture after successful face detection
* Retake photo functionality
* no detection of multiple face
* Face scoring system based on:

  * Face size
  * Face position
  * Face symmetry
  * Eye visibility
  * Mouth visibility

## Technologies Used

* React
* React Webcam
* MediaPipe FaceMesh
* JavaScript
* HTML/CSS

## Project Structure

```text
src/
├── components/
│   ├── CameraView.js
│   ├── FaceCamera.js
│   └── capturePhoto.js
│
├── hooks/
│   ├── useFaceDetection.js
│   └── useHandDetection.js
│
├── utils/
│   └── faceValidator.js
│
├── App.js
└── index.js
```

## Installation

1. Clone the repository

```bash
git clone <repository-url>
```

2. Navigate to the project directory

```bash
cd face-capture-app
```

3. Install dependencies

```bash
npm install
```

4. Start the development server

```bash
npm start
```

The application will run on:

```text
http://localhost:3000
```

## How It Works

1. The webcam captures live video.
2. MediaPipe FaceMesh detects facial landmarks.
3. Facial landmarks are validated using custom rules.
4. A face score is generated.
5. When the face meets the required criteria, the system allows image capture.
6. The captured image is displayed with an option to retake.

## Future Enhancements


* Face angle validation
* Image quality assessment
* Backend image upload support
* User authentication

## Author

Annliya Jiju

## License

This project is created for educational and learning purposes.
