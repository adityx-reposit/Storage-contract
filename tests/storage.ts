import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { StorageContractAnchor } from "../target/types/storage_contract_anchor";
import { assert } from "chai";

describe("storage_contract_anchor", () => {
  anchor.setProvider(anchor.AnchorProvider.env());
  const provider = anchor.getProvider();
  const program = anchor.workspace.StorageContractAnchor as Program<StorageContractAnchor>;

  it("Is initialized!", async () => {
    const dataAccount = anchor.web3.Keypair.generate();
    const payer = anchor.web3.Keypair.generate();

    // Fund the payer
    const airdrop_txn = await provider.connection.requestAirdrop(
      payer.publicKey,
      10_000_000_000
    );
    await provider.connection.confirmTransaction(airdrop_txn);

    // Call initialize
    const tx = await program.methods
      .initialize("Aditya")
      .accounts({
        data_account: dataAccount.publicKey,
        payer: payer.publicKey,
        system_program: anchor.web3.SystemProgram.programId,
      })
      .signers([payer, dataAccount])
      .rpc();

    console.log("Your transaction signature", tx);

    // Fetch account data
    const dataAccountInfo = await program.account.nameAccount.fetch(dataAccount.publicKey);
    assert.equal(dataAccountInfo.name, "Aditya");
  });
});
