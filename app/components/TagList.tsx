import Link from "next/link";
import { TagType } from "../models";

interface TagListProps {
  tags: TagType[];
  loading: boolean;
}

export default function TagList(props: TagListProps) {
  const { tags, loading } = props;

  return (
    <>
      {loading ? (
        <div className="p-8 text-center text-gray-500">Loading...</div>
      ) : (
        <div className="flex flex-wrap m-4">
          {tags.map((tag, i) => (
            <TagBadge key={i} tag={tag} />
          ))}
        </div>
      )}
    </>
  );
}

function TagBadge({
  key,
  tag,
}: {
  key: number;
  tag: TagType;
}) {
  return (
    <div
      key={key}
      className="border border-solid border-sky-500 rounded-full mb-2 mr-2"
    >
      <Link href={`/tags/${tag.tag}`}>
        <a className="text-primary-500 text-sm hover:underline px-2 py-0">
          {`#${tag.tag}`}
          <span className="text-gray-700 ml-2">{tag.count}</span>
        </a>
      </Link>
    </div>
  );
}
