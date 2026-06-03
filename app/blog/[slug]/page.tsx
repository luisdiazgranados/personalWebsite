import { notFound } from "next/navigation";
import { getSubstackPosts } from "../substack";
import PostContent from "./PostContent";

export const revalidate = 3600;

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const posts = await getSubstackPosts();
  const post = posts.find((p) => p.slug === slug);

  if (!post) return notFound();

  return <PostContent post={post} />;
}
