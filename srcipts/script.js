let isLoggedIn = localStorage.getItem("isLoggedIn") === "true"; // Kontrola v localStorage

// avatr jestli přihlaseni a klikne a nídne se možnost odhlasit
if (isLoggedIn) {
  document.querySelector(".login").classList.add("hide");
  document.querySelector(".user").classList.remove("hide");
  document.querySelector(".user").addEventListener("click", () => {
    document.querySelector(".pop-up").classList.remove("hide");
    document.querySelector(".logout").addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("isLoggedIn");
      window.location.href = "index.html";
      document.querySelector(".login").classList.remove("hide");
      document.querySelector(".user").classList.add("hide");
      document.querySelector(".pop-up").classList.add("hide");
    });
  });
}

const dny = [
  "",
  "Pondělí",
  "Úterý",
  "Středa",
  "Čtvrtek",
  "Pátek",
  "Sobota",
  "Neděle",
];

const time = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
];

// Výběr tabulky
const table = document.querySelector(".table-calendar");

// Vytvoření hlavičky tabulky
let headerRow = table.insertRow();
dny.forEach((day) => {
  let cell = document.createElement("th");
  cell.textContent = day;
  headerRow.appendChild(cell);
});

// Vytvoření řádků pro časové intervaly
time.forEach((t) => {
  let row = table.insertRow();
  let timeCell = row.insertCell();
  timeCell.textContent = t;
  for (let i = 1; i < dny.length; i++) {
    let cell = row.insertCell();
    cell.setAttribute("data-day", dny[i]);
    cell.setAttribute("data-time", t);
    cell.classList.add("table-cell");
  }
});

// Funkce pro vložení dat do buňky
function dataInsert(day, time, description) {
  const cell = document.querySelector(
    `[data-day="${day}"][data-time="${time}"]`
  );

  if (cell) {
    const cellKey = `${day}_${time}_clicked`; // klič ktery použiju pro  jednotlive bunky a ucham tak stav tlačika
    const capacityKey = `${day}_${time}_capacity`; // klič ktery použiju pro  jednotlive bunky  a ucham tak stav capacity

    let isClicked = localStorage.getItem(cellKey) === "true"; //nastevni hodnoty jesli už bylo kliknutu na dane policko
    let capacity = parseInt(localStorage.getItem(capacityKey)) || 0; //nastevni kapacity při načteni , musim převest na čislo protoře je tam string

    // Přidání HTML obsahu do buňky
    cell.innerHTML = `
    <div class="cell-wrap">
    <span class="label">Nogi</span>
    <span class="description">${description}</span>
    <button class="attend-class ${isClicked ? "cross" : "checked"}">
    <i class="fa-solid ${isClicked ? "fa-x" : "fa-check"}"></i> 
    </button> 
    <span class="capacityText">${capacity}/20</span>
  </div>
`;
    // is clickde kontorluje jestli bylo kliknuto podle toho zachova dane tlačiko a jejho barvu

    // Přidání event listeneru pro tlačítko v bunkach

    const button = cell.querySelector(".attend-class");
    const capacitySpan = cell.querySelector(".capacityText");

    // když je uzivatel prihlaseny
    if (isLoggedIn) {
      button.addEventListener("click", function (e) {
        e.preventDefault();
        isClicked = !isClicked; // změmním hodnotu cliknutí v local storage
        localStorage.setItem(cellKey, isClicked); // nastavuju local storage na unikatni klik a jesli bylo kliknuto

        if (isClicked) {
          capacity++;
          button.innerHTML = `<i class="fa-solid fa-x"></i>`;
          button.classList.remove("checked");
          button.classList.add("cross");
        } else {
          capacity--;
          button.innerHTML = `<i class="fa-solid fa-check" ></i>`;
          button.classList.add("checked");
          button.classList.remove("cross");
        }

        localStorage.setItem(capacityKey, capacity); // nastavuju local storage na unikatni klik a jesli bylo kliknuto
        capacitySpan.textContent = `${capacity}/20`;
        // kapacita v bunkach
        if (capacity === 20) {
          capacitySpan.textContent = "Full";
          button.classList.add("hide");
          capacitySpan.style.backgroundColor = "red";
        } else {
          button.classList.remove("hide");
        }
      });
    } else {
      // když nebude uživatel přihalseny nepujde mu klikat
      button.disabled = true;
      button.style.backgroundColor = "gray";
      console.log("You are not logged in.");
    }
  }
}

// Vloží testovací data
dataInsert("Pátek", "12:00", "test");
dataInsert("Sobota", "16:00", "test");
dataInsert("Pondělí", "15:00", "test");
dataInsert("Středa", "20:00", "test");


console.log('Hello ' + process.env.FIREBASE_API_KEY)