use anchor_lang::prelude::*;

#[account]
pub struct Comment {
    pub user: Pubkey,
    pub tweet: Pubkey,  // Pubkey of commented tweet
    pub parent: Pubkey, // Pubkey of parent, might be another comment or the commented tweet
    pub timestamp: i64,
    pub state: Option<CommentState>,
    pub content: String
}

#[derive(Accounts)]
pub struct SendComment<'info> {
    // space: 8 discriminator + 32 user + 32 tweet + 32 parent + 8 timestamp + 1 state + (4 prefix + 280 * 4) content
    #[account(init, payer = user, space = 8 + 32 + 32 + 32 + 8 + 1 + (4 + 280 * 4))]
    pub comment: Account<'info, Comment>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdateComment<'info> {
    #[account(mut, has_one = user)]
    pub comment: Account<'info, Comment>,
    pub user: Signer<'info>,
}

#[derive(Accounts)]
pub struct DeleteComment<'info> {
    #[account(mut, has_one = user)]
    pub comment: Account<'info, Comment>,
    pub user: Signer<'info>,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq)]
pub enum CommentState {
	Edited,
	Deleted,
}
