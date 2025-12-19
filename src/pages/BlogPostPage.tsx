import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, User, Tag, Share2, Heart } from 'lucide-react';
import { blogPosts, blogCategories } from '../data/blogPosts';
import { Helmet } from 'react-helmet-async';

export function BlogPostPage() {
  const { postId } = useParams<{ postId: string }>();
  const post = blogPosts.find(p => p.id === postId);

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">文章未找到</h1>
          <Link
            to="/blog"
            className="text-blue-600 hover:text-blue-700"
          >
            返回博客首页
          </Link>
        </div>
      </div>
    );
  }

  const category = blogCategories.find(cat => cat.id === post.category);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('链接已复制到剪贴板');
    }
  };

  return (
    <>
      <Helmet>
        <title>{post.seo.metaTitle}</title>
        <meta name="description" content={post.seo.metaDescription} />
        <meta name="keywords" content={post.seo.keywords.join(', ')} />

        {/* Open Graph */}
        <meta property="og:title" content={post.seo.metaTitle} />
        <meta property="og:description" content={post.seo.metaDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={window.location.href} />

        {/* Article specific */}
        <meta property="article:published_time" content={post.publishDate} />
        <meta property="article:author" content={post.author} />
        <meta property="article:section" content={category?.name} />
        {post.tags.map((tag, index) => (
          <meta key={index} property="article:tag" content={tag} />
        ))}

        {/* Canonical URL */}
        <link rel="canonical" href={window.location.href} />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back Button */}
          <Link
            to="/blog"
            className="inline-flex items-center text-gray-600 hover:text-blue-600 mb-8"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            返回博客
          </Link>

          {/* Article Header */}
          <header className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                {category?.name}
              </span>
              {post.featured && (
                <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-sm rounded-full">
                  精选文章
                </span>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {post.title}
            </h1>

            <p className="text-xl text-gray-600 mb-6">
              {post.description}
            </p>

            <div className="flex items-center justify-between border-t pt-6">
              <div className="flex items-center gap-6 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {post.author}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(post.publishDate).toLocaleDateString('zh-CN')}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {post.readTime}分钟阅读
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Share2 className="h-4 w-4" />
                  分享
                </button>
                <button className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  <Heart className="h-4 w-4" />
                  喜欢
                </button>
              </div>
            </div>
          </header>

          {/* Article Content */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <div
              className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-strong:text-gray-900 prose-code:text-blue-600 prose-pre:bg-gray-50 prose-blockquote:border-l-blue-500 prose-blockquote:text-gray-600"
              dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br>').replace(/#{1,6}\s/g, (match) => {
                const level = match.trim().length;
                return `<h${level}>`;
              }) }}
            />
          </div>

          {/* Tags */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">相关标签</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 cursor-pointer"
                >
                  <Tag className="h-3 w-3" />
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Related Posts */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">相关文章</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {blogPosts
                .filter(p => p.id !== post.id && p.category === post.category)
                .slice(0, 4)
                .map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    to={`/blog/${relatedPost.id}`}
                    className="group block"
                  >
                    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <h4 className="font-medium text-gray-900 group-hover:text-blue-600 mb-2">
                        {relatedPost.title}
                      </h4>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {relatedPost.description}
                      </p>
                      <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                        <span>{new Date(relatedPost.publishDate).toLocaleDateString('zh-CN')}</span>
                        <span>{relatedPost.readTime}分钟</span>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-4">
              准备好了解你的MBTI类型了吗？
            </h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              通过我们的免费MBTI测试，发现你的性格类型，了解你的优势和发展方向
            </p>
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-100 transition-colors"
            >
              开始免费测试
            </Link>
          </div>
        </article>
      </div>
    </>
  );
}