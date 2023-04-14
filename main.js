img = "";
status = "";
objects = "";
function preload()
{
    img = loadImage('dog_cat.jpg');
}
function setup()
{
    canvas = createCanvas(380, 380);
    canvas.position(650,250)
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = 'Estatus = detectando objetos';
}
function draw() {
    image(video, 0, 0, 380, 380);
    if(status != "")
    {
        console.log("hola");
        r = random (255)
        g = random (255)
        b = random (255)
        objectDetector.detect(video, gotResults);
        for(x = 0; x < objects.length; x++)
        {
            percent = floor(objects[x].confidence*100);
            text(objects[x].label + " " + percent + "%", objects[x].x + 15, objects[x].y +15);
            fill(r,g,b);
            noFill();
            stroke(r,g,b);
            rect(objects[x].x, objects[x].y, objects[x].width, objects[x].height);
            document.getElementById("status").innerHTML = 'Estatus = Objetos Detectados ' + (x + 1) ;
        }
    }
}
function modelLoaded()
{
    console.log("modelo cargado");
    status = true;
    objectDetector.detect(video,gotResults);
}
function gotResults(error,results)
{
    if (error) 
    {
        console.log(error);        
    }
    else
    {
        console.log(results);
    }
    objects = results;
}