CAR_STATUS = Object.freeze({
    READY: 'READY',
    GOING_UP: 'UP',
    GOING_DOWN: 'DOWN'
});

class ElevatorFactory {
    constructor(floorsInBuilding, numberOfCars){
        this.floorsInBuilding = floorsInBuilding;
        this.numberOfCars = numberOfCars;
    }

    build(){
        const buildingFloors = [];
        for (let i = 1; i <= this.floorsInBuilding; i++) {
            buildingFloors.push(i);
        }

        const elevatorData = {};
        for (let i = 1; i <= this.numberOfCars; i++) {
            elevatorData[`car${i}`]={};
            elevatorData[`car${i}`].access = buildingFloors;
            elevatorData[`car${i}`].location = buildingFloors[0];
            elevatorData[`car${i}`].status = CAR_STATUS.READY;
        }
        return new ElevatorDispatcher(buildingFloors, elevatorData)
    }
}


class ElevatorDispatcher {
    constructor(buildingFloors, elevatorData){
        this.buildingFloors = buildingFloors;
        this.elevatorData = elevatorData;
    }

    printInfo(){
        console.log('BuildingFloors:', this.buildingFloors);
        console.log('ElevatorData:', this.elevatorData);
    }

    pushUp(floor) {
        console.log(`\nPassenger on floor ${floor} requests UP`);
        const movingCars = this.candidateGoingUpCars(floor);
        const readyCars = this.candidateReadyCars(floor);
        const closestCar = this.closestCar(floor, movingCars.concat(readyCars));
        this.moveCar(closestCar.car, floor)
    }

    pushDown(floor) {
        console.log(`\nPassenger on floor ${floor} requests DOWN`);
        const movingCars = this.candidateGoingDownCars(floor);
        const readyCars = this.candidateReadyCars(floor);
        const closestCar = this.closestCar(floor, movingCars.concat(readyCars));
        this.moveCar(closestCar.car, floor)
    }

    candidateReadyCars(floor) {
        return Object.keys(this.elevatorData)
            .filter((car) => this.elevatorData[car].access.includes(floor))
            .filter((car) => this.elevatorData[car].status == CAR_STATUS.READY);
    }

    candidateGoingUpCars(floor) {
        return Object.keys(this.elevatorData)
            .filter((car) => this.elevatorData[car].access.includes(floor))
            .filter((car) => this.elevatorData[car].status == CAR_STATUS.GOING_UP)
            .filter((car) =>
                this.buildingFloors.indexOf(this.elevatorData[car].location) < this.buildingFloors.indexOf(floor));
    }

    candidateGoingDownCars(floor){
        return Object.keys(this.elevatorData)
            .filter((car) => this.elevatorData[car].access.includes(floor))
            .filter((car) => this.elevatorData[car].status == CAR_STATUS.GOING_DOWN)
            .filter((car) =>
                this.buildingFloors.indexOf(this.elevatorData[car].location) > this.buildingFloors.indexOf(floor));
    }

    closestCar(floor, candidateCars) {
        const closestCar = candidateCars.reduce((closest, car) => {
                const carLocation = this.elevatorData[car].location;
                const distance = Math.abs(this.buildingFloors.indexOf(floor) - this.buildingFloors.indexOf(carLocation));
                if (distance < closest.distance) {
                    closest.distance = distance;
                    closest.car = car;
                }
                return closest
            }, {distance: 999, car: ''}
        );
        return closestCar;
    }

    moveCar(car, toFloor) {
        console.log(`Moving ${car} from Floor ${this.elevatorData[car].location} to Floor ${toFloor}`);
        this.elevatorData[car].location = toFloor;
        this.passengerMovesCar(car)
    }

    passengerMovesCar(car){
        const toFloor = this.buildingFloors[Math.floor(Math.random()*this.buildingFloors.length)];
        console.log(`Passenger Moved ${car} from Floor ${this.elevatorData[car].location} to Floor ${toFloor}`);
        this.elevatorData[car].location = toFloor;
        this.elevatorData[car].status = CAR_STATUS.READY;
    }
}

console.log('\n===== Factory Elevator System =====');
let thirtyEightChauncy = new ElevatorFactory(10, 2).build();
thirtyEightChauncy.printInfo();
thirtyEightChauncy.pushDown(6);
thirtyEightChauncy.pushDown(5);
thirtyEightChauncy.pushUp(4);
thirtyEightChauncy.pushUp(9);

console.log('\n===== Custom Elevator System =====');
const buildingFloors = ['G', 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 15];
const elevatorData = {
    car1: {
        access: ['G', 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 15],
        location: 3,
        status: CAR_STATUS.GOING_UP
    },
    car2: {
        access: ['G', 2, 3, 4, 5, 6, 7, 8, 9, 10],
        location: 10,
        status: CAR_STATUS.GOING_DOWN
    }
};
thirtyEightChauncy = new ElevatorDispatcher(buildingFloors, elevatorData);
thirtyEightChauncy.printInfo();
thirtyEightChauncy.pushDown(7);
thirtyEightChauncy.pushUp(14);
thirtyEightChauncy.pushUp(5);
thirtyEightChauncy.pushUp('G');
