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

function checkPushup(keypoints) {
    const leftShoulder = keypoints.find(p => p.name === 'left_shoulder');
    const leftElbow = keypoints.find(p => p.name === 'left_elbow');
    const leftWrist = keypoints.find(p => p.name === 'left_wrist');
    const rightShoulder = keypoints.find(p => p.name === 'right_shoulder');
    const rightElbow = keypoints.find(p => p.name === 'right_elbow');
    const rightWrist = keypoints.find(p => p.name === 'right_wrist');
    const leftHip = keypoints.find(p => p.name === 'left_hip');
    const leftAnkle = keypoints.find(p => p.name === 'left_ankle');

    let feedbackText = '';

    if (leftShoulder && leftElbow && leftWrist && rightShoulder && rightElbow && rightWrist && leftHip && leftAnkle) {
        const leftElbowAngle = getAngle(leftShoulder, leftElbow, leftWrist);
        const rightElbowAngle = getAngle(rightShoulder, rightElbow, rightWrist);
        const bodyAngle = getAngle(leftShoulder, leftHip, leftAnkle);

        if (bodyAngle < 160 || bodyAngle > 190) {
            feedbackText = 'Keep your back straight!';
        } else if (leftElbowAngle < 90 || rightElbowAngle < 90) {
            feedbackText = 'Good form! Push up!';
        } else {
            feedbackText = 'Lower your body.';
        }
    } else {
        feedbackText = 'Make sure your whole body is visible.';
    }
    return feedbackText;
}

function checkJumpingJacks(keypoints) {
    // A simple check for arms up and legs spread
    const leftShoulder = keypoints.find(p => p.name === 'left_shoulder');
    const rightShoulder = keypoints.find(p => p.name === 'right_shoulder');
    const leftWrist = keypoints.find(p => p.name === 'left_wrist');
    const rightWrist = keypoints.find(p => p.name === 'right_wrist');
    const leftAnkle = keypoints.find(p => p.name === 'left_ankle');
    const rightAnkle = keypoints.find(p => p.name === 'right_ankle');

    if (leftWrist.y < leftShoulder.y && rightWrist.y < rightShoulder.y) {
        return "Arms up!";
    }
    if (Math.abs(leftAnkle.x - rightAnkle.x) > (rightShoulder.x - leftShoulder.x) * 2) {
        return "Legs apart!";
    }
    return "Jump!";
}

function checkLunge(keypoints) {
    const leftHip = keypoints.find(p => p.name === 'left_hip');
    const leftKnee = keypoints.find(p => p.name === 'left_knee');
    const leftAnkle = keypoints.find(p => p.name === 'left_ankle');
    const rightHip = keypoints.find(p => p.name === 'right_hip');
    const rightKnee = keypoints.find(p => p.name === 'right_knee');
    const rightAnkle = keypoints.find(p => p.name === 'right_ankle');

    if (leftHip && leftKnee && leftAnkle && rightHip && rightKnee && rightAnkle) {
        const leftKneeAngle = getAngle(leftHip, leftKnee, leftAnkle);
        const rightKneeAngle = getAngle(rightHip, rightKnee, rightAnkle);

        if (leftKneeAngle < 100 && rightKneeAngle < 100) {
            return "Great lunge!";
        } else {
            return "Lower your hips.";
        }
    }
    return "Make sure your whole body is visible.";
}

function checkPlank(keypoints) {
    const leftShoulder = keypoints.find(p => p.name === 'left_shoulder');
    const leftHip = keypoints.find(p => p.name === 'left_hip');
    const leftAnkle = keypoints.find(p => p.name === 'left_ankle');
    if (leftShoulder && leftHip && leftAnkle) {
        const bodyAngle = getAngle(leftShoulder, leftHip, leftAnkle);
        if (bodyAngle > 160 && bodyAngle < 190) {
            return "Excellent plank! Hold it.";
        } else {
            return "Straighten your back.";
        }
    }
    return "Make sure your side is visible to the camera.";
}

function checkHighKnees(keypoints) {
    const leftHip = keypoints.find(p => p.name === 'left_hip');
    const leftKnee = keypoints.find(p => p.name === 'left_knee');
    const rightHip = keypoints.find(p => p.name === 'right_hip');
    const rightKnee = keypoints.find(p => p.name === 'right_knee');

    if (leftHip && leftKnee && rightHip && rightKnee) {
        if (leftKnee.y < leftHip.y || rightKnee.y < rightHip.y) {
            return "Knees up higher!";
        }
    }
    return "Keep going!";
}


function checkPosture(exerciseName, keypoints) {
    switch (exerciseName) {
        case 'Squats':
        case 'Chair Squats':
            return checkSquat(keypoints);
        case 'Push-ups':
        case 'Wall Push-ups':
            return checkPushup(keypoints);
        case 'Jumping Jacks':
            return checkJumpingJacks(keypoints);
        case 'Lunges':
            return checkLunge(keypoints);
        case 'Plank':
            return checkPlank(keypoints);
        case 'High Knees':
        case 'Marching in Place':
            return checkHighKnees(keypoints);
        default:
            return '';
    }
}
