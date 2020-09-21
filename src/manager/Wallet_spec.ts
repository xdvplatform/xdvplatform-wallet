import { WalletManager, CEAWalletManager } from './';
describe("#wallet", function () {
  let walletManager: WalletManager;

  before(async function () {

  });

  it("when adding a password for a new wallet, should create a keystore", async function () {
    const wallet = new Wallet();
    await wallet.createWallet('123password',    Promise.resolve('123password'))
    expect(!!wallet.id).equal(true);
  });
});
