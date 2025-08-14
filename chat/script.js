// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBFYkzc7A4RQEHVOGYf70-vX-gz36-_Bhs",
  authDomain: "chatbox-432ac.firebaseapp.com",
  databaseURL: "https://chatbox-432ac-default-rtdb.firebaseio.com",
  projectId: "chatbox-432ac",
  storageBucket: "chatbox-432ac.firebasestorage.app",
  messagingSenderId: "963610029526",
  appId: "1:963610029526:web:518ac83ba6ef49fe0cc877",
  measurementId: "G-SCVLX9SQPF"
};

// Init Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const chatBox = document.getElementById("chat-box");
const chatForm = document.getElementById("chat-form");
const messageInput = document.getElementById("message-input");
const guestNameEl = document.getElementById("guest-name");
const setNameBtn = document.getElementById("set-name-btn");

// Initial guest name
let guestName = "Guest" + Math.floor(Math.random() * 1000);
guestNameEl.innerText = guestName;

// Allow user to set name
setNameBtn.addEventListener("click", () => {
  const newName = prompt("Enter your name:", guestName);
  if (newName && newName.trim().length > 0) {
    guestName = newName.trim();
    guestNameEl.innerText = guestName;
  }
});

// Send message
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = messageInput.value.trim();
  if (text !== "") {
    db.ref("messages").push({
      name: guestName,
      text: text,
      timestamp: Date.now()
    });
    messageInput.value = "";
  }
});

// Listen for new messages
db.ref("messages").on("child_added", (snapshot) => {
  const msg = snapshot.val();
  const div = document.createElement("div");
  div.classList.add("message");
  div.innerHTML = `<strong>${msg.name}:</strong> ${msg.text}`;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
});

// Initial guest name
let guestName = "Guest" + Math.floor(Math.random() * 1000);
const guestNameEl = document.getElementById("guest-name");
const setNameBtn = document.getElementById("set-name-btn");

guestNameEl.innerText = guestName;

// Handle "Set Name" click
setNameBtn.addEventListener("click", () => {
  const newName = prompt(`Set your name (currently: ${guestName})`);
  if (newName && newName.trim().length > 0) {
    guestName = newName.trim();
    guestNameEl.innerText = guestName;
  }
});
