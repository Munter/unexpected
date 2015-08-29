describe('benchmark', function () {
    var expect = unexpected.clone();
    function asyncTestFunction(cb) {
        setTimeout(function () {
            cb();
        }, 0);
    }

    describe('to be', function () {
        it('on numbers', function () {
            expect(42, "to be", 42);
        });

        it('on strings', function () {
            expect(42, "to be", 42);
        });

        it('on same object', function () {
            var obj = { label: 'this is an object', list: [ 0, 1, 2]};
            expect(obj, "to be", obj);
        });
    });

    describe('to equal', function () {
        it('on numbers', function () {
            expect(42, "to equal", 42);
        });

        it('on strings', function () {
            expect("foo", "to equal", "foo");
        });

        it('on objects', function () {
            expect({ label: 'this is an object', list: [ 0, 1, 2]},
                   "to equal",
                   { label: 'this is an object', list: [ 0, 1, 2]});
        });

        it('on same object', function () {
            var obj = { label: 'this is an object', list: [ 0, 1, 2]};
            expect(obj, "to equal", obj);
        });
    });

    describe('to satisfy', function () {
        it('on objects', function () {
            expect({ label: 'this is an object', list: [ 0, 1, 2]},
                   "to satisfy",
                   { label: /object/, list: { 0: 0 }});
        });
    });

    it('to call the callback async', function () {
        return expect(asyncTestFunction, 'to call the callback');
    });
});
