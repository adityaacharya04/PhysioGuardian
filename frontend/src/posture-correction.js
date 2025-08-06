function getAngle(p1, p2, p3) {
    const a = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
    const b = Math.sqrt(Math.pow(p3.x - p2.x, 2) + Math.pow(p3.y - p2.y, 2));
    const c = Math.sqrt(Math.pow(p1.x - p3.x, 2) + Math.pow(p1.y - p3.y, 2));
    return Math.acos((a * a + b * b - c * c) / (2 * a * b)) * 180 / Math.PI;
}

function checkSquat(keypoints) {
    const leftHip = keypoints[23];
    const leftKnee = keypoints[25];
    const leftAnkle = keypoints[27];
    const rightHip = keypoints[24];
    const rightKnee = keypoints[26];
    const rightAnkle = keypoints[28];

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

window.checkPosture = function(exerciseName, keypoints) {
    switch (exerciseName) {
        case 'Squats':
            return checkSquat(keypoints);
        default:
            return '';
    }
}
