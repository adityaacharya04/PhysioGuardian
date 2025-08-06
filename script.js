const ageGroupButtons = document.querySelectorAll('.age-group-btn');
const exerciseSelection = document.getElementById('exercise-selection');
const exerciseButtonsDiv = document.getElementById('exercise-buttons');
const exerciseArea = document.getElementById('exercise-area');
const video = document.getElementById('webcam');
const canvas = document.getElementById('output');
const feedback = document.getElementById('feedback');
const ctx = canvas.getContext('2d');
const navLinks = document.querySelectorAll('header nav a');
const sections = document.querySelectorAll('main section');

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
    exerciseButtonsDiv.innerHTML = '';
    exercises[ageGroup].forEach(exercise => {
        const button = document.createElement('button');
        button.className = 'exercise-btn';
        button.innerText = exercise.name;
        button.onclick = () => startExercise(exercise);
        exerciseButtonsDiv.appendChild(button);
    });
}

async function startExercise(exercise) {
    currentExercise = exercise;
    exerciseSelection.classList.add('hidden');
    exerciseArea.classList.remove('hidden');
    feedback.innerText = exercise.instructions;
    await setupWebcam();
    await loadPoseDetectionModel();
    detectPose();
}

document.addEventListener('DOMContentLoaded', () => {
    renderVideoTutorials();
    renderFAQs();
    // Initially hide all sections except the first one
    sections.forEach((section, index) => {
        if (index !== 0) {
            section.classList.add('hidden');
        }
    });
});

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        sections.forEach(section => {
            if (targetId === `#${section.id}`) {
                section.classList.remove('hidden');
            } else {
                section.classList.add('hidden');
            }
        });
    });
});

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

function getAngle(p1, p2, p3) {
    const a = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
    const b = Math.sqrt(Math.pow(p3.x - p2.x, 2) + Math.pow(p3.y - p2.y, 2));
    const c = Math.sqrt(Math.pow(p1.x - p3.x, 2) + Math.pow(p1.y - p3.y, 2));
    return Math.acos((a * a + b * b - c * c) / (2 * a * b)) * 180 / Math.PI;
}

function checkSquat(keypoints) {
    const leftHip = keypoints.find(p => p.name === 'left_hip');
    const leftKnee = keypoints.find(p => p.name === 'left_knee');
    const leftAnkle = keypoints.find(p => p.name === 'left_ankle');
    const rightHip = keypoints.find(p => p.name === 'right_hip');
    const rightKnee = keypoints.find(p => p.name === 'right_knee');
    const rightAnkle = keypoints.find(p => p.name === 'right_ankle');

    let feedbackText = '';

    if (leftHip && leftKnee && leftAnkle && rightHip && rightKnee && rightAnkle) {
        const leftKneeAngle = getAngle(leftHip, leftKnee, leftAnkle);
        const rightKneeAngle = getAngle(rightHip, rightKnee, rightAnkle);

        if (leftKneeAngle < 80 || rightKneeAngle < 80) {
            feedbackText = 'Good depth!';
        } else if (leftKneeAngle > 100 || rightKneeAngle > 100) {
            feedbackText = 'Lower your hips!';
        } else {
            feedbackText = 'Hold the position.';
        }
    } else {
        feedbackText = 'Make sure your whole body is visible.';
    }

    return feedbackText;
}

const videoTutorials = [
    { id: 1, title: 'Jumping Jacks Tutorial', category: 'Cardio', url: 'https://www.youtube.com/watch?v=c4DAnQ6DtF8' },
    { id: 2, title: 'Squats Tutorial', category: 'Strength', url: 'https://www.youtube.com/watch?v=aclHkV_2HeA' },
    { id: 3, title: 'Push-ups Tutorial', category: 'Strength', url: 'https://www.youtube.com/watch?v=Pkj8R1jknNo' },
    { id: 4, title: 'Yoga for Beginners', category: 'Flexibility', url: 'https://www.youtube.com/watch?v=v7AYKMP6rOE' },
];

function renderVideoTutorials() {
    const videoTutorialsDiv = document.getElementById('video-tutorials');
    videoTutorialsDiv.innerHTML = '';
    videoTutorials.forEach(video => {
        const videoDiv = document.createElement('div');
        videoDiv.innerHTML = `
            <h3>${video.title}</h3>
            <a href="${video.url}" target="_blank" rel="noopener noreferrer">Watch Video</a>
        `;
        videoTutorialsDiv.appendChild(videoDiv);
    });
}

let completedExercises = [];

function renderProgress() {
    const progressTrackerDiv = document.getElementById('progress-tracker');
    progressTrackerDiv.innerHTML = '<h3>Completed Exercises:</h3>';
    const ul = document.createElement('ul');
    completedExercises.forEach(exercise => {
        const li = document.createElement('li');
        li.innerText = exercise;
        ul.appendChild(li);
    });
    progressTrackerDiv.appendChild(ul);
}

document.getElementById('mark-complete-btn').addEventListener('click', () => {
    if (currentExercise) {
        completedExercises.push(currentExercise.name);
        renderProgress();
        alert(`${currentExercise.name} marked as complete!`);
    }
});

const faqs = [
    {
        question: 'What should I do if I feel sharp pain during an exercise?',
        answer: 'Stop the exercise immediately. If the pain persists, consult a medical professional.',
    },
    {
        question: 'How often should I exercise?',
        answer: 'This depends on your individual condition and goals. It is best to consult with a physiotherapist to create a personalized exercise plan.',
    },
    {
        question: 'Can I use this app instead of seeing a real physiotherapist?',
        answer: 'This app is intended to be a supplementary tool to your physiotherapy treatment. It is not a replacement for professional medical advice.',
    },
];

function renderFAQs() {
    const faqSectionDiv = document.getElementById('faq-section');
    faqSectionDiv.innerHTML = '';
    faqs.forEach(faq => {
        const faqDiv = document.createElement('div');
        faqDiv.innerHTML = `
            <h3>${faq.question}</h3>
            <p>${faq.answer}</p>
        `;
        faqSectionDiv.appendChild(faqDiv);
    });
}

function checkPosture(exerciseName, keypoints) {
    switch (exerciseName) {
        case 'Squats':
            return checkSquat(keypoints);
        default:
            return '';
    }
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
            if (currentExercise) {
                const feedbackText = checkPosture(currentExercise.name, keypoints);
                feedback.innerText = feedbackText;
            }
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
