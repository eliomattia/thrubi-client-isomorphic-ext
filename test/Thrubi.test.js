const Thrubi = artifacts.require("../contracts/Thrubi.sol");

contract("Thrubi", (accounts) => {
    before(async () => {
        this.thrubi = await Thrubi.deployed();
    });

    it("deploys successfully", async () => {
        const address = await this.thrubi.address;
        assert.notEqual(address, 0x0);
        assert.notEqual(address, "");
        assert.notEqual(address, null);
        assert.notEqual(address, undefined);
    });

    it("lists users", async () => {
        const userCount = await this.thrubi.userCount();
        const user = await this.thrubi.users(userCount);
        assert.equal(user.id.toNumber(), userCount.toNumber());
        assert.equal(user.name, "test");
        assert.equal(user.surname, "TEST");
        assert.equal(userCount.toNumber(), 1);
    });

    it("creates users", async () => {
        const address = await this.thrubi.address;
        const result = await this.thrubi.createUser(address,"test2","TEST2");
        const userCount = await this.thrubi.userCount();
        assert.equal(userCount, 2);
        const event = result.logs[0].args;
        assert.equal(event.id.toNumber(), 2);
        assert.equal(event.name, "test2");
        assert.equal(event.surname, "TEST2");
    });

    it("activates users", async () => {
        const result = await this.thrubi.activateUser(1);
        const user = await this.thrubi.users(1);
        assert.equal(user.deactivated, false);
        const event = result.logs[0].args;
        assert.equal(event.id.toNumber(), 1);
        assert.equal(event.deactivated, false);
    });

    it("deactivates users", async () => {
        const result = await this.thrubi.deactivateUser(1);
        const user = await this.thrubi.users(1);
        assert.equal(user.deactivated, true);
        const event = result.logs[0].args;
        assert.equal(event.id.toNumber(), 1);
        assert.equal(event.deactivated, true);
    });

});