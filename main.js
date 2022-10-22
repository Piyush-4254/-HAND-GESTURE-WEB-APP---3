Webcam.set({
    width:350,
    height:300,
    image_format : 'png',
    png_quality:90
});
camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot() {
    Webcam.snap(function(data_uri)
    {
        document.getElementById("result").innerHTML = '<img id="capture_image" src="'+data_uri+'"/>';
    });
}

console.log('ml5 jversion' ,ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/49SYIFHZw/model.json',modelLoaded);

function modelLoaded() 
{
    console.log('model loaded');
}


prediction1 = "";
prediction2 = "";

function speak()
{
    var synth = window.speechSynthesis;
speak_data1 = "The first prediction is "+prediction1;
speak_data1 = "Aad the second prediction is "+prediction2;
var utterhis = new SpeechSynthesisUtterance(speak_data1 + speak_data2);
synth.speak(utterhis);
}

function check()
{
    var img = document.getElementById("capture_image");
    classifier.classify(img,gotresult);

}
function gotresult(error,results)
{
    if(error)
        {
console.error(error);
        }
        else
        {
            console.log(results);
           document.getElementById("result_emotion_name1").innerHTML = results[0].label;
           document.getElementById("result_emotion_name2").innerHTML = results[1].label;
           prediction1 = results[0].label;
           prediction2 = results[1].label;
           speak();   

           if(results[0].label == "Best")
           {
            document.getElementById("upade_emoji_1").innerHTML = "&#128077";
           }

           if(results[0].label == "Victory")
           {
            document.getElementById("upade_emoji_1").innerHTML = "&#9996";
           }

           if(results[0].label == "Amazing")
           {
            document.getElementById("upade_emoji_1").innerHTML = "&#128076";
           }

           if(results[1].label == "Best")
           {
            document.getElementById("upade_emoji_2").innerHTML = "&#9994";
           }

           if(results[1].label == "Victory")
           {
            document.getElementById("upade_emoji_2").innerHTML = "&#128079";
           }

           if(results[1].label == "Amazing")
           {
            document.getElementById("upade_emoji_2").innerHTML = "&#129304";
           }
        }
}