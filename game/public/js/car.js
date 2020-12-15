export class Car {
    constructor(brand, color, licensePlate, owner, price) {
        this.brand = brand;
        this.color = color;
        this.licensePlate = licensePlate;
        this.owner = owner;
        this.price = price;
    }


    sell(newOwner) {
        if (this.isForSale()) {
            this.owner = newOwner;
            this.price = null;
            console.log("The car with the license plate " + this.licensePlate + " has been sold to " + this.owner);
        }
        else {
            console.log("This car is not currently for sale ");
        }
    }


    putForSale(price) {
        if (!(this.isForSale())) {
            this.owner = null;
            this.price = price;
            console.log("The car with the license plate " + this.licensePlate + " has been put up for sale for " + this.price);
        }
        else {
            console.log("This car is already for sale ");
        }
    }


    isForSale() {
        return this.owner == null;
    }


    printCarData() {
        console.log("The car with the license plate " + this.licensePlate + " is a " + this.color + " " + this.brand);
        if (this.isForSale()) {
            console.log("This car is currently for sale for " + this.price);
        }
        else {
            console.log("This car is not currently for sale ");
        }
    }
}