const ageGroupButtons = document.querySelectorAll('.age-group-btn');
const mainContainer = document.getElementById('main-container');
const exerciseSelection = document.getElementById('exercise-selection');
const exercisesDiv = document.getElementById('exercises');
const exerciseContainer = document.getElementById('exercise-container');
const video = document.getElementById('webcam');
const canvas = document.getElementById('output');
const feedback = document.getElementById('feedback');
const exerciseName = document.getElementById('exercise-name');
const exerciseInstructions = document.getElementById('exercise-instructions');
const ctx = canvas.getContext('2d');

let detector;
let poses;
let currentExercise;

const exercises = {
    1: [ // 10-18
        { name: 'Jumping Jacks', instructions: 'Stand with your feet together and your arms at your sides. Jump up, spreading your feet beyond your hips while bringing your arms above your head. Jump back to the starting position.' },
        { name: 'Squats', instructions: 'Stand with your feet shoulder-width apart. Lower your hips as if you were sitting in a chair, keeping your chest up and back straight. Go as low as you can, then return to the starting position.' },
        { name: 'High Knees', instructions: 'Stand in place and run, lifting your knees as high as you can. Keep your back straight and core engaged.' }
    ],
    2: [ // 18-60
        { name: 'Push-ups', instructions: 'Get on all fours, placing your hands slightly wider than your shoulders. Straighten your arms and legs. Lower your body until your chest nearly touches the floor. Push yourself back up.' },
        { name: 'Lunges', instructions: 'Step forward with one leg, lowering your hips until both knees are bent at a 90-degree angle. Keep your front knee directly above your ankle. Push off your front foot to return to the starting position.' },
        { name: 'Plank', instructions: 'Start in a push-up position, but with your weight on your forearms instead of your hands. Keep your body in a straight line from your head to your heels. Hold this position.' }
    ],
    3: [ // Above 60
        { name: 'Chair Squats', instructions: 'Stand in front of a chair with your feet shoulder-width apart. Lower your body as if you are going to sit down, lightly touching the chair before standing back up. Keep your back straight.' },
        { name: 'Wall Push-ups', instructions: 'Stand facing a wall, about arm\'s length away. Place your hands on the wall, slightly wider than your shoulders. Bend your elbows and lower your upper body toward the wall. Push back to the starting position.' },
        { name: 'Marching in Place', instructions: 'Stand straight and lift one knee up as high as is comfortable, then lower it and lift the other. Keep your core engaged and use a chair for balance if needed.' }
    ]
};

ageGroupButtons.forEach(button => {
    button.addEventListener('click', () => {
        const ageGroup = button.dataset.ageGroup;
        showExercises(ageGroup);
    });
});

function showExercises(ageGroup) {
    document.getElementById('age-groups').classList.add('hidden');
    exerciseSelection.classList.remove('hidden');
    exercisesDiv.innerHTML = '';
    exercises[ageGroup].forEach(exercise => {
        const button = document.createElement('button');
        button.className = 'exercise-btn';
        button.innerText = exercise.name;
        button.onclick = () => startExercise(exercise);
        exercisesDiv.appendChild(button);
    });
}

async function startExercise(exercise) {
    currentExercise = exercise;
    mainContainer.classList.add('hidden');
    exerciseContainer.classList.remove('hidden');
    exerciseName.innerText = exercise.name;
    exerciseInstructions.innerText = exercise.instructions;
    await setupWebcam();
    await loadPoseDetectionModel();
    detectPose();
}

async function setupWebcam() {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
    return new Promise((resolve) => {
        video.onloadedmetadata = () => {
            video.width = video.videoWidth;
            video.height = video.videoHeight;
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            resolve(video);
        };
    });
}

async function loadPoseDetectionModel() {
    const model = poseDetection.SupportedModels.MoveNet;
    detector = await poseDetection.createDetector(model);
}

async function detectPose() {
    if (detector) {
        poses = await detector.estimatePoses(video);
        ctx.drawImage(video, 0, 0, video.width, video.height);
        if (poses && poses.length > 0) {
            const keypoints = poses[0].keypoints;
            // Draw keypoints and skeleton
            drawKeypoints(keypoints);
            drawSkeleton(keypoints);
            // Check posture
            const feedbackText = checkPosture(currentExercise.name, keypoints);
            feedback.innerText = feedbackText;
        }
        requestAnimationFrame(detectPose);
    }
}

function drawKeypoints(keypoints) {
    for (let i = 0; i < keypoints.length; i++) {
        const keypoint = keypoints[i];
        if (keypoint.score > 0.3) {
            ctx.beginPath();
            ctx.arc(keypoint.x, keypoint.y, 5, 0, 2 * Math.PI);
            ctx.fillStyle = 'red';
            ctx.fill();
        }
    }
}

function drawSkeleton(keypoints) {
    const adjacentKeyPoints = poseDetection.util.getAdjacentPairs(poseDetection.SupportedModels.MoveNet);
    adjacentKeyPoints.forEach((pair) => {
        const [i, j] = pair;
        const kp1 = keypoints[i];
        const kp2 = keypoints[j];
        if (kp1.score > 0.3 && kp2.score > 0.3) {
            ctx.beginPath();
            ctx.moveTo(kp1.x, kp1.y);
            ctx.lineTo(kp2.x, kp2.y);
            ctx.strokeStyle = 'green';
            ctx.lineWidth = 2;
            ctx.stroke();
        }
    });
}
