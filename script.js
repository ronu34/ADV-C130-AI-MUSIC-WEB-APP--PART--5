let song1 = "";
let song2 = "";
let leftWristX = null;
let leftWristY = null;
let rightWristX = null;
let rightWristY = null;
let scoreOfLeftWrist = null;
let scoreOfRightWrist = null;
let song1Status = "";
let song2Status = "";

function preload() {
    song1 = loadSound("song1.mp3");
    song2 = loadSound("song2.mp3");
}

function setup() {
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video,modelLoaded);
    posenet.on('pose',getPoses);
}

function modelLoaded() {
    console.log("Model Successfully Loaded");
}

function getPoses(results) {
    if(results.length > 0 ) {
        console.log(results);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;

        console.log("Left Wrist x = " + leftWristX +"\n Left Wrist y = " + leftWristY);

        scoreOfLeftWrist = results[0].pose.keypoints[9].score;

        console.log("Keypoint of left wrist is "+scoreOfLeftWrist);

        scoreOfRightWrist = results[0].pose.keypoints[10].score;

        console.log("Keypoint of right wrist is "+scoreOfRightWrist);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

        console.log("Right Wrist x = "+rightWristX+"\n Right Wrist Y = "+rightWristY);
    }
}

function draw() {
    image(video,0,0,600,500);

    fill("#FF0000");
    stroke("#FF0000");

    song1Status = song1.isPlaying();

    if (scoreOfLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        song2.stop();
        if (song1Status == "false") {
            song1.play();
            document.getElementById("songname").innerHTML = "Song Name : On Your Mind [NCS Release]";
        }
    }

    song2Status = song2.isPlaying();

    if(scoreOfRightWrist > 0.2) {
        circle(rightWristX, rightWristY, 20);
        song2.stop();
        if (song1Status == "false") {
            song1.play();
            document.getElementById("songname").innerHTML = "Song Name : AI [NCS Release]";
        }
    }
}