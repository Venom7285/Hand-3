prediction = "";

Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

    camera = document.getElementById("camera");

Webcam.attach('#camera');


function take_snapshot() 
{
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id = "capture_image" src = "' + data_uri + '"/>';
    });
}

    console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/y0AjO7pYy/model.json', modelLoaded);

function modelLoaded()
{
    console.log('Model Loaded');
}

function speak() 
{
    var synth = window.speechSynthesis;
    speak_data = "The prediction is" + prediction;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}

function check()
{
    img = document.getElementById('capture_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, results)
{
    if (error) 
    {
        console.error(error);
    }

    else 
    {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        prediction = results[0].label;
        prediction_2 = results[1].label;
        speak();

        if(results[0].label == "best")
        {
            document.getElementById("update_emoji").innerHTML = "&#128522";
        }
        
        if(results[0].label == "amazed")
        {
            document.getElementById("update_emoji").innerHTML = "&#128532";
        }

        if(results[0].label == "victory")
        {
            document.getElementById("update_emoji").innerHTML = "&#128548";
        }

        if(results[1].label == "best")
        {
            document.getElementById("update_emoji2").innerHTML = "&#128522";
        }

        if(results[1].label == "amazed")
        {
            document.getElementById("update_emoji2").innerHTML = "&#128532";
        }

        if(results[1].label == "victory")
        {
            document.getElementById("update_emoji2").innerHTML = "&#128548";
        }
    }
}