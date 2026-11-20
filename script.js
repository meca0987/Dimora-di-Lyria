
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
  title: "La donna nello specchio",
  text: "Non so più da quanto tempo evito gli specchi. È curioso. Un tempo mi fermavo davanti a loro per ore, cercando qualcosa che potesse piacermi. Adesso li copro. Non sopporto quella donna che mi restituiscono. Ha il mio volto, i miei capelli, i miei occhi... eppure non riesco a riconoscerla. La casa è diventata silenziosa. Le persone parlano, entrano, escono, mi rivolgono domande. Io rispondo quando è necessario. Sorrido quando è opportuno. Ho imparato a imitare una donna serena con una precisione quasi ammirevole. Ci sono giorni in cui non apro le tende. Altri in cui lavo le mani fino a farle arrossare. Le lettere restano sul tavolo, le medicine accanto al letto, i fiori appassiscono nei vasi. Mi dicono che dovrei reagire. Che dovrei uscire, distrarmi, vivere. Ma ditemi... come si fa a vivere quando perfino la propria immagine sembra appartenere a un'estranea?"
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

  if (
    martyrdomRead &&
    document.getElementById("martyrdom").classList.contains("active")
  ) {
    epilogueDoor.style.display = "block";
  }
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
/* EPILOGO: accesso dopo aver letto il martirio */

let martyrdomRead = false;

const epilogueDoor = document.createElement("button");
epilogueDoor.className = "ornate-button";
epilogueDoor.id = "epilogue-door";
epilogueDoor.textContent = "Oltre l'ultima pagina";

epilogueDoor.style.cssText = `
  position: absolute;
  z-index: 6;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: none;
`;

document.getElementById("martyrdom").appendChild(epilogueDoor);

epilogueDoor.addEventListener("click", () => {
  showScene("epilogue");
});

document.querySelector('[data-diary="martyrdom"]')
  .addEventListener("click", () => {
    martyrdomRead = true;
  });

document.getElementById("intro").classList.add("active");
document.querySelector(".bottom-nav").style.display = "none";

/* AUDIO DELLA DIMORA DI LYRIA */

const audioTracks = {
  intro: "citta.mp3",
  hall: "salone.mp3",
  childhood: "infanzia.mp3",
  adolescence: "adolescenza.mp3",
  adulthood: "eta-adulta.mp3",
  marriage: "matrimonio.mp3",
  martyrdom: "martirio.mp3",
  epilogue: "epilogo.mp3"
};

const narrationAudio = new Audio();
narrationAudio.preload = "none";

const backgroundMusic = new Audio("audio/musica.mp3");
backgroundMusic.loop = true;
backgroundMusic.volume = 0.28;

function createAudioButton(label) {
  const button = document.createElement("button");
  button.textContent = label;
  button.type = "button";
  button.style.cssText = `
    position: fixed;
    z-index: 30;
    right: 22px;
    bottom: 82px;
    padding: 12px 18px;
    background: rgba(16, 8, 12, 0.92);
    color: #ead8c4;
    border: 1px solid #be9169;
    cursor: pointer;
    font: inherit;
  `;
  return button;
}

/* MUSICA DI SOTTOFONDO */

const musicButton = createAudioButton("♫ Avvia la musica");
musicButton.style.top = "18px";
musicButton.style.bottom = "auto";
document.body.appendChild(musicButton);

musicButton.addEventListener("click", async () => {
  if (backgroundMusic.paused) {
    try {
      await backgroundMusic.play();
      musicButton.textContent = "♫ Metti in pausa la musica";
    } catch (error) {
      musicButton.textContent = "♫ Avvia la musica";
    }
  } else {
    backgroundMusic.pause();
    musicButton.textContent = "♫ Riprendi la musica";
  }
});

/* NARRAZIONI */

const voiceButtons = [];

Object.entries(audioTracks).forEach(([sceneId, filename]) => {
  const scene = document.getElementById(sceneId);
  if (!scene) return;

  const button = createAudioButton("♪ Ascolta la voce");

  button.addEventListener("click", async () => {
    if (
      narrationAudio.dataset.currentScene === sceneId &&
      !narrationAudio.paused
    ) {
      narrationAudio.pause();
      narrationAudio.currentTime = 0;
      button.textContent = "♪ Ascolta la voce";
      return;
    }

    narrationAudio.pause();
    narrationAudio.currentTime = 0;

    voiceButtons.forEach(item => {
      item.textContent = "♪ Ascolta la voce";
    });

    narrationAudio.src = `audio/${filename}`;
    narrationAudio.dataset.currentScene = sceneId;

    try {
      await narrationAudio.play();
      button.textContent = "♪ Interrompi la voce";
    } catch (error) {
      button.textContent = "♪ Riprova ad ascoltare";
    }
  });

  scene.appendChild(button);
  voiceButtons.push(button);
});

/* FINE NARRAZIONE */

narrationAudio.addEventListener("ended", () => {
  voiceButtons.forEach(button => {
    button.textContent = "♪ Ascolta la voce";
  });
});

/* CAMBIO STANZA */

const previousShowScene = showScene;

showScene = function(sceneId) {
  narrationAudio.pause();
  narrationAudio.currentTime = 0;

  voiceButtons.forEach(button => {
    button.textContent = "♪ Ascolta la voce";
  });

  previousShowScene(sceneId);
};

/* AVVIO MUSICA ALL'INGRESSO */

document.getElementById("enter-house").addEventListener("click", () => {
  if (backgroundMusic.paused) {
    backgroundMusic.play().then(() => {
      musicButton.textContent = "♫ Metti in pausa la musica";
    }).catch(() => {});
  }
});

