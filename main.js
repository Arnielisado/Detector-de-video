video="";
objects= [];
status="";

function preload(){
    video=createVideo('video.mp4');
    video.hide();
}
function setup(){
    canvas=createCanvas(480, 380);
    canvas.center();
}
function draw(){
    image(video, 0, 0, 480, 380);
        if(status != ""){
            objectDetector.detect(video, gotResults);
            for(i=0; i<objects.length; i++){
               document.getElementById("status").innerHTML="Estado: objetos detectados";
               document.getElementById("number_of_objects").innerHTML="Número de objetos detectados =" + objects.length;
               
               fill('#FF0000');
               percent=floor(objects[i].confidence * 100);
               text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y +15);
               noFill();
               stroke("#FF0000");
               rect(objects[i].x + 15, objects[i].y + 15, objects[i].width, objects[i].height);
            }
        }
}
function start(){
    objectDetector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Estado: Detectando objetos";
}
function modelLoaded(){
    console.log("¡Modelo Cargado!");
    status=true;
    video.loop();
    video.speed(1);
    video.volume(0);
}
function gotResults(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects=results;
}