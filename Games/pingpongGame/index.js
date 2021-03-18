//select canvas elements

const cvs = document.getElementById('pong');
const ctx = cvs.getContext('2d');

//generamos la paleta blanca del user
const user = {
    x: 0,
    y: cvs.height / 2 - 100 / 2,
    width: 10,
    height: 100,
    color: 'white',
    score: 0
}

//generamos la paleta blanca de la maquina
const com = {
    x: cvs.width - 10,
    y: cvs.height / 2 - 100 / 2,
    width: 10,
    height: 100,
    color: 'white',
    score: 0
}

//generamos la pelota
const ball = {
    x: cvs.width / 2,
    y: cvs.height / 2,
    radius: 10,
    speed: 5,
    velocityX: 5,
    velocityY: 5,
    color: 'white'
}

//generamos la red
const net = {
    x: cvs.width / 2 - 2 / 2,
    y: 0,
    width: 2,
    height: 10,
    color: 'white'
}

//funcion para dibujar rectangulo ppal, pelota de juego y score del juego

function drawRect(x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}

function drawCircle(x, y, r, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.fill();
}

function drawText(text, x, y, color) {
    ctx.fillStyle = color;
    ctx.font = "45px fantasy";
    ctx.fillText(text, x, y);
}

function drawNet() {
    for (let i = 0; i <= cvs.height; i += 15) {
        drawRect(net.x, net.y + i, net.width, net.height, net.color);
    }
}
//render the game
function render() {
    // clear the canvas
    drawRect(0, 0, cvs.width, cvs.height, 'black');

    //draw the net
    drawNet();

    //draw score
    drawText(user.score, cvs.width / 4, cvs.height / 5, 'white');
    drawText(com.score, 3 * cvs.width / 4, cvs.height / 5, 'white');

    //draw user and com paddle
    drawRect(user.x, user.y, user.width, user.height, user.color);
    drawRect(com.x, com.y, com.width, com.height, com.color);

    //draw the ball
    drawCircle(ball.x, ball.y, ball.radius, ball.color);
}

// controlar la paleta del user
cvs.addEventListener('mousemove', movePaddle);

function movePaddle(e) {
    let rect = cvs.getBoundingClientRect();
    user.y = e.clientY - user.height / 2 - rect.top;
}

//collision detection b=ball, p= player retorna TRUE si se cumplen las consdiciones
function collision(b, p) {
    b.top = b.y - b.radius;
    b.bottom = b.y + b.radius;
    b.left = b.x - b.radius;
    b.right = b.x + b.radius;

    p.top = p.y;
    p.bottom = p.y + p.height;
    p.left = p.x;
    p.right = p.x + p.width;

    return b.right > p.left && b.bottom > p.top && b.left < p.right && b.top < p.bottom
}

// reset ball
function resetBall() {
    ball.x = cvs.width / 2;
    ball.y = cvs.height / 2;

    ball.speed = 5;
    ball.velocityX = -ball.velocityX;
}

//update: pos, mov, score, etc...
function update() {
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    //simple AI para controlar el movimiento de la paleta de la maquina
    let computerLevel = 0.1;
    com.y += (ball.y - (com.y + com.height / 2)) * computerLevel;

    //representacion del top y del bottom de la pelota para el rebote con los lados:
    if (ball.y + ball.radius > cvs.height || ball.y - ball.radius < 0) {
        ball.velocityY = -ball.velocityY;
    }
    // esta variable es para detectar quien es el jugador que toca la pelota, dependiendo de que lado este la pelota
    let player = (ball.x < cvs.width / 2) ? user : com;

    if (collision(ball, player)) {
        //si se pruducen condiciones de colision en cualquiera de las dos paletas, quiero que rebote la pelota, lo que se logra inviertiendo la direccion de X
        //quiero ver en que punto colisionan y hacerlo dinamico, que no colisione siempre en el mismo punto
        let collidePoint = ball.y - (player.y + player.height / 2); // ESTO ES CERO CUANDO LA PELOTA CHOCA EN EL CENTRO

        //normalization to -1/1
        collidePoint = collidePoint / (player.height / 2);

        //calculate angle in Radian
        let angleRad = collidePoint * Math.PI / 4; //(45°)

        //para saber en que direccion sale el angulo de la pelota, quiero saber quien el el player
        let direction = (ball.x < cvs.width / 2) ? 1 : -1;
        //Change velocity X & Y
        ball.velocityX = direction * ball.speed * Math.cos(angleRad);
        ball.velocityY = direction * ball.speed * Math.sin(angleRad);

        //subimos la velocidad cada vez que la pelota choca
        ball.speed += 0.1;
    }
    //update the score
    if (ball.x - ball.radius < 0) {
        // the computer scores
        com.score++;
        resetBall();
    } else if (ball.x + ball.radius > cvs.width) {
        //user scores
        user.score++;
        resetBall();
    }
}


// game init
function game() {
    update();
    render();
    // console.log('hello');
}

//loop
const framePerSecond = 50
setInterval(game, 1000 / framePerSecond);
