
const button = document.getElementById('send');
const textArea = document.querySelector('textarea');


button.addEventListener('click', addMessageToChat)

textArea.addEventListener('keydown', (e) => {
    if (e.key == "Enter")
        button.click();
    }
)

function typing(){
    const chatBox = document.querySelector(".chatbox");
    const div = document.createElement('div');
    const p = document.createElement('p');
    div.className = "waitingMessage";
    p.textContent = "bot pisze...";
    div.appendChild(p);
    chatBox.appendChild(div);
    return div;
}

function alert(){
    const chatBox = document.querySelector(".chatbox");
    const div = document.createElement('div');
    const p = document.createElement('p');
    div.className = "alertMessage";
    p.textContent = "brzydkie słowo";
    div.appendChild(p);
    chatBox.appendChild(div);
    return div;
}

function readHumanMessage(){
    const humanMessage = textArea.value;
    textArea.value = '';
    return humanMessage;
}

function createMessage(message, className) {
    const chatBox = document.querySelector(".chatbox");
    const div = document.createElement('div');
    const p = document.createElement('p');
    div.className = className;
    p.textContent = message;
    div.appendChild(p);
    chatBox.appendChild(div);
}

function addMessageToChat(){
    const humanMessage = readHumanMessage();
    const trimHumanMessage = humanMessage.trim();

    if (trimHumanMessage.length === 0 ){
        return;
    }

    const message = humanMessage.toLowerCase();
    const messageNoAccent = removePolishChars(message);

    for (let i = 0; i < badWords.length; i++){
            if(messageNoAccent.includes(badWords[i])){
                alert();
                return;
        }
    }

        createMessage(humanMessage,"human_message");
        const typingMessage = typing();
        setTimeout(() => {typingMessage.remove()}, 2000) 
        setTimeout(() => {createMessage(botMessage(humanMessage), "bot_message"); } , 2000);
    }

function commendMessage(humanMessage){
    for (let i = 0; i < commends.length; i++){
        if (humanMessage === commends[i]){
            switch (commends[i]) {
                case '/version':
                return "Wersja oprogramowania: v1.2.3";

                case '/pogoda kraków':
                return "W kraków jest 22 stopnie";
            }
        }
    }
}

function botMessage(humanMessage){
    const commandResponse = commendMessage(humanMessage);
    if (commandResponse) {
        return commandResponse;
    }

    const message = humanMessage.toLowerCase();
    const messageNoAccent = removePolishChars(message);
    
    const greetingResult = greetingFuse.search(messageNoAccent);
    for (let i = 0; i < greetings.length; i++){
        if(greetingResult.length > 0) {
            return "Miło mi, jaki jest dzisiaj dzień tygodnia?";
        }
    }

    for (let i = 0; i < day.length; i++){
        if (messageNoAccent.includes(day[i])){
            switch (day[i]) {
                case 'poniedzialek':
                return "Poniedziałek — kod się sypie, bug pod biurkiem cicho chlipie.";

                case 'wtorek':
                return "Wtorek — debug trwa od rana, jedna kropka źle dodana.";

                case 'sroda':
                return "Środa — fix już prawie działa, ale apka znów zwariowała.";

                case 'czwartek':
                return "Czwartek — stack overflow w głowie, kto to pisał? Nikt nie powie.";

                case 'piatek':
                return "w Piątek - kodzi nawet noga.";

                case 'sobota':
                return "Sobota — miał być odpoczynek, a tu projekt i przecinek.";

                case 'niedziela':
                return "jutro poniedziałek";
            }
        }
    }   
    return "Nie rozumiem, chyba nie mówisz po polsku"
}

function removePolishChars(text) {
  return text
    .replaceAll('ą', 'a')
    .replaceAll('ć', 'c')
    .replaceAll('ę', 'e')
    .replaceAll('ł', 'l')
    .replaceAll('ń', 'n')
    .replaceAll('ó', 'o')
    .replaceAll('ś', 's')
    .replaceAll('ż', 'z')
    .replaceAll('ź', 'z')
    .replaceAll(',', '')
    .replaceAll('?', '')
    .replaceAll('!', '')
    .replaceAll('.', '');
}

const greetings = ['czesc', 'dzien dobry', 'hej', 'dobry wieczor', 'siema', 'witaj', 'witam', 'witaj', 'przywitam'];
const day = ['poniedzialek', 'wtorek', 'sroda', 'czwartek', 'piatek', 'sobota', 'niedziela'];
const badWords = ['kurla', 'kura', 'dupa']
const commends = ['/version', '/pogoda kraków']
