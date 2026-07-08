/* ===========================================
   FRAGMENTOS DO LAR
   SCRIPT.JS
   PARTE 1
=========================================== */

/* ===========================
   CANVAS - PARTÍCULAS
=========================== */

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let particles = [];

function resizeCanvas() {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

class Particle{

    constructor(){

        this.reset();

    }

    reset(){

        this.x=Math.random()*canvas.width;
        this.y=Math.random()*canvas.height;

        this.size=Math.random()*2+0.5;

        this.speedX=(Math.random()-0.5)*0.3;
        this.speedY=(Math.random()-0.5)*0.3;

        this.alpha=Math.random();

        this.alphaSpeed=Math.random()*0.02;

    }

    update(){

        this.x+=this.speedX;
        this.y+=this.speedY;

        this.alpha+=this.alphaSpeed;

        if(this.alpha>1 || this.alpha<0){

            this.alphaSpeed*=-1;

        }

        if(this.x<0) this.x=canvas.width;
        if(this.x>canvas.width) this.x=0;

        if(this.y<0) this.y=canvas.height;
        if(this.y>canvas.height) this.y=0;

    }

    draw(){

        ctx.beginPath();

        ctx.fillStyle=`rgba(255,255,255,${this.alpha})`;

        ctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI*2
        );

        ctx.fill();

    }

}

function createParticles(){

    particles=[];

    let total;

    if(window.innerWidth<768){

        total=120;

    }else{

        total=250;

    }

    for(let i=0;i<total;i++){

        particles.push(new Particle());

    }

}

createParticles();

window.addEventListener("resize",createParticles);

function animateParticles(){

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    particles.forEach(p=>{

        p.update();

        p.draw();

    });

    requestAnimationFrame(
        animateParticles
    );

}

animateParticles();

/* ===========================
   CURSOR LIGHT
=========================== */

const glow=document.createElement("div");

glow.id="cursorGlow";

document.body.appendChild(glow);

document.addEventListener("mousemove",e=>{

    glow.style.left=e.clientX+"px";

    glow.style.top=e.clientY+"px";

});

const style=document.createElement("style");

style.innerHTML=`

#cursorGlow{

position:fixed;

width:350px;

height:350px;

pointer-events:none;

background:radial-gradient(circle,
rgba(255,255,255,.08),
transparent 70%);

transform:translate(-50%,-50%);

z-index:1;

transition:.08s;

mix-blend-mode:screen;

}

`;

document.head.appendChild(style);
/* ===========================================
   FRAGMENTOS DO LAR
   SCRIPT.JS
   PARTE 2
=========================================== */

/* ===========================
   PLAYER DE MÚSICA
=========================== */

const music = document.getElementById("bgMusic");
const musicButton = document.getElementById("music-toggle");

let playing = false;

if (music && musicButton) {

    music.volume = 0.35;

    musicButton.addEventListener("click", () => {

        if (!playing) {

            music.play();
            musicButton.innerHTML = "❚❚";
            playing = true;

        } else {

            music.pause();
            musicButton.innerHTML = "♪";
            playing = false;

        }

    });

}

/* ===========================
   NAVBAR
=========================== */

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 60) {

        header.style.background = "rgba(0,0,0,.82)";
        header.style.backdropFilter = "blur(14px)";
        header.style.boxShadow = "0 15px 35px rgba(0,0,0,.35)";

    } else {

        header.style.background = "rgba(5,5,5,.35)";
        header.style.boxShadow = "none";

    }

});

/* ===========================
   SCROLL REVEAL
=========================== */

const reveals = document.querySelectorAll("section");

const reveal = () => {

    const trigger = window.innerHeight * 0.85;

    reveals.forEach(section => {

        const top = section.getBoundingClientRect().top;

        if (top < trigger) {

            section.style.opacity = "1";
            section.style.transform = "translateY(0px)";

        }

    });

};

reveals.forEach(section => {

    section.style.opacity = "0";
    section.style.transform = "translateY(60px)";
    section.style.transition = ".8s ease";

});

window.addEventListener("scroll", reveal);

