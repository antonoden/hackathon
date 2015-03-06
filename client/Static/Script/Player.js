var Player = function() {
    this.input = {
        moveDirection: 0,
        rotDirection: 0,
        shoot: 0
    };
    this.weapon = "handgun";
};

Player.prototype.playSound = function() {
    
    if(this.weapon === "handgun") {
        document.getElementById("audio_Bullet_Whizzing").play();
    }
    else if(this.weapon === "machinegun") {
        document.getElementById("audio_Bullet_Whizzing").play();
    }
};
