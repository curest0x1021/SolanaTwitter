import { PublicKey } from "@solana/web3.js";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import TweetCard from "../../components/TweetCard";
import { Tweet as TweetModel } from "../../models";
import Base from "../../templates/Base";
import { AliasProps } from "../api/alias";
import { deleteTweet, getTweet } from "../api/tweets";
import { fetchUsersAlias } from "../api/alias";
import { utils } from "@project-serum/anchor";
import { getWorkspace } from "../../utils";

export default function Tweet() {
  const router = useRouter();
  const [originTweet, setOriginTweet] = useState<TweetModel | null>(null);
  const [tweet, setTweet] = useState<TweetModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [usersAlias, setUsersAlias] = useState<AliasProps>({});
  const tweetAddress = router.query.tweet as string;

  const workspace = getWorkspace();

  useEffect(() => {
    fetchUsersAlias().then((value) => setUsersAlias(value));
  }, []);

  useEffect(() => {
    getTweet(new PublicKey(tweetAddress))
      .then((fetchedTweet) => setOriginTweet(fetchedTweet))
      .finally(() => setLoading(false));
  }, [tweetAddress]);

  useEffect(() => {
    if (!workspace || !originTweet) return;
    let fTweet = originTweet;
    const [aliasPDA, _] = PublicKey.findProgramAddressSync(
      [utils.bytes.utf8.encode("user-alias"), fTweet.user.toBuffer()],
      workspace.program.programId
    );
    if (usersAlias[aliasPDA.toBase58()]) {
      fTweet.user_display = usersAlias[aliasPDA.toBase58()];
    }
    fTweet.comments.map((comment) => {
      const [aPDA, _] = PublicKey.findProgramAddressSync(
        [utils.bytes.utf8.encode("user-alias"), comment.user.toBuffer()],
        workspace.program.programId
      );
      if (usersAlias[aPDA.toBase58()]) {
        comment.user_display = usersAlias[aPDA.toBase58()];
      }
      return comment;
    });
    setTweet(fTweet);
  }, [originTweet, usersAlias, workspace]);

  const onDelete = async (tweet: TweetModel) => {
    const result = await deleteTweet(tweet);
    if (result) {
      setTweet(null);
    }
  };

  return (
    <Base>
      <div className="flex w-full">
        <div className="mr-16 grow">
          <div className="mb-8 flex space-x-6 whitespace-nowrap border-b border-gray-300/50">
            <h2 className="-mb-px flex border-b-2 border-sky-500 pb-2.5 font-semibold leading-6">
              Tweet Details
            </h2>
          </div>
          <div className="pt-4">
            {loading ? (
              <div className="text-center text-gray-500">Loading...</div>
            ) : (
              <>
                {tweet ? (
                  <TweetCard tweet={tweet} onDelete={onDelete} />
                ) : (
                  <div className="text-center text-gray-500">
                    Tweet not found
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </Base>
  );
}
