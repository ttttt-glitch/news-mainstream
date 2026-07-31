import Link from 'next/link';
import Image from 'next/image';
import { sanityClient, urlFor } from '@/lib/sanity';
import Navbar from '@/components/Navbar';
import { Post } from '@/types/news';

export const revalidate = 60;

async function getLatestPosts() {
  const query = `*[_type == "post"] | order(publishedAt desc)[0...9]{
    _id,
    title,
    slug,
    mainImage,
    category,
    publishedAt,
    author->{ name, image }
  }`;
  return await sanityClient.fetch(query);
}

async function getVideos() {
  // ✅ FIXED: Changed from "videoPost" to "video"
  const query = `*[_type == "video"] | order(publishedAt desc)[0...2]{
    _id,
    title,
    youtubeUrl,
    publishedAt
  }`;
  return await sanityClient.fetch(query);
}

function getYouTubeEmbedUrl(url: string) {
  if (!url) return '';
  
  // ✅ IMPROVED: Better YouTube URL extraction
  const regExp = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regExp);
  return match ? `https://www.youtube.com/embed/${match[1]}` : '';
}

export default async function HomePage() {
  const posts = await getLatestPosts();
  const videos = await getVideos();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-950 font-sans">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <header className="border-b border-gray-300 pb-4">
          <h1 className="font-serif text-4xl font-extrabold text-gray-900 mt-1">
            Latest News
          </h1>
        </header>

        {posts.length === 0 ? (
          <p className="text-gray-600 text-lg">No articles published yet.</p>
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
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
                    {post.category}
                  </span>
                  <Link href={`/article/${post.slug.current}`} className="flex-grow">
                    <h3 className="font-serif text-lg font-bold text-gray-900 hover:text-blue-600 leading-snug mt-1 mb-3">
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

        {/* --- RECENT VIDEO STORIES SECTION --- */}
        <section className="mt-16 pt-8 border-t border-gray-300">
          <div className="mb-6">
            <h2 className="text-2xl font-bold font-serif text-gray-900 border-b-4 border-blue-600 inline-block pb-1">
              Recent Video Stories
            </h2>
          </div>

          {videos.length === 0 ? (
            <p className="text-gray-600">No video stories published yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {videos.map((video: any) => (
                <div key={video._id} className="flex flex-col bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
                  {video.youtubeUrl ? (
                    <iframe 
                      className="w-full h-64"
                      src={getYouTubeEmbedUrl(video.youtubeUrl)} 
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">No video URL provided</span>
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="font-bold text-lg text-gray-800 font-serif">
                      {video.title || 'Untitled Video'}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {video.publishedAt ? new Date(video.publishedAt).toLocaleDateString() : 'No date'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
        {/* --- END OF VIDEO SECTION --- */}

      </main>
    </div>
  );
}