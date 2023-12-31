const canvas = document.getElementById('mazeCanvas');
const ctx = canvas.getContext('2d');

const blockSize = 20; // Adjusted blockSize
const mazeWidth = 20;
const mazeHeight = 15;

let steve = { x: 0, y: 0, image: new Image() };
let zombies = [];
let diamonds = [];
let stoneImage = new Image();

let maze;

function generateRandomMaze() {
    const maze = [];
    for (let row = 0; row < mazeHeight; row++) {
        maze[row] = [];
        for (let col = 0; col < mazeWidth; col++) {
            maze[row][col] = Math.random() > 0.7 ? 1 : 0;
        }
    }

    return maze;
}

function isOverlap(obj1, obj2) {
    return obj1.x === obj2.x && obj1.y === obj2.y;
}

function loadImages(callback) {
    steve.image.onload = function () {
        stoneImage.onload = function () {
            callback();
        };
        stoneImage.src = '../images/stone.png';
    };
    steve.image.src = '../images/steve.png';
}

function drawMaze() {
    for (let row = 0; row < maze.length; row++) {
        for (let col = 0; col < maze[row].length; col++) {
            if (maze[row][col] === 1) {
                ctx.drawImage(stoneImage, col * blockSize, row * blockSize, blockSize, blockSize);
            }
        }
    }
}

function drawCharacter(character) {
    ctx.drawImage(character.image, character.x * blockSize, character.y * blockSize, blockSize, blockSize);
}

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawMaze();
    drawCharacter(steve);
    for (let i = 0; i < zombies.length; i++) {
        drawCharacter(zombies[i]);
    }
    for (let i = 0; i < diamonds.length; i++) {
        drawCharacter(diamonds[i]);
    }
}

function moveZombies() {
    for (let i = 0; i < zombies.length; i++) {
        moveZombie(zombies[i]);
    }

    checkGameStatus();
    drawGame();
}

function moveZombie(zombie) {
    const directions = [{ dx: 0, dy: -1 }, { dx: 0, dy: 1 }, { dx: -1, dy: 0 }, { dx: 1, dy: 0 }];
    const randomDirection = directions[Math.floor(Math.random() * directions.length)];
    const newX = zombie.x + randomDirection.dx;
    const newY = zombie.y + randomDirection.dy;

    if (newX >= 0 && newX < mazeWidth && newY >= 0 && newY < mazeHeight && maze[newY][newX] !== 1 && !isOverlap({ x: newX, y: newY }, steve) && !zombies.some(z => isOverlap({ x: newX, y: newY }, z)) && !diamonds.some(d => isOverlap({ x: newX, y: newY }, d))) {
        zombie.x = newX;
        zombie.y = newY;
    }
}

function checkGameStatus() {
    for (let i = 0; i < zombies.length; i++) {
        if (steve.x === zombies[i].x && steve.y === zombies[i].y) {
            alert('Oh no! Steve got caught by a zombie. Game over!');
            resetGame();
            return;
        }
    }

    for (let i = 0; i < diamonds.length; i++) {
        if (steve.x === diamonds[i].x && steve.y === diamonds[i].y) {
            diamonds.splice(i, 1);
            i--;
        }
    }

    if (diamonds.length === 0) {
        alert('Congratulations! Steve collected all the diamonds and won the game!');
        resetGame();
    }
}

function resetGame() {
    steve = { x: 0, y: 0, image: steve.image };
    zombies = [];
    diamonds = [];
    maze = generateRandomMaze();

    for (let i = 0; i < 3; i++) {
        let diamond;
        do {
            diamond = { x: Math.floor(Math.random() * mazeWidth), y: Math.floor(Math.random() * mazeHeight), image: new Image() };
            diamond.image.src = '../images/diamond.png';
        } while (maze[diamond.y][diamond.x] === 1 || isOverlap(diamond, steve) || zombies.some(zombie => isOverlap(diamond, zombie)) || diamonds.some(existingDiamond => isOverlap(diamond, existingDiamond)));
        diamonds.push(diamond);
    }

    for (let i = 0; i < 3; i++) {
        let zombie;
        do {
            zombie = { x: Math.floor(Math.random() * mazeWidth), y: Math.floor(Math.random() * mazeHeight), image: new Image() };
            zombie.image.src = '../images/zombie.png';
            setInterval(() => moveZombie(zombie), 1000);
        } while (maze[zombie.y][zombie.x] === 1 || isOverlap(zombie, steve) || zombies.some(existingZombie => isOverlap(zombie, existingZombie)));
        zombies.push(zombie);
    }

    do {
        steve.x = Math.floor(Math.random() * mazeWidth);
        steve.y = Math.floor(Math.random() * mazeHeight);
    } while (maze[steve.y][steve.x] === 1);

    drawGame();
}

function moveSteve(dx, dy) {
    const newX = steve.x + dx;
    const newY = steve.y + dy;

    if (newX >= 0 && newX < mazeWidth && newY >= 0 && newY < mazeHeight && maze[newY][newX] !== 1) {
        steve.x = newX;
        steve.y = newY;
    }

    checkGameStatus();
    drawGame();
}

canvas.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            moveSteve(0, -1);
            break;
        case 'ArrowDown':
            moveSteve(0, 1);
            break;
        case 'ArrowLeft':
            moveSteve(-1, 0);
            break;
        case 'ArrowRight':
            moveSteve(1, 0);
            break;
    }
});

loadImages(() => {
    maze = generateRandomMaze();
    resetGame();
});
