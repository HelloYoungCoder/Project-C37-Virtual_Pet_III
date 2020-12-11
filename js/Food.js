class Food {
    constructor() {
        this.foodImg = loadImage("images/Milk.png");
        this.foodStock = 0;
        this.lastFed = 0;
    }

    //To read, write and update food stock
    getFoodStock() {
        return this.foodStock;
    }

    updateFoodStock(foodStock) {
        this.foodStock = foodStock;
    }

    deductFood() {
        if (this.foodStock - 1) {
            this.foodStock = this.foodStock - 1;
        }
    }

    //To display the food image 
    display() {

        var x = 95, y = 210;

        imageMode(CENTER);

        if (this.foodStock !== 0) {
            
            for (let i = 0; i < this.foodStock; i++) {
                
                if (i % 5 == 0) {
                    x = 90;
                    y = y + 50;
                }

                image(this.foodImg, x, y, 50, 50);
                x = x + 25;
                
            }

        } 
    }

    //To assign different background
    play() {
        background(livingRoomImg, 500, 500);
    }

    sleepy() {
        background(bedRoomImg, 500, 500);
    }

    bath() {
        background(washRoomImg, 500, 500);
    }
}