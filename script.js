
const scenes = document.querySelectorAll(".scene");
const diaryModal = document.getElementById("diary-modal");
const diaryTitle = document.getElementById("diary-title");
const diaryContent = document.getElementById("diary-content");

let previousScene = "hall";

const diaryPages = {
  childhood: {
    title: "La stanza dei giochi",
    text: "Ci sono cose che una bambina dovrebbe poter dimenticare. Questa casa, invece, le conserva tutte. Le voci, gli sguardi, le risate dietro le porte. Non ricordo quando ho cominciato ad avere paura. Ricordo soltanto che, a un certo punto, mi sembrava normale."
  },

  adolescence: {
    title: "Rose appassite",
    text: "Credevo che crescere significasse diventare libera. Avevo imparato a nascondere certe cose, a sorridere quando era necessario, a non fare domande. E poi arrivò qualcuno che mi fece credere, per un breve momento, che forse il mondo potesse essere gentile."
  },

  adulthood: {
    title: "La camera silenziosa",
    text: "Le pareti sembrano avvicinarsi. Le notti si confondono, i pensieri si ripetono, le cose perdono il loro posto. Ho provato a mettere ordine. Ho provato a essere ragionevole. Ma la mia mente non sembra più una stanza nella quale io possa abitare da sola."
  },

  marriage: {
    title: "Il matrimonio",
    text: "Una volta credevo che una promessa potesse essere una casa. Che bastasse pronunciare certe parole per essere al sicuro. Ho conservato questa pagina perché non riesco ancora a decidere se quel giorno sia stato l'inizio della mia vita o l'inizio della sua fine."
  },

  martyrdom: {
    title: "L'ultima pagina",
    text: "Non so più distinguere il dolore dalla paura. La stanza è diventata immensa, oppure sono io a essere diventata piccola. C'è sangue ovunque. C'è silenzio. E qualcuno che avrebbe dovuto amarmi ha quasi terminato ciò che il mondo aveva cominciato."
  },

  epilogue: {
    title: "Una nota senza firma",
    text: "Non ricordo il momento in cui smisi di morire. Ricordo soltanto che qualcuno, quella notte, decise che non avrei dovuto farlo. Non so perché mi abbia raccolta. Non so cosa abbia visto in me. So soltanto che, quando riaprii gli occhi, il mondo non era più lo stesso."
  }
};

function showScene(sceneId) {
  const target = document.getElementById(sceneId);
  if (!target) return;

  scenes.forEach(scene => scene.classList.remove("active"));
  target.classList.add("active");

  window.scrollTo(0, 0);

  const nav = document.querySelector(".bottom-nav");
  nav.style.display = sceneId === "intro" ? "none" : "flex";

  if (sceneId === "epilogue") {
    document.getElementById("back-hall").textContent = "← Torna al martirio";
  } else {
    document.getElementById("back-hall").textContent = "← Torna al salone";
  }
}

function openDiary(pageId) {
  const page = diaryPages[pageId];
  if (!page) return;

  diaryTitle.textContent = page.title;
  diaryContent.textContent = page.text;

  diaryModal.classList.add("open");
  diaryModal.setAttribute("aria-hidden", "false");
}

function closeDiary() {
  diaryModal.classList.remove("open");
  diaryModal.setAttribute("aria-hidden", "true");
}

document.getElementById("enter-house").addEventListener("click", () => {
  showScene("hall");
});

document.querySelectorAll(".hotspot").forEach(button => {
  button.addEventListener("click", () => {
    const destination = button.dataset.room;
    if (destination === "epilogue") return;
    showScene(destination);
  });
});

document.querySelectorAll(".diary-paper").forEach(button => {
  button.addEventListener("click", () => {
    openDiary(button.dataset.diary);
  });
});

document.getElementById("close-diary").addEventListener("click", closeDiary);

document.querySelector(".modal-backdrop").addEventListener("click", closeDiary);

document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeDiary();
});

document.getElementById("back-hall").addEventListener("click", () => {
  const active = document.querySelector(".scene.active");
  if (!active) return;

  if (active.id === "epilogue") {
    showScene("martyrdom");
  } else {
    showScene("hall");
  }
});

document.getElementById("restart").addEventListener("click", () => {
  closeDiary();
  showScene("intro");
});

/* L'epilogo si raggiunge solo dalla sala del martirio. */
const epilogueDoor = document.createElement("button");
epilogueDoor.className = "ornate-button";
epilogueDoor.id = "epilogue-door";
epilogueDoor.textContent = "Oltre l'ultima pagina";
epilogueDoor.style.cssText =
  "position:absolute;z-index:5;bottom:15%;left:50%;transform:translateX(-50%);display:none";

document.getElementById("martyrdom").appendChild(epilogueDoor);

epilogueDoor.addEventListener("click", () => {
  showScene("epilogue");
});

/* Mostra la porta dell'epilogo solo dopo aver aperto il diario del martirio. */
document.querySelector('[data-diary="martyrdom"]').addEventListener("click", () => {
  epilogueDoor.style.display = "block";
});

document.getElementById("intro").classList.add("active");
document.querySelector(".bottom-nav").style.display = "none";
