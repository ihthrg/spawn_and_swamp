import { prototypes, utils, constants} from 'game';
import { } from 'arena';


export function loop() {
    var myCreeps = utils.getObjectsByPrototype(prototypes.Creep).filter(i => i.my);
    var enemyCreeps = utils.getObjectsByPrototype(prototypes.Creep).filter(i => !i.my);
    var containers = utils.getObjectsByPrototype(prototypes.StructureContainer);
    var mySpawn = utils.getObjectsByPrototype(prototypes.StructureSpawn).find(i => i.my);    
    const enemySpawn = utils.getObjectsByPrototype(prototypes.StructureSpawn).find(i => !i.my);



    if (myCreeps.length < 1) {
        myCreeps = mySpawn.spawnCreep([constants.MOVE,constants.CARRY]).object;
    } else if (((myCreeps.length % 2)==0) && (myCreeps.length < 6)) {
        for(var creep of myCreeps) {
            if(creep.body.some(bodyPart => bodyPart.type == constants.CARRY)) {
                if(creep.store.getFreeCapacity(constants.RESOURCE_ENERGY)) {
                    var container = creep.findClosestByPath(containers);
                    if(creep.withdraw(container, constants.RESOURCE_ENERGY) == constants.ERR_NOT_IN_RANGE) {
                        creep.moveTo(container);
                    }
                } else {
                    if(creep.transfer(mySpawn, constants.RESOURCE_ENERGY) == constants.ERR_NOT_IN_RANGE) {
                        creep.moveTo(mySpawn);
                    }
                }
            }
            
        }
        myCreeps = mySpawn.spawnCreep([constants.MOVE,constants.CARRY]).object;
    } else if(myCreeps.length < 14) {
        for(var creep of myCreeps) {
            if(creep.body.some(bodyPart => bodyPart.type == constants.CARRY)) {
                if(creep.store.getFreeCapacity(constants.RESOURCE_ENERGY)) {
                    var container = creep.findClosestByPath(containers);
                    if(creep.withdraw(container, constants.RESOURCE_ENERGY) == constants.ERR_NOT_IN_RANGE) {
                        creep.moveTo(container);
                    }
                } else {
                    if(creep.transfer(mySpawn, constants.RESOURCE_ENERGY) == constants.ERR_NOT_IN_RANGE) {
                        creep.moveTo(mySpawn);
                    }
                }
            }
            if (creep.body.some(bodyPart => bodyPart.type == constants.RANGED_ATTACK)) {
                creep.moveTo(enemySpawn);
                creep.attack(enemySpawn);
            }
        }
        myCreeps = mySpawn.spawnCreep([constants.MOVE,constants.MOVE,constants.RANGED_ATTACK]).object;

    } else {
        for(var creep of myCreeps) {
            if(creep.body.some(bodyPart => bodyPart.type == constants.CARRY)) {
                if(creep.store.getFreeCapacity(constants.RESOURCE_ENERGY)) {
                    var container = creep.findClosestByPath(containers);
                    if(creep.withdraw(container, constants.RESOURCE_ENERGY) == constants.ERR_NOT_IN_RANGE) {
                        creep.moveTo(container);
                    }
                } else {
                    if(creep.transfer(mySpawn, constants.RESOURCE_ENERGY) == constants.ERR_NOT_IN_RANGE) {
                        creep.moveTo(mySpawn);
                    }
                }
            }
            if((creep.attack(enemyCreeps[0]) == constants.ERR_NOT_IN_RANGE) && creep.body.some(bodyPart => bodyPart.type == constants.TOUGH)) {
                creep.moveTo(enemyCreeps[0]);
            }
            else if (creep.body.some(bodyPart => bodyPart.type == constants.RANGED_ATTACK)) {
                creep.moveTo(enemySpawn);
                creep.attack(enemySpawn);
            }
        }
        myCreeps = mySpawn.spawnCreep([constants.MOVE,constants.RANGED_ATTACK,constants.MOVE,constants.MOVE,constants.TOUGH]).object;

    }
    


}




// export function loop() {
//     if(!attacker) {
//         var mySpawn = getObjectsByPrototype(StructureSpawn).find(i => i.my);
//         attacker = mySpawn.spawnCreep([MOVE, ATTACK]).object;
//     }
//     else {
//         const enemySpawn = getObjectsByPrototype(StructureSpawn).find(i => !i.my);
//         attacker.moveTo(enemySpawn);
//         attacker.attack(enemySpawn);
//     }
// }

