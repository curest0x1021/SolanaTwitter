import { useAnchorWallet } from "@solana/wallet-adapter-react";
import Link from "next/link";
import { TagType } from "../models";

interface TagListProps {
  tags: TagType[];
  loading: boolean;
}

export default function TagList(props: TagListProps) {
  const { tags, loading } = props;
  const wallet = useAnchorWallet();

  return (
    <>
      {wallet ? (
        loading ? (
          <div className="p-8 text-center text-gray-500">Loading...</div>
        ) : (
          <div className="flex flex-wrap m-4">
            {tags.map((tag, i) => (
              <TagBadge key={i} tag={tag} />
            ))}
          </div>
        )
      ) : (
        <div className="border-b bg-gray-50 px-8 py-4 text-center text-gray-500">
          Connect your wallet to start tweeting...
        </div>
      )}
    </>
  );
}

function TagBadge({ tag }: { tag: TagType }) {
  return (
    <div className="border border-solid border-sky-500 rounded-full mb-2 mr-2">
      <Link href={`/tags/${tag.tag}`}>
        <a className="text-primary-500 text-sm hover:underline px-2 py-0">
          {`#${tag.tag}`}
          <span className="text-gray-700 ml-2">{tag.count}</span>
        </a>
      </Link>
    </div>
  );
}
