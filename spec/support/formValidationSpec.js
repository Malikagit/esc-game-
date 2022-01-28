const { validateEmail } = require("../../public/js/formValidation");
describe("Testing validateEmail", function () {
    it("checks the email contains an at sign", function () {
        expect(validateEmail("hello.com")).toBe(false);
    });
    it("checks there’s a domain name", function () {
        expect(validateEmail("hello@")).toBe(false);
    });
});