var PF = require('..');

describe('Hex', function () {
    describe('AStarFinder', function() {
        var size = 3
        var hexGrid;

        beforeEach(function() {
            var hashMap = {};
            var x, y;
            for (x=-size;x<=size;x++) {
                for (y=-size;y<=size;y++) {
                    hashMap[x+','+y] = true;
                }
            }

            hexGrid = new PF.AxialHexGrid(hashMap);
        });

        it('should path in a straight line from top-left to bottom-right', function() {
            var startPoint = {x: 0, y: -size},
                endPoint = {x: 0, y: size};

            var expectedLength = 2 * size + 1;

            var finder = new PF.AStarFinder({
                dontPassDeltasToHeuristic: true,
                heuristic: PF.Heuristic.hexManhattan
            });

            var path = finder.findPath(startPoint.x, startPoint.y, endPoint.x, endPoint.y, hexGrid);
            path.length.should.eql(expectedLength);
        });

        it('should path in a straight line from bottom-left to top-right', function() {
            var startPoint = {x: -size, y: size},
                endPoint = {x: size, y: -size};

            var expectedLength = 2 * size + 1;

            var finder = new PF.AStarFinder({
                dontPassDeltasToHeuristic: true,
                heuristic: PF.Heuristic.hexManhattan
            });

            var path = finder.findPath(startPoint.x, startPoint.y, endPoint.x, endPoint.y, hexGrid);
            path.length.should.eql(expectedLength);
        });

        it('should path in a straight line from left to right', function() {
            var startPoint = {x: -size, y: 0},
                endPoint = {x: size, y: 0};

            var expectedLength = 2 * size + 1;

            var finder = new PF.AStarFinder({
                dontPassDeltasToHeuristic: true,
                heuristic: PF.Heuristic.hexManhattan
            });

            var path = finder.findPath(startPoint.x, startPoint.y, endPoint.x, endPoint.y, hexGrid);
            path.length.should.eql(expectedLength);
        });
    });
});
