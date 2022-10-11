import bs58 from "bs58";
import { PublicKey } from "@solana/web3.js";
import { TagType, Tweet, UserType } from "../../models";
import { getWorkspace, notify, sleep, toCollapse } from "../../utils";
import { web3, utils } from "@project-serum/anchor";
import { getPagination } from "../../utils";
import { AliasProps, fetchUsersAlias, getUserAlias } from "./alias";
import { commentTweetFilter, fetchComments } from "./comments";
import { tweets } from ".";

export const fetchTweets = async (filters: any[] = []) => {
  const workspace = getWorkspace();
  if (!workspace) return [];
  const { program } = workspace;
  const tweets = await program.account.tweet.all(filters);
  const aliasObj = await fetchUsersAlias();
  const orderedTweets = tweets
    .map((tweet) => {
      // @ts-ignore
      const userKey: PublicKey = tweet.account.user;
      const [aliasPDA, _] = PublicKey.findProgramAddressSync(
        [utils.bytes.utf8.encode("user-alias"), userKey.toBuffer()],
        program.programId
      );
      const alias = aliasObj[aliasPDA.toBase58()] || toCollapse(userKey);
      return new Tweet(tweet.publicKey, tweet.account, alias);
    })
    .filter((tweet) => tweet.tag !== "[deleted]")
    .sort((a, b) => b.timestamp - a.timestamp);
  return orderedTweets;
};

export const paginateTweets = (
  filters: any[] = [],
  perPage = 10,
  onNewPage = (a: Tweet[], b: boolean, c: number) => {}
) => {
  const workspace = getWorkspace();
  if (!workspace) return;
  const { program, connection } = workspace;
  let page = 0;

  const prefetchCb = async () => {
    // Reset page number
    page = 0;

    // Prepare the discriminator filter
    const tweetClient = program.account.tweet;
    const tweetAccountName = "Tweet";
    const tweetDiscriminatorFilter = {
      memcmp: tweetClient.coder.accounts.memcmp(tweetAccountName),
    };

    // Prefetch all tweets with their timestamps only
    const allTweets = await connection.getProgramAccounts(program.programId, {
      filters: [tweetDiscriminatorFilter, ...filters],
      dataSlice: { offset: 40, length: 8 },
    });

    // Parse the timestamp from the account's data
    const allTweetsWithTimestamps = allTweets.map(({ account, pubkey }) => ({
      pubkey,
      timestamp: account.data.readInt32LE(),
    }));

    return allTweetsWithTimestamps
      .sort((a, b) => b.timestamp - a.timestamp)
      .map(({ pubkey }) => pubkey);
  };

  const pageCb = async (
    page: number,
    paginatedPublicKeys: PublicKey[],
    userAliasObj: AliasProps
  ) => {
    const tweets = await program.account.tweet.fetchMultiple(
      paginatedPublicKeys
    );

    return tweets
      .map((tweet, index) => {
        // @ts-ignore
        const userKey: PublicKey = tweet.user;
        const [aliasPDA, _] = PublicKey.findProgramAddressSync(
          [utils.bytes.utf8.encode("user-alias"), userKey.toBuffer()],
          program.programId
        );
        const alias = userAliasObj[aliasPDA.toBase58()] || toCollapse(userKey);
        return new Tweet(paginatedPublicKeys[index], tweet, alias);
      })
      .filter((tweet) => tweet.tag !== "[deleted]");
  };

  const pagination = getPagination(
    perPage,
    prefetchCb,
    fetchUsersAlias,
    pageCb
  );
  const { hasPage, getPage } = pagination;

  const getNextPage = async () => {
    const newPageTweets = await getPage(page + 1);

    for (let i = 0; i < newPageTweets.length; i++) {
      const filters = [commentTweetFilter(newPageTweets[i].key)];
      const comments = await fetchComments(filters);
      newPageTweets[i].comments = comments || [];
    }
    const hasNextPage = hasPage(page + 1);
    page += 1;
    onNewPage(newPageTweets, hasNextPage, page - 1);
  };

  return { page, getNextPage, ...pagination };
};

export const getTweet = async (publicKey: PublicKey) => {
  const workspace = getWorkspace();
  if (!workspace) return null;
  const { program } = workspace;
  const account = await program.account.tweet.fetch(publicKey);
  // @ts-ignore
  const userKey: PublicKey = account.user;
  const alias = await getUserAlias(userKey);
  return new Tweet(publicKey, account, alias);
};

export const sendTweet = async (tag: string, content: string) => {
  const workspace = getWorkspace();
  if (!workspace) return;

  const { wallet, program } = workspace;
  const tweet = web3.Keypair.generate();

  try {
    await program.methods
      .sendTweet(tag, content)
      .accounts({
        user: wallet.publicKey,
        tweet: tweet.publicKey,
        systemPrgram: web3.SystemProgram.programId,
      })
      .signers([tweet])
      .rpc();

    notify("Your tweet was sent successfully!", "success");
    sleep(2000);
    const tweetAccount = await program.account.tweet.fetch(tweet.publicKey);
    // @ts-ignore
    const userKey: PublicKey = tweetAccount.user;
    const alias = await getUserAlias(userKey);
    return new Tweet(tweet.publicKey, tweetAccount, alias);
  } catch (err) {
    console.error(err);
    // @ts-ignore
    notify(err.toString(), "error");
    return;
  }
};

