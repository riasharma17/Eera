const startbtn=document.querySelector("#start");
const stopbtn=document.querySelector("#stop");
const speakbtn=document.querySelector("#speak");
const time=document.querySelector("#time");
const battery=document.querySelector("#battery");
const internet=document.querySelector("#internet");
const turn_on=document.querySelector("#turn_on");
const playButton=document.querySelector("#playButton");
document.querySelector("#start_jarvis_btn").addEventListener("click" ,()=>{
    recognition.start()
})
const commandsDiv = document.querySelector(".commands");

//api setup
const SpeechRecognition=
window.SpeechRecognition ||window.webkitSpeechRecognition;

//fridaycommands

let fridaycoms=[];
fridaycoms.push("hello EERA");  
fridaycoms.push("open youtube");   
fridaycoms.push("open firebase");   
fridaycoms.push("open fire base");  
fridaycoms.push("open google");     
fridaycoms.push("are you listening to me"); 
fridaycoms.push("open github");   
fridaycoms.push("open my github profile"); 
fridaycoms.push("open my instagram account");
fridaycoms.push("open my linkedin account"); 
fridaycoms.push("what is my name"); 
fridaycoms.push("search for");


//weather setup
function weather(location){
const weatherCont=document.querySelectorAll(".temp *");

let url=(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=e29b84fb67d2515b505ed73393cce6ef`);
const xhr=new XMLHttpRequest();
xhr.open("get" ,url,true);
xhr.onload=function(){
    if(this.status===200){
        let data=JSON.parse(this.responseText);
        console.log(data);
        weatherCont[0].textContent = `Location : ${data.name}`;
        weatherCont[1].textContent = `Country : ${data.sys.country}`;
        weatherCont[2].textContent = `Weather type : ${data.weather[0].main}`;
        weatherCont[3].textContent = `Weather description : ${data.weather[0].description}`;
        weatherCont[4].src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        weatherCont[5].textContent = `Original Temperature : ${ktc(data.main.temp)}`;
        weatherCont[6].textContent = `feels like ${ktc(data.main.feels_like)}`;
        weatherCont[7].textContent = `Min temperature ${ktc(data.main.temp_min)}`;
        weatherCont[8].textContent = `Max temperature ${ktc(data.main.temp_max)}`;
       weatherStatement=`sir the weather in ${data.name} is${data.weather[0].description
       }and the temprature feels like ${ktc(data.main.feels_like) }`;
    }
    else{
        weatherCont[0].textContent="weather info not found";
    
}
};
xhr.send();
}

//ktc function to change temp to celcius
function ktc(kelvin) {
    return (kelvin - 273.15).toFixed(2); // Convert Kelvin to Celsius
}

//calling  the weather function
// weather("Rohtak");





//timesetup
let date=new Date()
let hrs=date.getHours()
let mins=date.getMinutes()
let secs=date.getSeconds()


function startJarvis() {
    turn_on.volume = 1; // Set volume

    // Start audio playback
    turn_on.play().then(() => {
        console.log("Audio is playing successfully.");

        // Start speech recognition after the audio has started playing
        recognition.start();
    }).catch(error => {
        console.error("Error playing audio: ", error);
    });

    // Set up the event listener for when the audio ends
    turn_on.addEventListener("ended", () => {
        setTimeout(() => {
           startJarvis();
            // readOut("ready to go sir");
            if (localStorage.getItem("jarvis_setup") === null) {
                readOut("Sir, kindly fill the form");
            }
        }, 1000);
    });
}

// Add event listener on window load
window.onload = () => {
    console.log("Window loaded. Adding event listener to play button."); // Debugging log
    playButton.addEventListener("click", () => {
        console.log("Play button clicked."); // Debugging log
        startJarvis();
    });

//jarvis commands adding

fridaycoms.forEach((e,index)=>{
    console.log("Populating commands section.");
    console.log(`Adding command #${index + 1}: ${e}`);
document.querySelector(".commands").innerHTML +=`<p>#${e}</p><br/>`
document.querySelector(".commands").style.display = "block";
})

commandsDiv.style.display = "block";
};




    //time-clock
    time.textContent=`${hrs}:${mins}:${secs}`
    setInterval(()=>{
        let date=new Date()
        let hrs=date.getHours()
        let mins=date.getMinutes()
        let secs=date.getSeconds()
        time.textContent=`${hrs}:${mins}:${secs}`
    },1000);


