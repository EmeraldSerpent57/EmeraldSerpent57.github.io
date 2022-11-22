let grid = {
    rows: [],
    cols: [],
    rowCount: 4,
    colCount: 4
    //basic 4X4 grid with empty arrays representing rows and columns
};


//this will randomize a 4x4 array and populate with 0's and 1's
let randomizedGrid = new Array(4).fill([]).map(x => Array(4).fill(0).map(x => x + Math.floor(Math.random() * (2 - 0)) + 0));
console.log(randomizedGrid);

//alive is 1, dead is 0
/* 
take a grid of random cells
iterate over each cell
gets alive neighbor count
then it returns the new value of the cell: alive or dead
*/
function getNextGen({
    grid   
}) {
    console.table(randomizedGrid);
    console.log(`Length of randomizdGrid is ${randomizedGrid.length}`)

    let aliveOrDeadCellsArray = [];
    for (let i = 0; i < randomizedGrid.length; i++) {
        let rowOrColumn = randomizedGrid[i];
       // console.log(`rowOrColumn Array ${rowOrColumn}`);  
    for (let j = 0; j < rowOrColumn.length; j++) {
        let cell = rowOrColumn[j];
        console.log(`This is the cell being assessed: ${cell} `);
        
    //variables to find value of each neighbor for any given cell 
        let cellToTheLeft = rowOrColumn[j - 1];
        let cellToTheRight = rowOrColumn[j + 1];
        let cellOnTop = randomizedGrid?.[i - 1]?.[j];
        let cellOnBottom = randomizedGrid?.[i + 1]?.[j];
        let cellTopLeft = randomizedGrid?.[i - 1]?.[j - 1];
        let cellTopRight = randomizedGrid?.[i - 1]?.[j + 1];
        let cellBottomLeft = randomizedGrid?.[i + 1]?.[j - 1];
        let cellBottomRight = randomizedGrid?.[i + 1]?.[j + 1];
         
        let aliveNeighborCount = getAliveNeighborCount({
            neighbors: [
                cellToTheLeft,
                cellToTheRight,
                cellOnTop,
                cellOnBottom,
                cellTopLeft,
                cellTopRight,
                cellBottomLeft,
                cellBottomRight
            ]
        });
        
       console.log(`aliveNeighborCount: ${aliveNeighborCount}`); 
    
    function aliveOrDead() {     
        //rule 1: any live cell with fewer than two neighbors dies from underpopulation
        if (cell && aliveNeighborCount < 2) {
            cell = 0;
            return 0;
            console.log('This cell is dead :(');
        //rule 2: any live cell with 2-3 live neighbors lives on
        } else if (cell && (aliveNeighborCount === 2 || aliveNeighborCount === 3)) {
            cell = 1;
            return 1;
            console.log('This cell lives!');
        //rule 3: any live cell with more than 3 neighbors dies from overpopulation
        } else if (cell && aliveNeighborCount > 3) {
            cell = 0;
            return 0;
            console.log('This cell dies from overpopulation :(');
        //rule 4: any dead cell with exactly 3 neighbors becomes alive
        } else if (cell === 0 && aliveNeighborCount === 3) {
            cell = 1;
            return 1;
            console.log('This cell becomes alive!');
        } else {
            return 0;
            console.log('This cell is dead :(');
            };
        } 
       //  aliveOrDead();
        console.log(`Is this cell alive or dead: ${aliveOrDead(cell)}`);
    /*    let nextGenCells = randomizedGrid.map(function(row) {
            return row.map(function(cell) {
                    return aliveOrDead(cell);
                })
        }) */
      let nextGenCells = Array.from(randomizedGrid, aliveOrDead);    //expecting 16 cell values in array and only getting 1
      console.log(nextGenCells);
        }
    }
};

getNextGen();

/* function getNextGen() {
    //get the current generation
    //array to hold values of new gen
    //loop over current gen to get each cell value for new gen
    //utilize aliveOrDead to see if it is dead or alive in next gen
    //
}; */

function getAliveNeighborCount({
    neighbors
}) {
    const count = neighbors.reduce((currentCount, neighbor) => {
        if (neighbor) {
            currentCount += 1;
        }
        return currentCount;
    }, 0)
    //console.log(count);
    return count;
};

//seems to be on the right track, but not returning the values from the function above, just returning the original array followed by an empty array

/*  function tick(grid) {
    //take everything from 17-67 and put within this function, should be able to pass any grid in to this function and process the next tick. should return a grid which is the next gen. should be able to pass grid2 or grid 3 also. 
    
};

let nextGeneration = tick(grid2);

console.log(nextGeneration); */

