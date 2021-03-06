describe("radio_button_canvas shape functions", function() {
  var canvas;
  var shape;
  
  beforeEach(function() {
    canvas = $('<div>').radio_button_canvas();
  });
  
  describe("private initialize method", function() {
    it("accept points", function() {
      shape = canvas.shape(canvas.point(2,2));
      expect(shape.points).toContainPointWithCoordinates(2,2);
    });
    it("accept an array of coordinates", function() {
      shape = canvas.shape([2,2]);
      expect(shape.points).toContainPointWithCoordinates(2,2);
    });
    it("should accept other shapes", function() {
      shape = canvas.shape(canvas.line(2,2, 4,4));
      expect(shape.points).toContainPointWithCoordinates(2,2);
      expect(shape.points).toContainPointWithCoordinates(3,3);
      expect(shape.points).toContainPointWithCoordinates(4,4);
    });
    it("should accept shapes mixed with points", function() {
      var line = canvas.line(2,2, 4,4);
      var point = canvas.point(4,5)
      shape = canvas.shape(line, point);
      expect(shape.points).toContainPointWithCoordinates(2,2);
      expect(shape.points).toContainPointWithCoordinates(3,3);
      expect(shape.points).toContainPointWithCoordinates(4,4);
      expect(shape.points).toContainPointWithCoordinates(4,5);
    });
    it("should accept shapes mixed with coordinates", function() {
      var line = canvas.line(2,2, 4,4);
      shape = canvas.shape(line, [4,5]);
      expect(shape.points).toContainPointWithCoordinates(2,2);
      expect(shape.points).toContainPointWithCoordinates(3,3);
      expect(shape.points).toContainPointWithCoordinates(4,4);
      expect(shape.points).toContainPointWithCoordinates(4,5);
    });
    it("should accept points mixed with coordinates", function() {
      shape = canvas.shape([2,2], canvas.point(3,3));
      expect(shape.points).toContainPointWithCoordinates(2,2);
      expect(shape.points).toContainPointWithCoordinates(3,3);
    });
    it("should accept shapes, points, and coordinates all mixed together", function() {
      var line = canvas.line(2,2, 4,4);
      var point = canvas.point(8,9);
      shape = canvas.shape(line, point, [11,2]);
      expect(shape.points).toContainPointWithCoordinates(2,2);
      expect(shape.points).toContainPointWithCoordinates(3,3);
      expect(shape.points).toContainPointWithCoordinates(4,4);
      expect(shape.points).toContainPointWithCoordinates(8,9);
      expect(shape.points).toContainPointWithCoordinates(11,2);
    });
    it("should silently ignore invalid arguments - empty array", function() {
      shape = canvas.shape([2,2], [3,2], [3,3], []);
      expect(shape.points.length).toEqual(3);
    });
    it("should silently ignore invalid arguments - invalid coordinate", function() {
      shape = canvas.shape([2,2], [3,2], [2,2,2]);
      expect(shape.points.length).toEqual(2);
    });
    it("should accept shapes mixed with invalid arguments", function() {
      var existing_shape = canvas.shape([2,2], [3,2]);
      shape = canvas.shape([], existing_shape)
      expect(shape.points.length).toEqual(2);
    });
  });
  
  describe("shape#points", function() {
    it("return an array containing all the points that constitute the shape", function() {
      shape = canvas.shape([2,2], [3,2], [3,3]);
      expect(shape.points).toContainPointWithCoordinates(2,2);
      expect(shape.points).toContainPointWithCoordinates(3,2);
      expect(shape.points).toContainPointWithCoordinates(3,3);
    });
    it("should return an empty array if the shape has no points", function() {
      shape = canvas.shape();
      expect(shape.points).toEqual([]);
    });
  });
  
  describe("shape#uncheck()", function() {
    it("uncheck all the points contained in the shape", function() {
      shape = canvas.shape([2,2], [3,2], [3,3]).uncheck();
      expect(canvas).not.toHaveCoordinateChecked(2,2);
      expect(canvas).not.toHaveCoordinateChecked(3,2);
      expect(canvas).not.toHaveCoordinateChecked(3,3);
    });
  });
  
  describe("shape#check()", function() {
    it("checks all the points contained in the shape", function() {
      shape = canvas.shape([2,2], [3,2], [3,3]).uncheck().check();
      expect(canvas).toHaveCoordinateChecked(2,2);
      expect(canvas).toHaveCoordinateChecked(3,2);
      expect(canvas).toHaveCoordinateChecked(3,3);
    });
  });
  
  describe("shape#includes(point)", function() {
    it("should return true if the shape includes the passed point", function() {
      var point = canvas.point(2,2);
      shape = canvas.shape([2,2], [3,2], [3,3]);
      expect(shape.includes(point)).toEqual(true);
    });
    it("should return false if the shape does not includes the passed point", function() {
      var point = canvas.point(10,10);
      shape = canvas.shape([2,2], [3,2], [3,3]);
      expect(shape.includes(point)).toEqual(false);
    });
  });
  
  describe("shape.move()", function() {
    beforeEach(function() {
      shape = canvas.shape([2,2], [3,2], [3,3]);
    });
    describe("moving in an ordinal direction", function() {
      it("should move the first point north", function() {
        expect(shape.move('north').points).toContainPointWithCoordinates(2,1);
      });
      it("should move the second point north", function() {
        expect(shape.move('north').points).toContainPointWithCoordinates(3,1);
      });
      it("should move the third point north", function() {
        expect(shape.move('north').points).toContainPointWithCoordinates(3,2);
      });
      it("should have all points checked", function() {
        $.each(shape.move('north').points, function(index, point) {
          expect(point.is_checked()).toEqual(true);
        });
      });
    });
    describe("moving with cartesian coordinates", function() {
      it("should move the first point to 3,5", function() {
        expect(shape.move(1,3).points).toContainPointWithCoordinates(3,5);
      });
      it("should move the second point to 4,5", function() {
        expect(shape.move(1,3).points).toContainPointWithCoordinates(4,5);
      });
      it("should move the third point to 4,6", function() {
        expect(shape.move(1,3).points).toContainPointWithCoordinates(4,6);
      });
      it("should have all points checked", function() {
        $.each(shape.move(1,3).points, function(index, point) {
          expect(point.is_checked()).toEqual(true);
        });
      });
    });
  });
  
  
});
