📦 Storage Contract (Anchor + Solana)

This is a simple Solana program written with the Anchor framework
 that demonstrates how to initialize and update on-chain accounts.

It creates a NameAccount on Solana, stores a string (name), and allows updating it later.

✨ Features

Initialize a new account with a string (name)

Update the stored string


📂 Program Structure
Program ID
declare_id!("HRh96MagtAUwv3bmf2waNEAR2X1TxyKsjxDdCJx87gGy");

Instructions

Initialize

pub fn initialize(ctx: Context<Initialize>, name: String) -> Result<()>


Creates a new NameAccount on-chain

Stores the provided name

Update

pub fn update(ctx: Context<Update>, name: String) -> Result<()>


Updates the stored name in the existing account

Account
#[account]
pub struct NameAccount {
    pub name: String,
}

⚡ Quick Start
1. Install Dependencies
# Anchor + Solana CLI (if not installed)
cargo install --git https://github.com/coral-xyz/anchor avm --locked
avm install latest
avm use latest

# Install JS deps
npm install

2. Build the Program
anchor build

3. Deploy to Local Validator

Start a local Solana validator:

solana-test-validator


Deploy the program:

anchor deploy

4. Run Tests
anchor test

🧪 Example Test

The test airdrops SOL to a new payer, initializes a NameAccount with "Aditya", and verifies it:

it("Is initialized!", async () => {
  const dataAccount = anchor.web3.Keypair.generate();
  const payer = anchor.web3.Keypair.generate();

  await provider.connection.confirmTransaction(
    await provider.connection.requestAirdrop(payer.publicKey, 10_000_000_000)
  );

  await program.methods
    .initialize("Aditya")
    .accounts({
      data_account: dataAccount.publicKey,
      payer: payer.publicKey,
      system_program: anchor.web3.SystemProgram.programId,
    })
    .signers([payer, dataAccount])
    .rpc();

  const dataAccountInfo = await program.account.nameAccount.fetch(dataAccount.publicKey);
  assert.equal(dataAccountInfo.name, "Aditya");
});

📌 Notes

The account size is defined as:

8 (discriminator) + 4 (string length prefix) + 200 (max chars)


Adjust 200 if you want to allow longer names.

The update instruction currently allows any signer to update the account.
If you want only the original creator to update, store their Pubkey in the account and enforce it.
