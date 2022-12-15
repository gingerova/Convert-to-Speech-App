const textArea= document.querySelector("textarea"),
voiceList = document.querySelector("select")
speeachBtn=document.querySelector("button");

let synth = speechSynthesis,
isSpeaking=true;

function voices(){
for(let voice of synth.getVoices()){
let option = `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`;
voiceList.insertAdjacentHTML("beforeend", option);
}
}

synth.addEventListener("voiceschanged",voices);

function textToSpeech(text){
    let utternance = new SpeechSynthesisUtterance(text);
    for(let voice of synth.getVoices()){
        if(voice.name===voiceList.value){
            utternance.voice=voice;
        }
    }
    speechSynthesis.speak(utternance);
    
}

speeachBtn.addEventListener("click",e => {
    e.preventDefault();
    if(textArea.value !== ""){
        if(!synth.speaking){
            textToSpeech(textArea.value);
        }
        if(textArea.value.length>80){
            if(isSpeaking){
                synth.resume();
                isSpeaking=false;
                speeachBtn.innerText="Pause Speech";
            }else{
                synth.pause();
                isSpeaking=true;
                speeachBtn.innerText="Resume Speech";
            }
            setInterval(() => {
                if(!synth.speaking && !isSpeaking){
                    isSpeaking = true;
                    speeachBtn.innerText="Convert to Speech"
                }
            });
        }else{
            speeachBtn.innerText="Convert to Speech";
        }
    }
});

