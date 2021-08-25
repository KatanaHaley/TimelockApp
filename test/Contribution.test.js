// SPDX-License-Identifier: MIT

const Contribution = artifacts.require('Contribution');
const MyTimelock = artifacts.require('MyTimelock');
const HotToken = artifacts.require('HotToken');


require('chai')
.use(require('chai-as-promised'))
.should()

function tokens(n) {
    return web3.utils.toWei(n, 'ether');
  }

contract('Contribution', ([owner, donator]) => {
    let hotToken, myTimelock, contribution;

    //before(async() => {
        //load smart contracts
         hotToken =  HotToken.new()
         myTimelock =  MyTimelock.new(owner)
         contribution =  Contribution.new(hotToken.address, owner)
        
         // Transfer all Dapp tokens to contribution contract (1 million)
          hotToken.transfer(Contribution.address, '1000000000000000000000000')
    //})

 

    
    describe('Contribution deployment', async() => {
        it('deploys the contract', async() => {
            const name = await Contribution.name()
            assert.equal(name, 'Donate')
        })
    })

//     describe('Confirmation that contract has tokens', async() => {
//     it('contract has tokens', async() => {
//         let balance = await hotToken.balanceOf(Contribution.address)
//         assert.equal(balance.toString(), tokens('1000000'))
//     })
// })
    // Checks token balance before donator deposits tokens
    // Confirms the balance decreases after deposits
    describe('Rewards tokens', async () => {

        it('rewards donators for donating', async () => {
          let result
    
          // Check donator balance before donation
          result = await hotToken.balanceOf(donator)
          assert.equal(result.toString(), tokens('100'), 'donator wallet balance correct before donation')
    
          // Donate Tokens
          await hotToken.approve(contribution.address, tokens('100'), { from: donator })
          await contribution.donateTokens(tokens('100'), { from: donator })
    
          // Check donation result
          result = await hotToken.balanceOf(donator)
          assert.equal(result.toString(), tokens('0'), 'donator wallet balance correct after donating')
    
          result = await hotToken.balanceOf(contribution.address)
          assert.equal(result.toString(), tokens('100'), 'contribution balance correct after donating')
    
          result = await contribution.donationBalance(donator)
          assert.equal(result.toString(), tokens('100'), 'donator balance correct after donating')
    
          result = await contribution.isDonating(donator)
          assert.equal(result.toString(), 'true', 'donator status correct after donating')
    
          // Issue Tokens
          await contribution.issueTokens({ from: owner })
    
          // Check balances after issuance
          result = await hotToken.balanceOf(donator)
          assert.equal(result.toString(), tokens('100'), 'donator wallet balance correct after issuance')
    
          // Ensure that only owner can issue tokens
          await contribution.issueTokens({ from: donator }).should.be.rejected;
    
          // Unstake tokens
         // await contribution.unstakeTokens({ from: donator })
    
          // Check results after unstaking
          result = await hotToken.balanceOf(donator)
          assert.equal(result.toString(), tokens('100'), 'donator wallet balance correct after donating')
    
          result = await hotToken.balanceOf(contribution.address)
          assert.equal(result.toString(), tokens('0'), 'Token balance correct after donating')
    
          result = await contribution.donationBalance(donator)
          assert.equal(result.toString(), tokens('0'), 'donator donation balance correct after donating')
    
          result = await contribution.isDonating(donator)
          assert.equal(result.toString(), 'false', 'donator donation status correct after donating')
        })
      })

})

