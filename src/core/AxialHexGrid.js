/****
 *  NEEDS TO BE RE-DOCUMENTED
 */

var Node = require('./Node');
/**
 * The Grid class, which serves as the encapsulation of the layout of the nodes.
 * @constructor
 * @param {number} width Number of columns of the grid.
 * @param {number} height Number of rows of the grid.
 * @param {Array.<Array.<(number|boolean)>>} [matrix] - A 0-1 matrix
 *     representing the walkable status of the nodes(0 or false for walkable).
 *     If the matrix is not supplied, all the nodes will be walkable.  */
function AxialHexGrid(hashMap) {
    /**
     * A hash of nodes.
     */
    this.nodes = this._buildNodes(hashMap);
}

/**
 * Build and return the nodes.
 * @private
 * @param {number} width
 * @param {number} height
 * @param {Array.<Array.<number|boolean>>} [matrix] - A 0-1 matrix representing
 *     the walkable status of the nodes.
 * @see Grid
 */
AxialHexGrid.prototype._buildNodes = function(hashMap) {
    var nodes = {};

    for (var key in hashMap) {
        var val = hashMap[key];
        var split = key.split(',');

        // 0, false, null will be un-walkable
        // while others will be walkable
        nodes[key] = new Node(Number(split[0]), Number(split[1]), !!val);
    }

    return nodes;
};

var toKey = function (x, y) {
    return x + ',' + y;
};

AxialHexGrid.prototype.getNodeAt = function(x, y) {
    return this.nodes[toKey(x,y)];
};


/**
 * Determine whether the node at the given position is walkable.
 * (Also returns false if the position is outside the grid.)
 * @param {number} x - The x coordinate of the node.
 * @param {number} y - The y coordinate of the node.
 * @return {boolean} - The walkability of the node.
 */
AxialHexGrid.prototype.isWalkableAt = function(x, y) {
    var node = this.getNodeAt(x, y);
    if (!node) {
        return false;
    } else {
        return node.walkable;
    }
};


/**
 * Set whether the node on the given position is walkable.
 * NOTE: throws exception if the coordinate is not inside the grid.
 * @param {number} x - The x coordinate of the node.
 * @param {number} y - The y coordinate of the node.
 * @param {boolean} walkable - Whether the position is walkable.
 */
AxialHexGrid.prototype.setWalkableAt = function(x, y, walkable) {
    var key = x+','+y;
    if (this.nodes[key]) {
        this.nodes[key].walkable = walkable;
    } else {
        this.nodes[key] = new Node(x, y, walkable);
    }
};


/**
 * Get the neighbors of the given node.
 *
 *     offsets      diagonalOffsets:
 *  +---+---+---+    +---+---+---+
 *  |   | 0 |   |    | 0 |   | 1 |
 *  +---+---+---+    +---+---+---+
 *  | 3 |   | 1 |    |   |   |   |
 *  +---+---+---+    +---+---+---+
 *  |   | 2 |   |    | 3 |   | 2 |
 *  +---+---+---+    +---+---+---+
 *
 *  When allowDiagonal is true, if offsets[i] is valid, then
 *  diagonalOffsets[i] and
 *  diagonalOffsets[(i + 1) % 4] is valid.
 * @param {Node} node
 * @param {DiagonalMovement} diagonalMovement
 */
AxialHexGrid.prototype.getNeighbors = function(node, diagonalMovement) {
    var x = node.x,
        y = node.y,
        neighbors = [],
        nodes = this.nodes;

    // ↖
    if (this.isWalkableAt(x, y - 1)) {
        neighbors.push(nodes[toKey(x, y-1)]);
    }
    // ↗
    if (this.isWalkableAt(x + 1, y - 1)) {
        neighbors.push(nodes[toKey(x+1,y-1)]);
    }
    // →
    if (this.isWalkableAt(x + 1, y)) {
        neighbors.push(nodes[toKey(x+1,y)]);
    }
    // ↘
    if (this.isWalkableAt(x, y + 1)) {
        neighbors.push(nodes[toKey(x,y+1)]);
    }
    // ↙
    if (this.isWalkableAt(x - 1, y + 1)) {
        neighbors.push(nodes[toKey(x-1,y+1)]);
    }
    // ←
    if (this.isWalkableAt(x - 1, y)) {
        neighbors.push(nodes[toKey(x-1,y)]);
    }

    return neighbors;
};


/**
 * Get a clone of this grid.
 * @return {Grid} Cloned grid.
 */
AxialHexGrid.prototype.clone = function() {
    var thisNodes = this.nodes,
        newHashMap = {},
        newGrid,
        key;

    for (i = 0; i < height; ++i) {
        newNodes[i] = new Array(width);
        for (j = 0; j < width; ++j) {
            newNodes[i][j] = new Node(j, i, thisNodes[i][j].walkable);
        }
    }

    for (key in thisNodes) {
        var node = thisNodes[key];
        newHashMap[toKey(node.x, node.y)] = new Node(node.x, node.y, node.walkable);
    }

    newGrid = new AxialHexGrid(newHashMap);

    return newGrid;
};

module.exports = AxialHexGrid;
