


let front = 1; //va nous servir d'index pour les classes du positionnement du personne exemple:position-face4
let back = 1;
let left = 1;
let right = 1;
let positionX = 0; //pour le déplacement du personnage sur la map (il est en absolute par défaut)
let positionY = 0;
const BACK = 40; //flèche du bas clavier
const FRONT = 38; //flèche du haut clavier
const LEFT = 37; //flèche de gauche clavier
const RIGHT = 39; //flèche de droite clavier
const speed = 5; //vitesse de changement de position (on peut varier)
let mapIndex = 1; //index de la map à afficher
let perso = document.getElementById('perso'); //récupération du personnage (pour modifier son apparence et position)
let map = document.getElementById('map'); //récupération de la qui met le cadre du jeu
let resultMap = document.getElementById('resultMap'); //div ou on inject la map

//initialisation de la map
function createMap(mapper, index, mode) {
    //si c'est en mode start
    if(mode === "start") {
        //initialisation de la position de départ X et Y avec mapper et index
    positionX = mapper[index].start[0]
    positionY = mapper[index].start[1]
     } else { //sinon (c'est mode end)
        //initialisation de la position de fin X et Y avec mapper et index
    positionX = mapper[index].end[0]
    positionY = mapper[index].end[1]        
    }
    //attribution de la position du perso en fonction des position X et Y qui viennent d'être déterminées (css)
    perso.style.top = `${positionY}px`;
    perso.style.left = `${positionX}px`;
    
    //création d'une balise HTML table
    let html = "<table>"
    //boucle qui va parcourir mapper[index]
    for(let i = 0; i < mapper[index].map.length; i++) {
        //création d'une ligne de tableau (tr)
    html += "<tr>"    
        //boucle qui va parcourir les colonnes du tableau
        for(let cel = 0; cel < mapper[index].map[i].length; cel++) { // <<<--- Cel = chaque celule du tableau
                //condition qui va attribuer selon les chiffre dans le tableau de la map concernée une classe selon si c'est grass, block, rock , water et out
                //cette switch va créer des colonnes de tableau (td) avec la bonne classe pour chacun
                switch(mapper[index].map[i][cel]) {

                    case 0:
                        html += `<td class="grass"></td>`
                    break;

                    case 1:
                        html += `<td class="water"></td>`
                    break;

                    case 2:
                        html += `<td class="rock"></td>`
                    break;

                    case 3:
                        html += `<td class="block"></td>`
                    break;

                    case 4:
                    case 5:
                        html += `<td class="out"></td>`
                    break;              
                }
                
            
        } //on ferme la ligne tr
        html += `</td>`       
    } //on ferme le tableau
    html += `</tr>`
    //on injecte notre html dans resultMap (dans le DOM)    
    resultMap.innerHTML = html
}

