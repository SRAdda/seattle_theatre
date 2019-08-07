const expect = require("chai").expect;
//var show = require("../lib/show")

const validatePassword = (password) => {
    return (password.toLowerCase() != password);
};

describe("Password validation", () => {
    it("passes if mixed case", function() {
        var result = validatePassword("abcDef");
        expect(result).to.be.true;
    });
    it("fails if all lower case", function() {
        var result = validatePassword("abcdef");
        expect(result).to.be.false;
    });
});