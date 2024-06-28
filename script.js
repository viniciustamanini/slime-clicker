let coins = 0;
let clickValue = 1;
let log = ['Inicio do jogo']; 
const bossTotalHealth = 500;
let bossCurrentHealth = bossTotalHealth;

showLogs();
updateHealthBar(); 
getClickValue();

function incrementCoins() {
  updateHealthBar(true);
  if (bossCurrentHealth == 0) {
    showMessage(`Você venceu!`, 'yellow');
    endGame();
    return;
  }

  coins += clickValue; 
  showCurrentCoins();
  getClickValue();
  showMessage(`+${clickValue} moeda(s).`, 'yellow');
}

function showCurrentCoins() {
  document.getElementById('coin-pouch').innerText = coins; 
}

function getClickValue() {
  document.getElementById('damage').innerText = clickValue; 
}

function setClickValue(cost, clickBuff) {
  if (coins < cost || (coins - cost) < 0) {
    showMessage("Moedas insuficientes.")
    pingCoinPouch();
    return;
  }

  clickValue = clickValue + clickBuff;
  coins -= cost;
  showCurrentCoins();
  getClickValue();
  showMessage(`Dano aumentado para ${clickValue}`, 'green')
}

function pingCoinPouch() {
  const value = document.getElementById('coin-pouch');
  value.style.color = 'red';

  //  setTimeout(() => {
  //      message.style.opacity = '0';
  //  }, 1000); 

   setTimeout(() => {
       value.style.color = 'black';
   }, 500); 
}

function showMessage(messageText, textColor = 'red') {
  const message = document.getElementById('gamelog');
  //message.style.opacity = '1';
  message.style.fontSize = '11px';
  // message.style.color = textColor;
  message.style.color = 'brown';
  //message.innerText = messageText;

  // setTimeout(() => {
  //     message.style.opacity = '0';
  // }, 1000); 

  // setTimeout(() => {
  //     message.style.display = 'none';
  // }, 3000);

  addLogMessage(messageText);
}

function showLogs() {
  const logs = document.getElementById('gamelog');
  if (logs == null)
    return;
  logs.innerHTML = ''; 

  log.forEach(text => {
    const p = document.createElement('p');
    p.textContent = text;
    //p.style.transition = 'width 0.3 ease';
    // p.textColor = 
    //p.classList.add('text');
    logs.appendChild(p);
  });
}

function addLogMessage(message) {
  log.push(message);

  if (log.length > 8)
    log.shift();

  showLogs();
}

function updateHealthBar(hit = false) {
  if (hit && bossCurrentHealth > 0) {
      bossCurrentHealth -= clickValue; 
      if (bossCurrentHealth < 0) 
        bossCurrentHealth = 0; 
  }

  const healthPercentage = (bossCurrentHealth / bossTotalHealth) * 100;
  const healthBar = document.getElementById('healthBar');
  const healthText = document.getElementById('healthText');
  healthBar.style.width = healthPercentage + '%';
  healthText.textContent =  `${bossCurrentHealth} (${healthPercentage.toFixed(0)}%)`;
  
  if (healthPercentage > 50) {
      healthBar.style.backgroundColor = '#4caf50'; // Verde
  } else if (healthPercentage > 20) {
      healthBar.style.backgroundColor = '#ffeb3b'; // Amarelo
  } else {
      healthBar.style.backgroundColor = '#f44336'; // Vermelho
  }
}

function endGame() {
  const boss  = document.getElementById('boss');
  boss.style.filter = 'grayscale(100%)'; 
  boss.style.pointerEvents = 'none';
}

const radius = 10; 
const speed = 0.01;
let angle = 1;

function moveImageInCircle(imgName = "", centerX = 0, centerY = 0) {
  const image = document.getElementById(imgName);
  const posX = centerX + radius * Math.cos(angle);
  const posY = centerY + radius * Math.sin(angle);

  image.style.left = posX + 'px';
  image.style.top = posY + 'px';

  angle += speed;

  requestAnimationFrame(() => { 
    moveImageInCircle(imgName, centerX, centerY)
  });
}

moveImageInCircle('rightCloud', 360, 3);
moveImageInCircle('leftCloud', 50, 70);
