import DOMPurify from "isomorphic-dompurify";

export type SubstackPost = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  content: string;
  link: string;
};

const SUBSTACK_FEED = "https://luisdiazgranados.substack.com/feed";

export async function getSubstackPosts(): Promise<SubstackPost[]> {
  try {
    const res = await fetch(SUBSTACK_FEED, {
      next: { revalidate: 3600 },
    });
    const xml = await res.text();

    const posts: SubstackPost[] = [];
    const items = xml.split("<item>");

    for (let i = 1; i < items.length; i++) {
      const item = items[i];

      const title =
        item.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/)?.[1] ??
        item.match(/<title>(.*?)<\/title>/)?.[1] ??
        "Untitled";

      const link = item.match(/<link>(.*?)<\/link>/)?.[1] ?? "";

      const pubDate = item.match(/<pubDate>(.*?)<\/pubDate>/)?.[1] ?? "";
      const date = pubDate
        ? new Date(pubDate).toISOString().split("T")[0]
        : "";

      // Get full HTML content from content:encoded
      const content =
        item.match(
          new RegExp(
            "<content:encoded><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></content:encoded>"
          )
        )?.[1] ??
        item.match(
          new RegExp("<content:encoded>([\\s\\S]*?)</content:encoded>")
        )?.[1] ??
        "";

      const description =
        item.match(
          new RegExp(
            "<description><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></description>"
          )
        )?.[1] ??
        item.match(
          new RegExp("<description>([\\s\\S]*?)</description>")
        )?.[1] ??
        "";

      const summary = description
        .replace(/<[^>]*>/g, "")
        .replace(/&nbsp;/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&#x27;/g, "'")
        .replace(/&quot;/g, '"')
        .trim()
        .slice(0, 180);

      const slug =
        link.split("/").pop()?.replace(/\?.*$/, "") ?? `post-${i}`;

      const sanitizedContent = DOMPurify.sanitize(content, {
        ALLOWED_TAGS: [
          "p", "br", "strong", "em", "b", "i", "u", "a",
          "h1", "h2", "h3", "h4", "h5", "h6",
          "ul", "ol", "li", "blockquote", "pre", "code",
          "img", "figure", "figcaption", "hr", "span", "div", "sub", "sup",
        ],
        ALLOWED_ATTR: ["href", "src", "alt", "title", "class", "target", "rel"],
      });

      posts.push({ slug, title, date, summary, content: sanitizedContent, link });
    }

    return posts;
  } catch {
    return [];
  }
}

