import * as anchor from "@project-serum/anchor";
import { Keypair, PublicKey } from "@solana/web3.js";
import * as assert from "assert";
import { program, user } from "../tests";
import { sendTweet } from "./1-tweets";

export const sendComment = async ({user, tweetParent, content, directParent}: {user: any, tweetParent: PublicKey, content: string, directParent: PublicKey}) => {
  const commentKeypair = Keypair.generate();

  await program.methods.sendComment(tweetParent, content, directParent)
    .accounts({
      comment: commentKeypair.publicKey,
      user: user.publicKey,
      systemProgram: anchor.web3.SystemProgram.programId,
    })
    .signers(user instanceof (anchor.Wallet) ? [commentKeypair] : [user, commentKeypair])
    .rpc();

  const comment = await program.account.comment.fetch(commentKeypair.publicKey);
  return { publickey: commentKeypair.publicKey, account: comment };
}

describe("comments", () => {
  it("can send and update comment", async () => {
    const tweet = await sendTweet(user, "comment", "on me!");

    // send comment
    const tweetComment = await sendComment({user, tweetParent: tweet.publickey, content: "Hi", directParent: null});
    assert.equal(tweetComment.account.tweet.toBase58(), tweet.publickey.toBase58());

    // update comment
    await program.methods.updateComment("Hello")
      .accounts({ comment: tweetComment.publickey, user: user.publicKey })
      .rpc();
    const updatedTweetComment = await program.account.comment.fetch(tweetComment.publickey);
    assert.equal(updatedTweetComment.content, "Hello");
    assert.deepEqual(updatedTweetComment.state, { edited: {} });
    
    // Comment on a comment
    const commentComment = await sendComment({ user, tweetParent: tweet.publickey, content: "Good morning", directParent: tweetComment.publickey });
    assert.equal(commentComment.account.tweet.toBase58(), tweet.publickey.toBase58());
    assert.equal(commentComment.account.parent.toBase58(), tweetComment.publickey.toBase58());
  });

  it("can delete the comment", async () => {
    const tweet = await sendTweet(user, "comment", "on me!");

    // send comment
    const tweetComment = await sendComment({ user, tweetParent: tweet.publickey, content: "oops", directParent: null });
    assert.equal(tweetComment.account.tweet.toBase58(), tweet.publickey.toBase58());

    // delete comment
    await program.methods.deleteComment()
      .accounts({ comment: tweetComment.publickey, user: user.publicKey })
      .rpc();
    
    const deletedComment = await program.account.comment.fetch(tweetComment.publickey);
    assert.equal(deletedComment.content, "");
    assert.deepEqual(deletedComment.state, { deleted: {} });
  });
});
