var benefits = [
"Increased Digestion Speed",
    "Increased Combat Damage Against Diseases",
    "Increased Healing Speed",
    "Increased Defense Against Diseases"
]

let bias = [
    4,
    1,
    2,
    3
]

let digestionSpeed = 1
let combatDamage = 1
let defenseLevel = 1
let healSpeed = 1
let monsterDamage = 4
let monsterHealth = 4
let temp;
let benefit;
let newList = undefined;
let mainPickle = document.getElementById("mainpickle")
let mainCharacter = document.getElementById("character")
let dead = false;
var on = false;

function onPickleHover() {
    mainPickle.style.height = "24vh";
    mainPickle.style.width = "24vh";
    document.getElementById("mainpicklediv").style.paddingRight = "6vh"
    document.getElementById("mainpicklediv").style.paddingLeft = "4vh"
}

function onPickleLeave() {
    mainPickle.style.height = "22vh";
    mainPickle.style.width = "22vh";
    document.getElementById("mainpicklediv").style.paddingRight = "1vh"
    document.getElementById("mainpicklediv").style.paddingLeft = "3vh"
}

function randomWithBias(list, bias) {
    if (newList != undefined) {
        return newList[Math.floor(Math.random()*newList.length)];
    } else {
        newList = []

        for (let i = 0; i < list.length; i++) {
            for(let j = 0; j < bias[i]; j++) {
                newList.push(list[i])
            }
        }

        console.log(newList)
        return newList[Math.floor(Math.random()*newList.length)];
    }

}

function elementsOverlap(el1, el2) {
    const domRect1 = el1.getBoundingClientRect();
    const domRect2 = el2.getBoundingClientRect();

    return !(
    domRect1.top > domRect2.bottom ||
    domRect1.right < domRect2.left ||
    domRect1.bottom < domRect2.top ||
    domRect1.left > domRect2.right
    );
}

mainPickle.onclick = function() {
    on = true
    benefit = randomWithBias(benefits, bias);

    let image = document.createElement("img")

    if (benefit === "Increased Digestion Speed") {
        image.src = "Images/gut.png"
        image.classList.add("gut")
        digestionSpeed += 1
    } if (benefit === "Increased Combat Damage Against Diseases") {
        image.src = "Images/sword.png"
        image.classList.add("sword")
        combatDamage += 0.2
    } if (benefit === "Increased Healing Speed") {
        image.src = "Images/heart.png"
        image.classList.add("heart")
        healSpeed += 0.1
    } if (benefit === "Increased Defense Against Diseases") {
        image.src = "Images/shield.png"
        image.classList.add("shield")
        defenseLevel += 0.01
    }

    image.classList.add("mod")

    document.body.appendChild(image)

    image.style.transition = "transform .6s ease-out";
    image.style.transformOrigin = "0 0";
    image.style.transform = "translateX("+Math.abs(image.x-mainCharacter.x-100)+"px) translateY(-"+Math.abs(image.y-mainCharacter.y-200)+"px)";
    on = false
}

function checkForCollision() {
    if (!dead) {
        setTimeout(() => {
            var all = document.getElementsByTagName("*");

            for (var i=0, max=all.length; i < max; i++) {
                if (all[i] != undefined) {
                    if (elementsOverlap(all[i], mainCharacter)) {
                        if (all[i].classList.contains("mod")) {
                            all[i].remove()
                        } if (all[i].classList.contains("enemy")) {
                            document.getElementById("health").value -= monsterDamage/defenseLevel
                            if (document.getElementById("health").value < 1) {
                                window.location.href = "/death"
                                dead = true;
                            }
                            all[i].remove()
                        }
                    }
                }
            }

            checkForCollision()
        }, 500)
    }
}

function heal() {
    setTimeout(() => {
        document.getElementById("health").value += healSpeed
        heal()
    }, 500)
}

function spawnEnemy() {
    if (!dead) {
        setTimeout(() => {
            var image = document.createElement("img")
            image.src = "Images/germs/virus.png"
            var y=Math.random()*Math.round(0.4*window.screen.height);
            y = Math.round(y);
            image.classList.add("enemy")
            image.style.aspectRatio = "1:1"
            image.style.width = "5vh";
            image.style.top=y+'px';
            document.body.appendChild(image)
            image.style.transition = "transform 10s ease-out";
            image.style.transformOrigin = "0 0";
            image.style.transform = "translateX("+Math.abs(image.x-mainCharacter.x)+"px) translateY(-"+Math.abs(image.y-mainCharacter.y)+"px)";
            monsterDamage += 0.1
            spawnEnemy()
        }, 650)
    } else {
        console.log("Hie")
    }
}

checkForCollision()
heal()
spawnEnemy()
