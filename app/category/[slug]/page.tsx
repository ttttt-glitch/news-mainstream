import Link from 'next/link';
import Image from 'next/image';
import { sanityClient, urlFor } from '@/lib/sanity';
import Navbar from '@/components/Navbar';
import { Post } from '@/types/news';

export const revalidate = 60;

async function getCategoryPosts(category: string) {
  const query = `*[_type == "post" && category == $category] | order(publishedAt desc){
    _id,
    title,
    slug,
    mainImage,
    category,
    publishedAt,
    author->{ name, image }
  }`;
  return await sanityClient.fetch(query, { category });
}

// Updated component signature to safely support Next.js 15 asynchronous routing parameters
export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const posts = await getCategoryPosts(slug);
  const categoryName = slug.toUpperCase();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-950 font-sans">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <header className="border-b border-gray-300 pb-4">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Category</span>
          <h1 className="font-serif text-4xl font-extrabold capitalize text-gray-900 mt-1">
            {categoryName} News
          </h1>
        </header>

        {posts.length === 0 ? (
          <p className="text-gray-600 text-lg">No articles found in this category yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post: Post) => (
              <article key={post._id} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 flex flex-col">
                {post.mainImage && (
                  <div className="relative h-48 w-full">
                    <Image
                      src={urlFor(post.mainImage).url()}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-5 flex flex-col flex-grow">
                  <Link href={`/article/${post.slug.current}`} className="flex-grow">
                    <h3 className="font-serif text-lg font-bold text-gray-900 hover:text-blue-600 leading-snug mb-3">
                      {post.title}
                    </h3>
                  </Link>
                  <div className="text-xs text-gray-500 mt-auto flex justify-between items-center">
                    <span>By {post.author?.name}</span>
                    <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}