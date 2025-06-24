
function fetchResults(){
    let chat = document.getElementById("text-input").value;
    AppendMessage("user", chat);
     
    document.getElementById("text-input").value = "";
    document.getElementsByClassName("header")[0].style.display = "none";
    fetchApiResponse(chat);
}

async function fetchApiResponse(chat){
    const resp = await fetch(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyDPgaqL8CA8Wzyh5-lBfM4K9DrQ7zkUQeI', 
        {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
        },
         // body: '{\n    "contents": [\n      {\n        "parts": [\n          {\n            "text": "Explain how AI works in a few words"\n          }\n        ]\n      }\n    ]\n  }',
            body: JSON.stringify({
             'contents': [
             {
              'parts': [
                 {
                  'text': chat,
               }
          ]
       }
     ]
   })
 });
  const response = await resp.json();

  AppendMessage(
    "Gemini", 
    response.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1")
);

  document.getElementById("loading").remove();
}

function AppendMessage(sender, chat) {
    let chatArea = document.getElementById("chatArea");

    const msgElement = document.createElement("div");
    msgElement.className = `message ${sender}`;
    msgElement.innerHTML = `<p>${chat}</p>`;

    chatArea.appendChild(msgElement);

    if (sender === "user") {
        const loadingElement = document.createElement("div");
        loadingElement.className = "loading Gemini";
        loadingElement.id = "loading";
        loadingElement.innerText = "Loading...";
        chatArea.appendChild(loadingElement);
    }
}

function AppendMessage(sender, chat) {
    const MAX_LENGTH = 500;

    let chatArea = document.getElementById("chatArea");
    const msgElement = document.createElement("div");
    msgElement.className = `message ${sender}`;

    if (chat.length > MAX_LENGTH) {
        let shortText = chat.slice(0, MAX_LENGTH);
        msgElement.innerHTML = `<p>${shortText}... <span class="read-more">Read more</span></p>`;

        msgElement.querySelector(".read-more").onclick = () => {
            msgElement.innerHTML = `<p>${chat}</p>`;
        };
    } else {
        msgElement.innerHTML = `<p>${chat}</p>`;
    }

    chatArea.appendChild(msgElement);

    if (sender === "user") {
        const loadingElement = document.createElement("div");
        loadingElement.className = "loading Gemini";
        loadingElement.id = "loading";
        loadingElement.innerText = "Loading...";
        chatArea.appendChild(loadingElement);
    }
}
