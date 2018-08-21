# Coffee Shop Simulator

![alt text](https://github.com/bhgoal/bhgoal.github.io/blob/master/assets/images/coffeeShopSim.png "Coffee Shop Sim screenshot")

## Summary
Coffee Shop Simulator is an interactive beverage building game where players can simulate working as a barista, making coffee and espresso drinks as fast as possible before time runs out. It utilizes React to create the user interface, and Express and Node.js to connect to a MongoDB where user data is stored. Authentication is performed using Auth0.

## Gameplay:

### Usage:
The interface depicts a barista workstation consisting of the machines used to make drinks, the containers in which drinks are constructed, and other elements necessary for gameplay. 

There are three ways in which to interact with the game-
1. Moving items- In order to move items around, click on an item, which will then be transferred into your "hand" and will follow the cursor around. Next, click on a location and the item will be placed there. Valid locations that the item in hand may be moved to will be highlighted in green. Note that drag and drop will not work for moving items.

2. Combining items- Drinks are built by combining ingredients. When an item is in hand, click on another item to combine the two. For example, if a pitcher of milk is in hand, and a cup of coffee is clicked on, the milk will be added to the coffee. Valid items that the item in hand may be combined with will be highlighted in green. The item will then be updated to display what ingredients it contains.

3. Performing an action- There are parts of the interface that perform certain actions when clicked on. For example, clicking the pump on a syrup bottle will cause syrup to be dispensed into a cup below it.

### Playing a game:
To begin a game, click the Start button in the upper left corner. This begins the timer, and randomly generated drink orders will begin to flow in on the left side. Build the drinks as instructed, take the finished drink in your hand, and click on the appropriate order to send it out and finish the order. Drinks may be built in any order, but if the list of orders builds up and reaches the bottom, the game will end.

### Drink Ingredient Reference:
All drinks begin with a cup taken from the storage area.

Coffee: Always contains coffee, dispensed from brewer. May contain milk (steamed or cold, 2% or whole) or half and half.
Espresso: Always contains espresso shot, may contain syrup.
Cappuccino: Always contains espresso shot, frothed milk (2% or whole). May contain syrup.
Latte: Always contains espresso shot, steamed milk (2% or whole). May contain vanilla or caramel syrup.
Mocha: Always contains espresso shot, steamed milk (2% or whole), and mocha syrup.

To steam or froth milk, grab the milk from the fridge, pour it into the milk pitcher, place the pitcher under a steam wand on the espresso machine, and click the appropriate steam or froth button.

## Program Details:
Coffee Shop Simulator uses React to power its user interface. The various sections of the barista station are separate React components, each with their own state. When a game item is placed at a component, the state stores the data of that item, including the type, ingredients within, etc. When an item needs to be moved, that item data is transferred into the game's "in-hand" state, then into the state of the new location.

User profiles are authenticated using Auth0, and user data stored within a MongoDB. Currently, only high scores are stored.

## Credits:
Art assets created by Gwen Dalmacio: https://kgdalmacio.portfoliobox.net