//fonction qui fait bouger le perso
function movePerso(arrowChoise) {
    
    //MEGA CONDITION SWITCH selon la touche du clavier que l'utilisateur a appuyé
    switch(arrowChoise.keyCode){
        case BACK://dans le cas où c'est BACK
        
            //on vide les classes du perso
            perso.className = ""
            //on incrémente vers le bas de 1
            back++
            //on limite à  9 au dizième (condition)
            if(back > 9){
              back = 1 } //on revient à 1
                
            //on ajoute la class positionFace qui correspond à l'index
            perso.classList.add(`positionFace-${back}`)
            //si la position est ok (appel de la fonction isValidatePosition)
            if(isValidatePosition(positionX, positionY, mapper, BACK)) {
                //changement de la position Y du personnage
                positionY += speed;
                perso.style.top = `${positionY}px`;
            }
            
        break;   

        //dans le cas où c'est FRONT
        case FRONT:    
            perso.className = "" //on vide les classes du perso
            //on incrémente vers le bas de 1
            front++
            //on limite à  9 au dizième (condition)
            if (front > 9){
                front = 1 //on revient à 1
            }
            //on ajoute la class positionBack qui correspond à l'index
            perso.classList.add(`positionBack-${front}`)
            //si la position est ok (appel de la fonction isValidatePosition)
            if(isValidatePosition(positionX, positionY, mapper, FRONT)) {
                //changement de la position Y du personnage
                positionY -= speed;
                perso.style.top = `${positionY}px`;
            }    
        break; 
        
        
        //dans le cas où c'est LEFT
        case LEFT:
            //on vide les classes du perso
            perso.className = ""
            //on incrémente vers la gauche de 1
            left++
            //on limite à  9 au dizième (condition)
            if(left > 9){
                left = 1 //on revient à 1
            };
            //on ajoute la class positionLeft qui correspond à l'index
            perso.classList.add(`positionLeft-${left}`);
            //si la position est ok (appel de la fonction isValidatePosition)
            if(isValidatePosition(positionX, positionY, mapper, LEFT)) {
            //changement de la position X du personnage
            positionX -= speed;
            perso.style.left = `${positionX}px`
            }
        break;

        //dans le cas où c'est RIGHT
        case RIGHT:
            //on vide les classes du perso
            perso.className = ""
            //on incrémente vers la droite de 1
            right++
            //on limite à  9 au dizième (condition)
            if(right > 9){
                right = 1  //on revient à 1
            }
            //on ajoute la class positionRight qui correspond à l'index
            perso.classList.add(`positionRight-${right}`)
            //si la position est ok (appel de la fonction isValidatePosition)
            if(isValidatePosition(positionX, positionY, mapper, RIGHT)) {
                //changement de la position X du personnage
            positionX += speed;
            perso.style.left = `${positionX}px`
            }
        break;
    }

}

//on l'appelera dans chaque cas de la switch du movePerso
//cette fonction nous permet de valider si il peut changer de position ou non (on pose des limites aux déplacements du perso)
function isValidatePosition(positionX, positionY, mapper, mode){
    
    //on initialise un index X et Y à 0
    let indexX = 0
    let indexY = 0
    
    //condition qui vérifie selont la touche qu'il a pressé si la case suivante est accessible
    switch(mode){
        case BACK:
            indexX = parseInt((positionY + 35) / 60)
            indexY = parseInt((positionX + 30) / 60)
        break;
        case FRONT:
            indexX = parseInt((positionY + 30) / 60)
            indexY = parseInt((positionX + 30) / 60)
        break;
        case LEFT:
            indexX = parseInt((positionY + 30) / 60)
            indexY = parseInt((positionX + 20) / 60)
        break; 
        case RIGHT:
            indexX = parseInt((positionY + 30) / 60)
            indexY = parseInt((positionX + 40) / 60)
        break;
    }
    
    //récupération du chiffre du tableau de la map correspondant au type de case 
    switch(mapper[mapIndex].map[indexX][indexY]){
    
        case 5: //si le type est 5
            //on va incrémenter mapIndex (pour qu'il affiche la map suivante)
            mapIndex++
            //si mapIndex est plus grand ou égal au nombre de map
            if(mapIndex >= mapIndex.length){
                mapIndex = 0 //on repars à l'index 
            }
            //appel de la fonction qui va créer la map en mode start (entrée)
            createMap(mapper, mapIndex, "start")   
        break;
        case 4://si le type est 4
        
            //on décrémente mapIndex (pour qu'il affiche la map précédente)
            mapIndex--
            //si mapIndex est inférieur à 0 (on est arrivé en dessous du premier index = impossible)
            if(mapIndex < 0){
                //mapIndex repart au dernier index
                mapIndex = mapper.length - 1
            }
                
            //appel de la fonction qui va créer la map en mode end (sortie)
            createMap(mapper, mapIndex, "end") 
        break;
        case 0://si le type est 0
        
            //on retourne le fameux booleen true
            return true;  
        break;
        default: //sinon
            //on retourn le fameux booleen false
            return false;
        }    
}


//création de la map (appel fonction)
//tableau des maps (map.js), index de la map à afficher (map.js), entrée par la porte d'entrée ou de sortie
createMap(mapper, mapIndex, "start")
//gestionnaire d'événement lorsqu'on appuie sur un bouton du clavier (appel fonction en callback)
document.addEventListener('keydown', movePerso)