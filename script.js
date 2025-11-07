// Page controls
const show = (id) => {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
};

const enterBtn = document.getElementById('enterBtn');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const okBtn = document.getElementById('okBtn');
const overlay = document.getElementById('overlayMsg');
const glass = document.getElementById('glass');
const heartsContainer = document.getElementById('hearts');

// Create floating hearts
function createHearts() {
  for (let i = 0; i < 15; i++) {
    setTimeout(() => {
      const heart = document.createElement('div');
      heart.classList.add('heart');
      heart.innerHTML = '❤';
      heart.style.left = Math.random() * 100 + 'vw';
      heart.style.animationDelay = Math.random() * 5 + 's';
      heartsContainer.appendChild(heart);
      
      // Remove heart after animation
      setTimeout(() => {
        heart.remove();
      }, 6000);
    }, i * 400);
  }
}

// Event listeners for navigation
enterBtn.addEventListener('click', () => show('p2'));

document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const p = document.querySelector('.page.active');
    if (p && p.id === 'p1') show('p2');
    else if (p && p.id === 'p2') yesBtn.click();
  }
});

yesBtn.addEventListener('click', () => show('p3'));

noBtn.addEventListener('click', () => {
  // show transparent message over the page
  overlay.style.pointerEvents = 'auto';
  glass.classList.add('show');
  // hide after 4.5s
  setTimeout(() => {
    glass.classList.remove('show');
    overlay.style.pointerEvents = 'none';
  }, 4500);
});

okBtn.addEventListener('click', () => show('p4'));

// GALLERY logic
const photos = Array.from(document.querySelectorAll('.photo'));
let hiddenCount = 0;

photos.forEach(ph => {
  ph.addEventListener('click', () => {
    ph.style.transition = 'transform .25s ease, opacity .3s ease';
    ph.style.transform += ' scale(.96)';
    // after 200ms start hide
    setTimeout(() => {
      ph.style.opacity = '0';
      ph.style.transform += ' translateY(-30px)';
    }, 200);
    // remove from layout after 2s
    setTimeout(() => {
      ph.style.display = 'none';
      hiddenCount++;
      if (hiddenCount >= photos.length) setTimeout(() => show('p5'), 700);
    }, 2000);
  });
});

// CAKE assembly animation (page5)
const base = document.getElementById('base');
const cream = document.getElementById('cream');
const candle = document.getElementById('candle');
const cakeArea = document.getElementById('cakeArea');
const flame = document.getElementById('flame');
const cutText = document.getElementById('cutText');
const cakeCut = document.getElementById('cakeCut');
const sprinkles = document.getElementById('sprinkles');
const cherry = document.getElementById('cherry');

// Create sprinkles
function createSprinkles() {
  const sprinkleColors = ['#ff3d8a', '#ffcc00', '#00ccff', '#66ff66', '#ff66cc'];
  for (let i = 0; i < 25; i++) {
    const sprinkle = document.createElement('div');
    sprinkle.classList.add('sprinkle');
    sprinkle.style.background = sprinkleColors[Math.floor(Math.random() * sprinkleColors.length)];
    sprinkle.style.left = Math.random() * 320 + 'px';
    sprinkle.style.top = Math.random() * 60 + 110 + 'px';
    sprinkles.appendChild(sprinkle);
  }
}

// initial assembly when page5 becomes visible
const observer = new MutationObserver((m) => {
  if (document.getElementById('p5').classList.contains('active')) {
    createSprinkles();
    createHearts();
    
    // drop base
    setTimeout(() => { 
      base.style.transform = 'translateX(-50%) translateY(0) scale(1)'; 
    }, 200);
    
    // drop cream
    setTimeout(() => { 
      cream.style.transform = 'translateX(-50%) translateY(0) scale(1)'; 
    }, 650);
    
    // drop candle and cherry
    setTimeout(() => { 
      candle.style.transform = 'translateX(-50%) translateY(0)'; 
      cherry.style.transform = 'translateX(-50%) translateY(0)';
      cakeArea.classList.add('ready'); 
    }, 1200);
  }
});
observer.observe(document.getElementById('p5'), {attributes: true, attributeFilter: ['class']});

// click to cut
let cutDone = false;
cakeArea.addEventListener('click', () => {
  if (cutDone) return; 
  cutDone = true;
  
  // Hide original cake parts
  base.style.opacity = '0';
  cream.style.opacity = '0';
  candle.style.opacity = '0';
  flame.style.opacity = '0';
  cherry.style.opacity = '0';
  
  // Show cut cake parts
  cakeCut.style.display = 'block';
  
  // Animate cake cutting
  setTimeout(() => {
    document.querySelector('.base-left').style.transform = 'rotate(-15deg)';
    document.querySelector('.base-right').style.transform = 'rotate(15deg)';
    document.querySelector('.cream-left').style.transform = 'rotate(-15deg)';
    document.querySelector('.cream-right').style.transform = 'rotate(15deg)';
  }, 100);
  
  // Create more hearts
  createHearts();
  
  // show cut text
  setTimeout(() => { 
    cutText.classList.add('show'); 
  }, 800);
});

// Accessibility: focus management
enterBtn.focus();
