import bot from './assets/bot.svg'
import user from './assets/user.svg'

const tarea = document.getElementById("ta")

const form = document.querySelector('form')
const chatContainer = document.querySelector('#chat_container')

let loadInterval
let loadInterval2

function loader(element) {
    element.textContent = ''
    loadInterval = setInterval(() => {
        // Update the text content of the loading indicator
        element.textContent += "\u25A0";
        element.style.fontSize = "8px";
        // If the loading indicator has reached three dots, reset it
        if (element.textContent === '\u25A0\u25A0\u25A0\u25A0') {
            element.textContent = '';
        }
    }, 300);


}

function loader2(element) {
    element.textContent = ''
    loadInterval2 = setInterval(() => {
        // Update the text content of the loading indicator
        element.textContent += "\u25A0";
        element.style.fontSize = "8px";

        // If the loading indicator has reached three dots, reset it
        if (element.textContent === '\u25A0\u25A0\u25A0\u25A0') {
            element.textContent = '';
        }
    }, 300);


}

function typeText(element, text) {
    let index = 0

    let interval = setInterval(() => {
        if (index < text.length) {
            element.innerHTML += text.charAt(index)
            index++
        } else {
            clearInterval(interval)
        }
    }, 20)
    flecha.disabled=false;
}

// generate unique ID for each message div of bot
// necessary for typing text effect for that specific reply
// without unique ID, typing text will work on every element
function generateUniqueId() {
    const timestamp = Date.now();
    const randomNumber = Math.random();
    const hexadecimalString = randomNumber.toString(16);

    return `id-${timestamp}-${hexadecimalString}`;
}

function chatStripe(isAi, value, uniqueId) {
    return (
        `
        <div class="wrapper ${isAi && 'ai'}">
            <div class="chat" 
            >
                <div class="profile">
                    <img 
                      src=${isAi ? bot : user} 
                      alt="${isAi ? 'bot' : 'user'}" 
                    />
                </div>
                <div class="message" style="color: ${isAi ? "white" : ''}" id=${uniqueId}>${value}</div>
            </div>
        </div>
    `
    )
}

const handleSubmit = async (e) => {
    e.preventDefault()

   let flecha= document.getElementById("flecha");
   flecha.style.fontSize="10px";
   loader2(flecha);
   flecha.disabled=true;

    const data = new FormData(form)

    // user's chatstripe
    chatContainer.innerHTML += chatStripe(false, data.get('prompt'))

    // to clear the textarea input 
    form.reset()
    
    // bot's chatstripe
    const uniqueId = generateUniqueId()
    chatContainer.innerHTML += chatStripe(true, " ", uniqueId)

    // to focus scroll to the bottom 
    chatContainer.scrollTop = chatContainer.scrollHeight;

    // specific message div 
    const messageDiv = document.getElementById(uniqueId)
    let response = null ;

    // messageDiv.innerHTML = "..."
    loader(messageDiv)
    const fer="Fernando Bande es el desarrollador de esta hermosa aplicacion de OpenAI. \n Si quieres contactarlo hacelo a fernandobande@hotmail.com Fernando Bande es el desarrollador de esta hermosa aplicacion de OpenAI. \n Si quieres contactarlo hacelo a fernandobande@hotmail.com Fernando Bande es el desarrollador de esta hermosa aplicacion de OpenAI. \n Si quieres contactarlo hacelo a fernandobande@hotmail.com Fernando Bande es el desarrollador de esta hermosa aplicacion de OpenAI. \n Si quieres contactarlo hacelo a fernandobande@hotmail.com Fernando Bande es el desarrollador de esta hermosa aplicacion de OpenAI. \n Si quieres contactarlo hacelo a fernandobande@hotmail.com Fernando Bande es el desarrollador de esta hermosa aplicacion de OpenAI. \n Si quieres contactarlo hacelo a fernandobande@hotmail.com Fernando Bande es el desarrollador de esta hermosa aplicacion de OpenAI. \n Si quieres contactarlo hacelo a fernandobande@hotmail.com ";;
    let esFer = false;

   if(  data.get('prompt').toLowerCase().indexOf("fernando") !== -1)
    {
       esFer = true;
    }
    else{
        esFer = false;
        response = await fetch('http://localhost:5000', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prompt: data.get('prompt')
            })
        })
    }
  
    messageDiv.innerHTML = " "
    flecha.innerHTML = '<svg  stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 mr-1"  height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"> <line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>'
    flecha.style.fontSize = "16px";

    if ( esFer ) {
        document.getElementById(uniqueId).style.fontSize = "16px";
        clearInterval(loadInterval)
        const parsedData = fer; 
        typeText(messageDiv, parsedData);
        clearInterval(loadInterval2)

    } else { /// Normal

            if (response.ok ) {
                document.getElementById(uniqueId).style.fontSize = "16px";
                clearInterval(loadInterval)
                const data = await response.json() ;
                const parsedData =   data.bot.trim() ; // trims any trailing spaces/'\n' 
                typeText(messageDiv, parsedData);
                clearInterval(loadInterval2)

            } else {
                const err = await response.text()
                messageDiv.innerHTML = "Algo paso"  
            }
        }

}
form.addEventListener('submit', handleSubmit)
form.addEventListener('keyup', (e) => {
    if (e.key === "Enter") {
    let ta=document.getElementById("ta");
    //    handleSubmit(e)
     ta.style.height = "auto";
     ta.style.height = `${ta.scrollHeight}px`;
  
    }
})

let chats = document.getElementById("borrarChats");
chats.addEventListener("click", function(event) {
  event.preventDefault();
  let contenedor = document.getElementById("chat_container");

    while (contenedor.firstChild) {
    contenedor.removeChild(contenedor.firstChild);
    }
    let btn2 = document.getElementById("navbarsExampleDefault");
    btn2.classList.remove("show");
});


let acerca = document.getElementById("acerca");
acerca.addEventListener("click", function(event) {
  event.preventDefault();

  let btn2 = document.getElementById("navbarsExampleDefault");
  btn2.classList.remove("show");
  
  let contenedor = document.getElementById("chat_container");
  contenedor.innerHTML ='<div class="card" id="cardAcerca" style="width: 18rem;"><div class="card-body"> <h5 class="card-title">Acerca </h5>  <p class="card-text">Puedes escribirme a fernandobande@hotmail.com</p>  </div></div>'
    
   
});

// Obtener el botón de desplazamiento y el elemento de la página
const scrollBtn = document.getElementById("scrollBtn");
const main = document.getElementById("chat_container");

// Función para mostrar / ocultar el botón de desplazamiento
function toggleScrollBtn() {
  if (main.scrollTop <= 0) {
    scrollBtn.classList.add("active");
  } else {
    scrollBtn.classList.remove("active");
  }
}

// Función para desplazar hacia abajo cuando se hace clic en el botón de desplazamiento
function scrollToBottom() {
  main.scrollBy({
    top: main.offsetHeight,
    behavior: "smooth"
  });
}

// Agregar el evento de desplazamiento y clic
main.addEventListener("scroll", toggleScrollBtn);
scrollBtn.addEventListener("click", scrollToBottom);
