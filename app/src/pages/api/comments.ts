import { utils, web3 } from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";
import { Comment } from "../../models/Comment";
import { getWorkspace, notify, sleep, toCollapse } from "../../utils";
import { fetchUsersAlias, getUserAlias } from "./alias";

export const sendComment = async (tweet: PublicKey, content: string) => {
  const workspace = getWorkspace();
  if (!workspace) return;
  const { program, wallet } = workspace;
  const comment = web3.Keypair.generate();

  try {
    await program.methods
      .sendComment(tweet, content, null)
      .accounts({
        comment: comment.publicKey,
        user: wallet.publicKey,
        systemProgram: web3.SystemProgram.programId,
      })
      .signers([comment])
      .rpc();

    notify("Your comment was sent successfully!", "success");
    sleep(2000);
    const commentAccount = await program.account.comment.fetch(
      comment.publicKey
    );
    const alias = await getUserAlias(commentAccount.user as PublicKey);
    return new Comment(comment.publicKey, commentAccount, alias);
  } catch (err) {
    console.error(err);
    // @ts-ignore
    notify(err.toString(), "error");
    return;
  }
};

export const updateComment = async (commentKey: PublicKey, content: string) => {
  const workspace = getWorkspace();
  if (!workspace) return;
  const { program, wallet } = workspace;

  try {
    await program.methods
      .updateComment(content)
      .accounts({
        comment: commentKey,
        user: wallet.publicKey,
      })
      .rpc();

    notify("Your comment was updated successfully!", "success");
  } catch (err) {
    console.error(err);
    // @ts-ignore
    notify(err.toString(), "error");
  }
};

export const deleteComment = async (commentKey: PublicKey) => {
  const workspace = getWorkspace();
  if (!workspace) return;
  const { program, wallet } = workspace;

  try {
    await program.methods
      .deleteComment()
      .accounts({
        comment: commentKey,
        user: wallet.publicKey,
      })
      .rpc();

    notify("Your comment was deleted successfully!", "success");
  } catch (err) {
    console.error(err);
    // @ts-ignore
    notify(err.toString(), "error");
  }
};

export const fetchComments = async (filters: any[]) => {
  const workspace = getWorkspace();
  if (!workspace) return [];
  const { program } = workspace;

  const comments = await program.account.comment.all(filters);
  const aliasObj = await fetchUsersAlias();
  const allComments = comments.map((comment) => {
    // @ts-ignore
    const userKey: PublicKey = comment.account.user;
    const [aliasPDA, _] = PublicKey.findProgramAddressSync(
      [utils.bytes.utf8.encode("user_alias"), userKey.toBuffer()],
      program.programId
    );
    const alias = aliasObj[aliasPDA.toBase58()] || toCollapse(userKey);
    return new Comment(comment.publicKey, comment.account, alias);
  });

  return allComments.sort((a, b) => b.timestamp - a.timestamp);

  // type commentProps = {
  //   [key: string]: [Comment];
  // };

  // const result = allComments.reduce((acc: commentProps, item: Comment) => {
  //   if (acc[item.key]) {
  //     acc[item.key].push(item);
  //   } else {
  //     acc[item.key] = [item];
  //   }
  //   return acc;
  // }, {});

  // return result;
};

export const commentTweetFilter = (tweetKey: string) => ({
  memcmp: {
    offset: 8 + 32, // discriminator(8) + user(32),
    bytes: tweetKey,
  },
});