reveal();

/* ===========================
   PARALLAX HERO
=========================== */

const hero = document.querySelector(".hero-image");

window.addEventListener("mousemove", e => {

    if (!hero) return;

    const x = (e.clientX / window.innerWidth - 0.5) * 12;
    const y = (e.clientY / window.innerHeight - 0.5) * 12;

    hero.style.transform =
        `translate(${x}px,${y}px) scale(1.02)`;

});

/* ===========================
   HOVER NOS CARDS
=========================== */

const cards = document.querySelectorAll(
    ".card,.area-card,.skill,.boss,.ending"
);

cards.forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transition = ".35s";
        card.style.transform += " scale(1.02)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "";

    });

});

/* ===========================
   BOTÃO VOLTAR AO TOPO
=========================== */

const topButton = document.createElement("button");

topButton.innerHTML = "↑";

topButton.id = "topButton";

document.body.appendChild(topButton);

Object.assign(topButton.style, {

    position: "fixed",
    right: "25px",
    bottom: "100px",
    width: "50px",
    height: "50px",
    border: "none",
    borderRadius: "50%",
    cursor: "pointer",
    fontSize: "20px",
    background: "#731515",
    color: "#fff",
    opacity: "0",
    transition: ".3s",
    zIndex: "9999",
    boxShadow: "0 0 20px rgba(115,21,21,.45)"

});

window.addEventListener("scroll", () => {

    if (window.scrollY > 600) {

        topButton.style.opacity = "1";

    } else {

        topButton.style.opacity = "0";

    }

});

topButton.addEventListener("click", () => {

    window.scrollTo({

        top: 0,
        behavior: "smooth"

    });

});

/* ===========================
   EFEITO DE RESPIRAÇÃO
=========================== */

let glow = 0;

setInterval(() => {

    glow += 0.02;

    document.documentElement.style.setProperty(
        "--glow",
        `${8 + Math.sin(glow) * 4}px`
    );

}, 30);

console.log(
"%cFragmentos do Lar",
"color:#fff;background:#731515;padding:10px;font-size:20px;border-radius:8px;"
);

console.log("Projeto carregado com sucesso.");
/* ===========================================
   SCRIPT.JS
   PARTE 3
   EFEITOS CINEMATOGRÁFICOS
=========================================== */

/* ===========================
   ESTRELAS COM CONEXÕES
=========================== */

function connectParticles() {

    for (let a = 0; a < particles.length; a++) {

        for (let b = a; b < particles.length; b++) {

            let dx = particles[a].x - particles[b].x;
            let dy = particles[a].y - particles[b].y;

            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 90) {

                ctx.beginPath();

                ctx.strokeStyle =
                    "rgba(255,255,255," +
                    (0.08 - distance / 1200) +
                    ")";

                ctx.lineWidth = 0.4;

                ctx.moveTo(
                    particles[a].x,
                    particles[a].y
                );

                ctx.lineTo(
                    particles[b].x,
                    particles[b].y
                );

                ctx.stroke();

            }

        }

    }

}


/* ===========================
   FLASHES ALEATÓRIOS
=========================== */

setInterval(() => {

    const p =
        particles[
            Math.floor(
                Math.random() * particles.length
            )
        ];

    p.alpha = 1;

}, 600);

/* ===========================
   PARALLAX DAS SEÇÕES
=========================== */

window.addEventListener("scroll", () => {

    document.querySelectorAll("section")
        .forEach(sec => {

            let speed =
                sec.dataset.speed || 0.05;

            sec.style.transform =
                `translateY(${window.scrollY * speed}px)`;

        });

});

/* ===========================
   BRILHO ALEATÓRIO
=========================== */

setInterval(() => {

    document.body.style.filter =
        "brightness(" +
        (1 + Math.random() * 0.02) +
        ")";

}, 350);

/* ===========================
   EFEITO CRT
=========================== */

const crt = document.createElement("div");

crt.id = "crt";

document.body.appendChild(crt);

const crtStyle = document.createElement("style");