//battery setup
let batteryPromise=navigator.getBattery()
batteryPromise.then(batteryCallback)
function batteryCallback(batteryObject){
printBatteryStatus(batteryObject)
setInterval(()=>{
    printBatteryStatus(batteryObject)
    //for internet
    navigator.onLine?(internet.textContent="online"):(internet.textContent="offline")
},5000);
}
function printBatteryStatus(batteryObject)
{
    battery.textContent=`${batteryObject.level*100}%`
if(batteryObject.charging=true){
   battery.textContent=`${batteryObject.level*100}% Charging`
}
if(batteryObject.charging=false){
   battery.textContent=`${batteryObject.level*100}% Not Charging`
}

// let batteryLevel = `${batteryObject.level * 100}%`;
    
// // Charging time (in seconds), convert to minutes/hours
// let chargingTime = batteryObject.chargingTime === Infinity 
//     ? "N/A" 
//     : formatTime(batteryObject.chargingTime);

// // Discharging time (in seconds), convert to minutes/hours
// let dischargingTime = batteryObject.dischargingTime === Infinity 
//     ? "N/A" 
//     : formatTime(batteryObject.dischargingTime);

// // Display charging or discharging status with times
// if (batteryObject.charging === true) {
//     batteryElement.textContent = `${batteryLevel} Charging (Time to full charge: ${chargingTime})`;
// } else {
//     batteryElement.textContent = `${batteryLevel} Not Charging (Time left: ${dischargingTime})`;
// }
}


//jarvis setup
if(localStorage.getItem("jarvis_setup")!=null){
    weather(JSON.parse(localStorage.getItem("jarvis_setup")).location)
}



//jarvis info setup
const setup=document.querySelector(".jarvis_setup")
// setup.style.display="none";
if(localStorage.getItem("jarvis_setup")===null){
    setup.style.display="block"
    // setup.style.display="flex"
setup.querySelector("button").addEventListener("click",userInfo)
}


//userinfo func
function userInfo(){
    // console.log("submit button clicked");
    let setupInfo={
        name:setup.querySelectorAll("input")[0].value,
        bio:setup.querySelectorAll("input")[1].value,
        location:setup.querySelectorAll("input")[2].value,
        instagram:setup.querySelectorAll("input")[3].value,
        linkedin:setup.querySelectorAll("input")[4].value,
         github:setup.querySelectorAll("input")[5].value,

    }
    // console.log(setupInfo); 
    let testArr=[]
    setup.querySelectorAll("input").forEach((e)=>{
        testArr.push(e.value)
    })
    if(testArr.includes("")){
        readOut("sir enter your complete information");
    }
    else{
        localStorage.clear()
        localStorage.setItem("jarvis_setup",JSON.stringify(setupInfo))
        setup.style.display="none";
        console.log("setup saved and form also stored in localstorage");
 weather(JSON.parse(localStorage.getItem("jarvis_setup")).location)
// let storedSetup = JSON.parse(localStorage.getItem("jarvis_setup"));
// weather(storedSetup.location);  // Pass the location to the weather function

    }
}





