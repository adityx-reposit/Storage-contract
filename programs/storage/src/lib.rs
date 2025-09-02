use anchor_lang::prelude::*;

declare_id!("HRh96MagtAUwv3bmf2waNEAR2X1TxyKsjxDdCJx87gGy");

#[program]
pub mod storage_contract_anchor {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>, name: String) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        ctx.accounts.data_account.name = name;
        Ok(())
    }

    pub fn update(ctx: Context<Update>, name: String) -> Result<()> {
        ctx.accounts.data_account.name = name;
        Ok(())
    }
}

#[account]
pub struct NameAccount {
    pub name: String,
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = payer, space = 8 + 4 + 200)]
    pub data_account: Account<'info, NameAccount>,
    #[account(mut)]
    pub payer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Update<'info> {
    #[account(mut)]
    pub data_account: Account<'info, NameAccount>,
    // Optional: only needed if you want an updater signer
    pub payer: Signer<'info>,
}