crtStyle.innerHTML = `

#crt{

position:fixed;

left:0;

top:0;

width:100%;

height:100%;

pointer-events:none;

background:

linear-gradient(

rgba(255,255,255,.015),

transparent 2px

);

background-size:100% 4px;

opacity:.18;

mix-blend-mode:overlay;

animation:crtMove .12s infinite;

z-index:999;

}

@keyframes crtMove{

0%{

transform:translateY(0);

}

100%{

transform:translateY(4px);

}

}

`;

document.head.appendChild(crtStyle);

/* ===========================
   FUMAÇA OSCILANDO
=========================== */

const fog = document.getElementById("fog");

let angle = 0;

function animateFog() {

    angle += 0.003;

    fog.style.transform =

        `translate(

        ${Math.sin(angle) * 20}px,

        ${Math.cos(angle) * 12}px

        )

        scale(1.08)`;

    requestAnimationFrame(
        animateFog
    );

}

animateFog();

/* ===========================
   DIGITAÇÃO NO HERO
=========================== */

const subtitle = document.querySelector(".subtitle");

if (subtitle) {

    const text = subtitle.innerText;

    subtitle.innerText = "";

    let i = 0;

    function typing() {

        if (i < text.length) {

            subtitle.innerText += text[i];

            i++;

            setTimeout(typing, 35);

        }

    }

    typing();

}

/* ===========================
   SOM AO PASSAR NOS BOTÕES
=========================== */

const hoverAudio = new Audio(
    "assets/audio/hover.mp3"
);

hoverAudio.volume = 0.15;

document.querySelectorAll("button,a")
.forEach(el => {

    el.addEventListener("mouseenter", () => {

        hoverAudio.currentTime = 0;

        hoverAudio.play().catch(()=>{});

    });

});

console.log("Cinematic Mode Loaded.");
/* ===========================================
   SCRIPT.JS
   PARTE 4
   MELHORIAS DAS PARTÍCULAS
=========================================== */

/* ===========================
   PARTICULAS BRILHANTES
=========================== */

function spawnGlow() {

    const p = particles[
        Math.floor(Math.random() * particles.length)
    ];

    p.alpha = 1;
    p.size = Math.random() * 3 + 1;

}

setInterval(spawnGlow, 250);

/* ===========================
   LINHAS ENTRE PARTÍCULAS
=========================== */

function drawConnections() {

    for (let i = 0; i < particles.length; i++) {

        for (let j = i + 1; j < particles.length; j++) {

            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;

            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 120) {

                ctx.beginPath();

                ctx.strokeStyle =
                    `rgba(255,255,255,${
                        (120 - distance) / 1200
                    })`;

                ctx.lineWidth = 0.4;

                ctx.moveTo(
                    particles[i].x,
                    particles[i].y
                );

                ctx.lineTo(
                    particles[j].x,
                    particles[j].y
                );

                ctx.stroke();

            }

        }

    }

}

/* ===========================
   SUBSTITUI A ANIMAÇÃO
=========================== */

/* PARALLAX DO FUNDO
=========================== */

window.addEventListener("mousemove", e => {

    const x =
        (e.clientX / window.innerWidth - 0.5) * 15;

    const y =
        (e.clientY / window.innerHeight - 0.5) * 15;

    const fog =
        document.getElementById("fog");

    if (fog) {

        fog.style.transform =
            `translate(${x}px,${y}px)`;

    }

});

/* ===========================
   PISCADAS ALEATÓRIAS
=========================== */

setInterval(() => {

    particles.forEach(p => {

        if (Math.random() < 0.04) {

            p.alpha = 1;

        }

    });

}, 200);

/* ===========================
   FPS LIMITER
=========================== */

let fps = 60;

let interval = 1000 / fps;

let last = performance.now();

function animationLoop(now) {

    const delta = now - last;

    if (delta > interval) {

        last = now - (delta % interval);

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        particles.forEach(p => {

            p.update();

            p.draw();

        });

        drawConnections();

    }

    requestAnimationFrame(animationLoop);

}

requestAnimationFrame(animationLoop);

console.log("Particles V2 Loaded");