const expect = require("chai").expect;
const show = require("../lib/show");

describe("Show module", () => {
    it("returns requested show", () => {
        const result = show.getItem("chicago");
        expect(result).to.deep.equal({title: "Chicago", venue: "Paramount Theater", price: "$$$"});
    });

    it("fails to return an w/ invalid show", () => {
        const result = show.getItem("fake");
        expect(result).to.be.undefined;
    });
    
    it("adds a new show", function() {
        const result = show.addItem({title: "oklahoma", venue: "5th avenue theater", price: "$$"});
        expect(result.added).to.be.true;
    });       

    it("fails to add an existing show", () => {
        const result = show.addItem({title: "chicago", venue: "paramount", price: "$$$"});
    });    

    it("deletes an existing show", () => {
        const result = show.deleteItem("chicago");
        expect(result).to.be.true;
    });

    it("fails to delete an invalid show", () => {
        const result = show.deleteItem("summerset");
        expect(result).to.be.false;
    });
});