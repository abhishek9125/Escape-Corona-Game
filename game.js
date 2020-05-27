function loadImages(){
    enemy_image = new Image();
    enemy_image.src = "Assets/v1.png";
    
    player_image = new Image();
    player_image.src = "Assets/superhero.png";
    
    gem_image = new Image();
    gem_image.src = "Assets/gemm.png";
}

function init(){
    canvas = document.getElementById('mycanvas');
    canvas.width = W = 700;
    canvas.height = H = 400;
    gameover = false;
    pen = canvas.getContext('2d');
    
    e1 = {
        x:150,
        y:50,
        w:60,
        h:60,
        speed:20
    };
    e2 = {
        x:300,
        y:150,
        w:60,
        h:60,
        speed:30
    };
    
    e3 = {
        x:450,
        y:20,
        w:60,
        h:60,
        speed:40
    };
    
    enemy = [e1,e2,e3];
    
    player = {
        x: 20,
        y: H/2,
        w: 60,
        h: 60,
        speed: 20,
        moving: false,
        health: 100
    };
    
    gem = {
        x: W-100,
        y: H/2,
        w: 60,
        h: 60
    };
    
    canvas.addEventListener('mousedown',function(){
        player.moving = true;
    });
    
    canvas.addEventListener('mouseup',function(){
        player.moving = false;
    });
}

function isColliding(rect1,rect2){
    if(rect1.x < rect2.x + rect2.w && rect1.x + rect1.w > rect2.x && rect1.y < rect2.y + rect2.h && rect1.y + rect1.h > rect2.y){
        return true;
    }
    
    return false;
}

function draw(){
    pen.clearRect(0,0,W,H);
    pen.fillStyle = "white";
    pen.fillText("Score " + player.health,10,10);
    pen.drawImage(player_image,player.x,player.y,player.w,player.h);
    pen.drawImage(gem_image,gem.x,gem.y,gem.w,gem.h);
    for(let i=0;i<enemy.length;i++){
        pen.drawImage(enemy_image,enemy[i].x,enemy[i].y,enemy[i].w,enemy[i].h);
    }
}

function update(){
    
    if(player.moving==true){
        player.x += player.speed;
        player.health += 10;
    }
    
    for(let i=0;i<enemy.length;i++){
        if(isColliding(enemy[i],player)){
            player.health -= 50;
            if(player.health<0){
                gameover = true;
                alert("Collision Occured" + player.health);
            }
        }
    }
    
    if(isColliding(player,gem)){
        console.log("GameOver");
        gameover = true;
        alert("You Won");
        return;
    }
    
    for(let i=0;i<enemy.length;i++){
        enemy[i].y = enemy[i].y + enemy[i].speed;
        if(enemy[i].y>=(H - enemy[i].h) || enemy[i].y<0){
            enemy[i].speed = enemy[i].speed*-1;
        }
    }

}

function gameloop(){
    
    if(gameover==true){
        clearInterval(f);
    }
    
    draw();
    update();
}

loadImages();
init();
var f = setInterval(gameloop,100);