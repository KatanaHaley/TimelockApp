const MyTimelock = artifacts.require('MyTimelock.sol');
const HotToken = artifacts.require('HotToken.sol');

function tokens(n) {
  return web3.utils.toWei(n, 'ether');
}


contract('MyTimelock', (accounts) => {
  let mytimelock;
  let creator;
  let owner;

    before(async () => {
        creator = accounts[0];
        owner = accounts[1];
        other = accounts[2];
        token = await HotToken.new(owner, other);
        mytimelock = await MyTimelock.new(owner, other);
    });



    it("Allows owner to withdraw the funds after the unlock date", async () => {
      
    let mytimelock = await MyTimelock.new(creator, owner);
    const etherAmount = web3.utils.toWei('1');
    const tokenAmount = web3.utils.toWei('1');

    await web3.eth.sendTransaction({
      from: owner,
      to: mytimelock.address,
      value: etherAmount 
    });

    await token.approve(mytimelock.address, tokenAmount); 
    await mytimelock.deposit(token.address, tokenAmount);
    contractEtherBalance = await web3.eth.getBalance(mytimelock.address);
    contractTokenBalance = await token.balanceOf(mytimelock.address); 
    assert(contractEtherBalance.toString() === etherAmount);
    assert(contractTokenBalance.toString() === tokenAmount);


    });
  });
