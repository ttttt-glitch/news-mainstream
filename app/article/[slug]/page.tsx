import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PortableText } from '@portabletext/react';
import { sanityClient, urlFor } from '@/lib/sanity';
import Navbar from '@/components/Navbar';
import SocialShare from '@/components/SocialShare';
import { Post } from '@/types/news';

export const revalidate = 60;

async function getArticle(slug: string) {
  const query = `*[_type == "post" && slug.current == $slug][0]{
    ...,
    titleEn,
    titleSo,
    bodyEn,
    bodySo,
    author->{ name, image }
  }`;
  return await sanityClient.fetch(query, { slug });
}

async function getRecommended(category: string, currentSlug: string) {
  const query = `*[_type == "post" && category == $category && slug.current != $currentSlug]
    | order(publishedAt desc)[0...3]{
      _id,
      title,
      titleEn,
      titleSo,
      slug,
      category,
      publishedAt
    }`;
  return await sanityClient.fetch(query, { category, currentSlug });
}

function getLocalizedContent(post: any, lang: string) {
  if (lang === 'so') {
    return {
      title: post.titleSo || post.title,
      body: post.bodySo || post.body,
    };
  }
  return {
    title: post.titleEn || post.title,
    body: post.bodyEn || post.body,
  };
}

// Define proper type for recommended posts
type RecommendedPost = {
  _id: string;
  title: string;
  titleEn?: string;
  titleSo?: string;
  slug: { current: string };
  category: string;
  publishedAt: string;
};

export default async function ArticlePage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ lang?: string }>;
}) {
  const { slug } = await params;
  const lang = (await searchParams)?.lang || 'en';
  const article: any = await getArticle(slug);

  if (!article) {
    notFound();
  }

  const { title, body } = getLocalizedContent(article, lang);
  const recommended = await getRecommended(article.category, article.slug.current);

  const localizedRecommended = recommended?.map((post: any) => ({
    ...post,
    title: lang === 'so' ? (post.titleSo || post.title) : (post.titleEn || post.title),
  }));

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Article Header with Share Button */}
        <header className="space-y-4 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="flex-1">
              <span className="text-sm font-bold text-blue-600 uppercase tracking-widest">
                {article.category}
              </span>
              <h1 className="font-serif text-3xl sm:text-5xl font-extrabold tracking-tight text-gray-950 leading-tight mt-2">
                {title}
              </h1>
            </div>
            <SocialShare
              title={title}
              url={`https://news-mainstream-teal.vercel.app/article/${article.slug.current}`}
            />
          </div>

          <div className="flex items-center justify-center space-x-4 pt-4 text-sm text-gray-600">
            {article.author?.image && (
              <Image
                src={urlFor(article.author.image).url()}
                alt={article.author.name}
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
            )}
            <div>
              <p className="font-semibold text-gray-900">{article.author?.name}</p>
              <p>{new Date(article.publishedAt).toLocaleDateString()}</p>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {article.mainImage && (
          <div className="relative h-[400px] sm:h-[500px] w-full mb-10 rounded-xl overflow-hidden shadow-md">
            <Image
              src={urlFor(article.mainImage).url()}
              alt={title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Article Body */}
        <article className="prose prose-lg sm:prose-xl max-w-none font-serif text-gray-800 leading-relaxed space-y-6">
          <PortableText value={body} />
        </article>

        {/* Recommended Articles - FULLY FIXED */}
        <section className="mt-16 pt-12 border-t border-gray-200">
          <h3 className="font-serif text-2xl font-bold mb-6">
            {lang === 'so' ? 'Qoraallo Kale oo La Xiriira' : 'Recommended Articles'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {localizedRecommended?.map((post: RecommendedPost) => (
              <div
                key={post._id}
                className="border border-gray-200 rounded-lg p-4 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
                    {post.category}
                  </span>
                  {/* FIXED: Added backticks ` around the template literal */}
                  <Link href={`/article/${post.slug.current}?lang=${lang}`}>
                    <h4 className="font-serif font-bold text-base hover:text-blue-600 mt-1 mb-2">
                      {post.title}
                    </h4>
                  </Link>
                </div>
                <span className="text-xs text-gray-500">
                  {new Date(post.publishedAt).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}