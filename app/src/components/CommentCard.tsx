import Image from "next/image";
import Link from "next/link";
import { Comment } from "../models/Comment";
import { getWorkspace } from "../utils";

export default function CommentCard({ comment }: { comment: Comment }) {
  // @ts-ignore
  const { wallet } = getWorkspace();
  const userRoute =
    wallet && wallet.publicKey.toBase58() === comment.user.toBase58()
      ? "/profile"
      : `/users/${comment.user.toBase58()}`;

  return (
    <div className="mt-4 pt-4 border-t border-primary">
      <div className="flex items-center gap-2">
        <div className="mr-2">
          <Link href={userRoute}>
            <a>
              <Image
                src={`https://avatars.dicebear.com/api/jdenticon/${comment.user.toBase58()}.svg`}
                alt={comment.user.toBase58()}
                width="25"
                height="25"
              />
            </a>
          </Link>
        </div>
        <h3 className="inline font-semibold" title={comment.user_display}>
          <Link href={userRoute}>
            <a className="hover:underline">{comment.user_display}</a>
          </Link>
        </h3>
        <span className="text-gray-500">•</span>
        <time className="text-sm text-gray-500" title={comment.created_at}>
          <Link href={`/tweets/${comment.key}`}>
            <a className="hover:underline">{comment.created_ago}</a>
          </Link>
        </time>
      </div>
      <p className="whitespace-pre-wrap ml-10">{comment.content}</p>
    </div>
  );
}