export const updateTweet = async (
  tweet: Tweet,
  tag: string,
  content: string
) => {
  const workspace = getWorkspace();
  if (!workspace) return;
  const { wallet, program } = workspace;

  try {
    await program.methods
      .updateTweet(tag, content)
      .accounts({
        tweet: tweet.publickey,
        user: wallet.publicKey,
      })
      .rpc();

    tweet.tag = tag;
    tweet.content = content;
    notify("Your tweet was updated successfully!", "success");
  } catch (err) {
    console.error(err);
    // @ts-ignore
    notify(err.toString(), "error");
    return;
  }
};

export const deleteTweet = async (tweet: Tweet) => {
  const workspace = getWorkspace();
  if (!workspace) return false;
  const { wallet, program } = workspace;

  try {
    await program.methods
      .deleteTweet()
      .accounts({
        tweet: tweet.publickey,
        user: wallet.publicKey,
      })
      .rpc();
    notify("Your tweet was deleted successfully!", "success");
    return true;
  } catch (err) {
    console.error(err);
    // @ts-ignore
    notify(err.toString(), "error");
    return false;
  }
};

export const fetchTags = async () => {
  const workspace = getWorkspace();
  if (!workspace) return [];
  const { program, connection } = workspace;

  // Prepare the discriminator filter
  const tweetClient = program.account.tweet;
  const tweetAccountName = "Tweet";
  const tweetDiscriminatorFilter = {
    memcmp: tweetClient.coder.accounts.memcmp(tweetAccountName),
  };

  // Prefetch all tweets with their timestamp + tags only
  const allTweets = await connection.getProgramAccounts(program.programId, {
    filters: [tweetDiscriminatorFilter],
    dataSlice: { offset: 8 + 32, length: 8 + 4 + 50 * 4 },
  });

  const allTags = allTweets.map(({ pubkey, account }) => {
    const timestamp = account.data.subarray(0, 8).readInt32LE();
    const prefix = account.data.subarray(8, 8 + 4).readInt8();
    const tag = account.data.subarray(12, 12 + prefix).toString();
    return new TagType(tag, 1, pubkey, timestamp);
  });

  type tagProps = {
    [key: string]: TagType;
  };

  const tags = allTags.reduce((acc: tagProps, item: TagType) => {
    if (item.tag !== "[deleted]") {
      if (acc[item.tag]) {
        acc[item.tag].count += 1;
        if (item.timestamp > acc[item.tag].timestamp) {
          acc[item.tag].timestamp = item.timestamp;
          acc[item.tag].tweet = item.tweet;
        }
      } else {
        acc[item.tag] = item;
      }
    }
    return acc;
  }, {});

  return Object.values(tags);
};

export const fetchUsers = async () => {
  const workspace = getWorkspace();
  if (!workspace) return [];
  const { program, connection } = workspace;

  // Prepare the discriminator filter
  const tweetClient = program.account.tweet;
  const tweetAccountName = "Tweet";
  const tweetDiscriminatorFilter = {
    memcmp: tweetClient.coder.accounts.memcmp(tweetAccountName),
  };

  // Prefetch all tweets with their user + timestamp + tag only
  const allTweets = await connection.getProgramAccounts(program.programId, {
    filters: [tweetDiscriminatorFilter],
    dataSlice: { offset: 8, length: 32 + 8 + 4 + 50 * 4 },
  });

  const tweetMap = allTweets.map(({ pubkey, account }) => {
    const user = new PublicKey(account.data.subarray(0, 32));
    const timestamp = account.data.subarray(32, 32 + 8).readInt32LE();
    const prefix = account.data.subarray(40, 40 + 4).readInt8();
    const tag = account.data.subarray(44, 44 + prefix).toString();
    return new UserType(user, pubkey, tag, timestamp, 0);
  });

  type accType = {
    [key: string]: UserType;
  };

  const aliasData = await fetchUsersAlias();

  const users = tweetMap.reduce((acc: accType, item: UserType) => {
    if (item.last_tag !== "[deleted]") {
      const userKey = item.user.toBase58();
      if (acc[userKey]) {
        acc[userKey].total_posts += 1;
        if (item.last_timestamp > acc[userKey].last_timestamp) {
          acc[userKey].tweet = item.tweet;
          acc[userKey].last_timestamp = item.last_timestamp;
          acc[userKey].last_tag = item.last_tag;
        }
      } else {
        const [aliasPDA, _] = PublicKey.findProgramAddressSync(
          [utils.bytes.utf8.encode("user-alias"), item.user.toBuffer()],
          program.programId
        );
        acc[userKey] = new UserType(
          item.user,
          item.tweet,
          item.last_tag,
          item.last_timestamp,
          1,
          aliasData[aliasPDA.toBase58()]
        );
      }
    }
    return acc;
  }, {});

  const orderedUsers = Object.values(users).sort(
    (a, b) => b.total_posts - a.total_posts
  );
  return orderedUsers;
};

export const userFilter = (userBase58PublicKey: string) => ({
  memcmp: {
    offset: 8, // discriminator,
    bytes: userBase58PublicKey,
  },
});

export const tagFilter = (tag: string) => ({
  memcmp: {
    offset:
      8 + // Discriminator.
      32 + // User public key.
      8 + // Timestamp.
      4, // Tag string prefix.
    bytes: bs58.encode(Buffer.from(tag)),
  },
});