const recognition=new SpeechRecognition();
recognition.lang = 'en-US';
//sr start
recognition.onstart=function(){
    console.log("vr active");
};
//sr result
recognition.onresult=function(event){
  let curr=event.resultIndex;
    let transcript=event.results[curr][0].transcript;
    console.log(transcript);
let userdata=localStorage.getItem("jarvis_setup");
    // readOut(transcript);

transcript=transcript.toLowerCase();
console.log(`my words:${transcript}`);
    if(transcript.includes("hello Eera")){
        readOut("Hello Mam");
        console.log("hello Mam");
    }
    if(transcript.includes("what are your commands?")){
        readOut("Mam, i follow these commands");
        document.querySelector(".commands").style.display="block"
    }
    if(transcript.includes("close this")){
        readOut("closed the application mam Anything else?" );
         document.querySelector(".commands").style.display="none"

    }
    if(transcript.toLowerCase().includes("open youtube")){
        readOut("opening youtube mam");
        window.open("https://www.youtube.com/");
    }
    if(transcript.toLowerCase().includes("open firebase")||transcript.includes("open fire base")){
        readOut("opening firebase mam");
        window.open("https://firebase.google.com/");
    }
    if(transcript.toLowerCase().includes("open google")){
        readOut("opening google mam");
        window.open("https://google.com/");
    }
    if(transcript.toLowerCase().includes("are u listening to me")){
        readOut("yes mam i am listening to you ");
    }
        //github commands
        if(transcript.includes("open github")){
            readOut("opening github mam")
            window.open("https://github.com/");
        }
    if(transcript.includes("open my github profile")){
        readOut("opening your github account mam")
        window.open(`https://github.com/${JSON.parse(userdata).github}`)
    }
    if(transcript.includes("open my instagram account")){
        readOut("opening ur instagram account mam")
        window.open(`https://instagram.com/${JSON.parse(userdata).instagram}`)
    }
    if(transcript.includes("open my linkedin account")){
        readOut("opening your linkedin account mam")
        window.open(`https://linkedin.com/${JSON.parse(userdata).linkedin}`)
    }
    if(transcript.includes("what is my name")){
        readOut("your name is riya sharma and you are great software developer.")
    }


    //google search  https://ya ww.linkedin.com/in/riya-sharma-7986b6269/

if(transcript.includes("search for")){
    readOut("here's the result");
    let input=transcript.split(" ");
    input.splice(0,2);
    input.pop();
    input=input.join("").split(" ").join("+");
    // input=input.join("+");
    console.log(input);
 window.open(`https://google.com/search?q=${input}`);
}
};




//sr stop
recognition.onend=function(){
    console.log("vr stop");
};
recognition.onerror = function (event) {
    console.error("Speech recognition error: ", event.error);
};
recognition.onerror = function (event) {
    if (event.error === 'no-speech') {
        console.log('No speech detected. Please try again.');
        recognition.start(); // Restart recognition automatically
    } else {
        console.error("Speech recognition error: ", event.error);
    }
};


//sr continuous
recognition.continuous=true;


startbtn.addEventListener("click",()=>{
    recognition.start();
});
stopbtn.addEventListener("click" ,()=>{
    recognition.stop();
});

// friday speech
function readOut(message){
//api
const speech=new SpeechSynthesisUtterance();

// diff voices
const allVoices=speechSynthesis.getVoices();
speech.voice=allVoices[1];
speech.text=message;
speech.volume=1;
window.speechSynthesis.speak(speech);
console.log("speaking out");
}
speakbtn.addEventListener("click" ,()=>{
    readOut(" Ready for your assictance ");
});

window.onload=function(){
    readOut("  ");
};


// // Declare allVoices globally
// let allVoices = [];

// // Preload voices
// window.speechSynthesis.onvoiceschanged = () => {
//     allVoices = window.speechSynthesis.getVoices();
//     console.log("Voices loaded:", allVoices); // Debugging log
// };

// Friday speech function
// function readOut(message) {
//     const speech = new SpeechSynthesisUtterance();

//     // Check if voices are loaded and select a valid one
//     if (allVoices.length > 0) {
//         speech.voice = allVoices[1] || allVoices[0]; // Use fallback voice if index 1 doesn't exist
//     } else {
//         console.warn("No voices loaded yet. Using the default voice.");
//         speech.voice = null; // Use the default voice
//     }

//     speech.text = message;
//     speech.volume = 1;
//     window.speechSynthesis.speak(speech);
//     console.log("speaking out:", message);
// }

// // Example use case: Call readOut when voices are ready
// window.onload = () => {
//     if (allVoices.length === 0) {
//         console.log("Waiting for voices to load...");
//         setTimeout(() => {
//             readOut("Testing speech synthesis after delay.");
//         }, 1000); // Delay to allow voices to load
//     } else {
//         readOut("Testing speech synthesis immediately.");
//     }
// };

// function readOut(message) {
//     const speech = new SpeechSynthesisUtterance();
//     speech.text = message;
//     speech.volume = 1;

//     // Select a valid voice
//     if (allVoices.length > 0) {
//         speech.voice = allVoices[1] || allVoices[0];
//     } else {
//         console.warn("No voices loaded yet. Using default voice.");
//     }

//     // Debugging events
//     speech.onstart = () => console.log("Speech started.");
//     speech.onend = () => console.log("Speech ended.");
//     speech.onerror = (e) => console.error("Speech error:", e);

//     // Speak
//     window.speechSynthesis.speak(speech);
//     console.log("speaking out:", message);
// }
