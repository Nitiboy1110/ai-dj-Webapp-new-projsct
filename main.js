song1= "";
song2= "";

song1_status=0;
song2_status=0;


leftWrist_X=0;
rightWrist_X=0;
leftWrist_Y=0;
rightWrist_Y=0;
ScoreLeftWrist=0;
ScoreRightWrist=0;

function preload()
{
    song1 = loadSound("Demons.mp3");
    song2 = loadSound("Becky-G-Bella-Ciao.mp3");
}

function setup()
{
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    pose = ml5.poseNet(video, ModelLoaded);
    pose.on('pose', GotPosses);
}

function draw()
{
    image(video, 0,0 , 600,500);


    fill("#FF0000");
    stroke("#FF0000");




    if(ScoreLeftWrist > 0.2){
        circle(leftWrist_X,leftWrist_Y,20);
        inNumberLeftWrist_Y = Number(leftWrist_Y);
        removeDecimals = floor(inNumberLeftWrist_Y);
        volume = removeDecimals/500;
        document.getElementById("Volume").innerHTML = "Volume = "+ volume;
        song.setVolume(volume);
        song1 = loadSound("Demons.mp3");
        song1.isPlaying("Demons.mp3");
    }

}

function ModelLoaded(){
    console.log("POSENET IS DUMBER THAN A RHUBARB AND RHUBARB IS DUMBER THEN A PLUOT")
}

function GotPosses(results){
    if (results.length > 0.2) {
        console.log(results);
        song1= stopSound("Demons.mp3")
        song2= loadSound("Becky-G-Bella-Ciao.mp3")

        leftWrist_X = results[0].pose.lefttWrist.x;
        rightWrist_X = results[0].pose.rightWrist.x;
        leftWrist_Y = results[0].pose.lefttWrist.y;
        rightWrist_Y = results[0].pose.rightWrist.y;

        ScoreLeftWrist = results[0].pose.keypoints[9].score;
        ScoreRightWrist = results[0].pose.keypoints[10].score;
    }
    

}
