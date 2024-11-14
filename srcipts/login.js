import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import {
  getDatabase,
  ref,
  set,
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";


// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyByFpxJwdmKKv_soJHVR4QLRWs3q0ALINw",
  authDomain: "login-draculino.firebaseapp.com",
  projectId: "login-draculino",
  storageBucket: "login-draculino.firebasestorage.app",
  messagingSenderId: "252969189866",
  appId: "1:252969189866:web:331e942ab470278439b293",
  databaseURL:
    "https://login-draculino-default-rtdb.europe-west1.firebasedatabase.app/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const provider = new GoogleAuthProvider();

// Registrace uživatele
async function register() {
  const username = document.getElementById("userName").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  //kotrloa spravnych hodnot
  if (!ValidateEmail(email) || !ValidatePassword(password)) {
    alert("invalid email or password");
    return;
  }

  try {
    // Vytvoření nového uživatele
    const userCreate = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCreate.user;

    // Uložení uživatelských dat do Realtime Database
    const userRef = ref(database, "users/" + user.uid);
    await set(userRef, {
      username: username,
      email: email,
      last_login: Date.now(),
    });
    // uloženi stavu přihlaseni do localstorage abych stim mohl potom pracovat dal
    localStorage.setItem("isLoggedIn", "true");
    // presmeruje zpet na stranku
    window.location.href = "index.html";
    console.log("User registered successfully!");
  } catch (error) {
    console.error("Error:", error.message);
    alert("Error: " + error.message);
  }
}

// google registrarce

async function googleSignIn() {
  const username = document.getElementById("userName").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  try {
    // Přihlášení pomocí Google
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Uložení uživatelských dat do Realtime Database (pokud je poprvé)
    const userRef = ref(database, "users/" + user.uid);
    await set(userRef, {
      username: user.displayName || "Unknown", // Použití jména z Google, pokud je k dispozici
      email: user.email,
      last_login: Date.now(),
    });
    // uloženi stavu přihlaseni do localstorage abych stim mohl potom pracovat dal
    localStorage.setItem("isLoggedIn", "true");
    // presmeruje zpet na stranku
    window.location.href = "index.html";
    console.log("User registered successfully!");

    window.location.href = "index.html";
    console.log("Google login successful!");
  } catch (error) {
    console.error("Error:", error.message);
    alert("Error: " + error.message);
  }
}
//login funcke

async function login() {
  const username = document.getElementById("userName").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!ValidateEmail(username) || !ValidatePassword(password)) {
    alert("Invalid userName or password!");
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, username, password);

    // uloženi stavu přihlaseni do localstorage abych stim mohl potom pracovat dal
    localStorage.setItem("isLoggedIn", "true");
    // presmeruje zpet na stranku
    window.location.href = "index.html";
    console.log("User loggedin successfully!");

    window.location.href = "index.html";
    console.log("User logged in successfully!");
  } catch (error) {
    console.error("Error:", error.message);
    alert("Error: " + error.message);
  }
}

// Validace emailu
function ValidateEmail(email) {
  const validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return validRegex.test(email);
}

// Validace hesla
function ValidatePassword(password) {
  return password.length >= 6;
}
auth.onAuthStateChanged((user) => {
  if (user) {
    console.log("User logged in:", user);
    // Optionally redirect user or update UI
  } else {
    console.log("No user logged in");
  }
});
// Event listener pro tlačítko registrace

document.getElementById("registerBtn").addEventListener("click", register);
document
  .querySelector(".register-Btn-Google")
  .addEventListener("click", googleSignIn);
document.getElementById("loginBtn").addEventListener("click", login);
document.querySelector(".loginBtn-Google")
  .addEventListener("click", googleSignIn);

document.querySelector(".registerHere").addEventListener("click", function (e) {
  e.preventDefault();
  document.querySelector(".login-form-card").classList.add("hide");
  document.querySelector(".form-card").classList.remove("hide");
});

document
  .querySelector(".registe-login-form")
  .addEventListener("click", function () {
    document.querySelector(".form-card").classList.add("hide");
    document.querySelector(".login-form-card").classList.remove("hide");
  });

  document.querySelectorAll(".close-form").forEach(button=>{

    button.addEventListener("click", (e)=>{
  
       const funcValue = e.target.getAttribute("data-func");
  
      if(funcValue === "krizek-login")
     
      window.location.href = "index.html"; 
      else 
      window.location.href = "index.html"; 
  })
  })