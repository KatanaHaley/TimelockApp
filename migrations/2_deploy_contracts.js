const MyTimelock = artifacts.require("MyTimelock");
const HotToken = artifacts.require("HotToken");
const Contribution = artifacts.require("Contribution");


module.exports = async function(deployer, network, accounts) {
    await deployer.deploy(HotToken);
    const hotToken = await HotToken.deployed()

    await deployer.deploy(MyTimelock);
    const myTimelock = await MyTimelock.deployed(owner)


    await deployer.deploy(myTimelock, Contribution.address, hotToken.address);

    await hotToken.transfer(contribution.address, '1000000000000000000000000')

    await hotToken.transfer(accounts[0], '1000000000000000000000000')

};
