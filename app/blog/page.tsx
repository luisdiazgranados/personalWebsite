import figlet from "figlet";
import BlogContent from "./BlogContent";
import { getSubstackPosts } from "./substack";

export type Post = {
  slug: string;
  title: string;
  asciiTitle: string;
  date: string;
  summary: string;
};

const FONTS: figlet.Fonts[] = [
  "ANSI Shadow",
  "Doom",
  "Big",
  "Standard",
  "Speed",
  "Colossal",
  "Epic",
  "Star Wars",
  "Chunky",
  "Roman",
  "Georgia11",
  "ANSI Regular",
];

export const revalidate = 3600;

function titleToAscii(title: string, index: number): string {
  const font = FONTS[index % FONTS.length];
  try {
    return figlet.textSync(title, { font, width: 120, whitespaceBreak: true });
  } catch {
    return figlet.textSync(title, { font: "Standard", width: 120, whitespaceBreak: true });
  }
}

export default async function BlogPage() {
  const source = await getSubstackPosts();

  const posts: Post[] = source.map((post, i) => ({
    slug: post.slug,
    title: post.title,
    asciiTitle: titleToAscii(post.title, i),
    date: post.date,
    summary: post.summary,
  }));

  return <BlogContent posts={posts} />;
}
