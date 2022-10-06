import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Tweet } from "../../models";
import { getWorkspace, initWorkspace, useSlug } from "../../utils";
import { tagIcon } from "../../assets/icons";
import Search from "../../templates/Search";
import TweetForm from "../../components/TweetForm";
import TweetList from "../../components/TweetList";
import { paginateTweets, tagFilter } from "../api/tweets";
import {
  useAnchorWallet,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";

export default function Tags() {
  const router = useRouter();
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [tag, setTag] = useState<string>(router.query.tag as string);
  const [viewedTag, setViewedTag] = useState<string>();
  const [pagination, setPagination] = useState<any>();
  const [hasMore, setHasMore] = useState(false);

  let workspace = getWorkspace();
  const wallet = useAnchorWallet();
  const { connection } = useConnection();
  const { connected } = useWallet();

  const slugTag = useSlug(tag);

  const onNewPage = (newTweets: Tweet[], more: boolean) => {
    setTweets((prev) => [...prev, ...newTweets]);
    setHasMore(more);
  };

  const search = () => {
    router.push(`/tags/${slugTag}`);
  };

  const addTweet = (tweet: Tweet) => setTweets([tweet, ...tweets]);

  useEffect(() => {
    if (wallet && connected && slugTag) {
      if (!workspace) {
        initWorkspace(wallet, connection);
      }
      if (slugTag === viewedTag) return;
      setTweets([]);
      setViewedTag(slugTag);
      const filters = [tagFilter(slugTag)];
      const newPagination = paginateTweets(filters, 10, onNewPage);
      setPagination(newPagination);
    } else {
      setPagination(null);
      setTweets([]);
      setViewedTag("");
    }
  }, [wallet, connected, slugTag, workspace, viewedTag, connection]);

  useEffect(() => {
    if (pagination) {
      pagination.prefetch().then(pagination.getNextPage);
    }
  }, [pagination]);

  return (
    <Search
      icon={tagIcon}
      placeholder="tag"
      disabled={!slugTag}
      modelValue={slugTag}
      setModelValue={setTag}
      search={search}
    >
      <TweetForm added={addTweet} forceTag={viewedTag} />
      {pagination && (
        <TweetList
          tweets={tweets}
          loading={pagination.loading}
          hasMore={hasMore}
          loadMore={pagination.getNextPage}
        />
      )}
      {pagination && !pagination.loading && tweets.length === 0 && (
        <div className="p-8 text-center text-gray-500">
          No tweets were found in this tag...
        </div>
      )}
    </Search>
  );
}