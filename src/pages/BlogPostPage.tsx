import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, User, Tag, Share2, Heart } from 'lucide-react';
import { blogPosts, blogCategories } from '../data/blogPosts';
import { Helmet } from 'react-helmet-async';

// Markdown解析函数
const parseMarkdownContent = (content: string) => {
  // 移除开头和结尾的空白字符
  let processedContent = content.trim();
  
  // 分割内容为行
  const lines = processedContent.split('\n');
  let html = '';
  let inList = false;
  let listType = ''; // 'ul' or 'ol'
  let inCodeBlock = false;
  let codeBlockContent = '';
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // 处理代码块
    if (line.startsWith('```')) {
      if (!inCodeBlock) {
        // 开始代码块
        inCodeBlock = true;
        codeBlockContent = '';
      } else {
        // 结束代码块
        inCodeBlock = false;
        html += `<pre><code>${escapeHtml(codeBlockContent)}</code></pre>\n`;
        codeBlockContent = '';
      }
      continue;
    }
    
    // 如果在代码块中，收集内容
    if (inCodeBlock) {
      codeBlockContent += line + '\n';
      continue;
    }
    
    // 处理标题
    const titleMatch = line.match(/^(#{1,6})\s+(.+)$/);
    if (titleMatch) {
      // 如果在列表中，先关闭列表
      if (inList) {
        html += `</${listType}>\n`;
        inList = false;
        listType = '';
      }
      const level = titleMatch[1].length;
      html += `<h${level}>${processInlineMarkdown(titleMatch[2])}</h${level}>\n`;
      continue;
    }
    
    // 处理引用块
    if (line.startsWith('>')) {
      // 如果在列表中，先关闭列表
      if (inList) {
        html += `</${listType}>\n`;
        inList = false;
        listType = '';
      }
      const quoteContent = line.substring(1).trim();
      html += `<blockquote>${processInlineMarkdown(quoteContent)}</blockquote>\n`;
      continue;
    }
    
    // 处理分割线
    if (line.match(/^[-*_]{3,}$/)) {
      // 如果在列表中，先关闭列表
      if (inList) {
        html += `</${listType}>\n`;
        inList = false;
        listType = '';
      }
      html += '<hr />\n';
      continue;
    }
    
    // 处理空行
    if (line.trim() === '') {
      // 如果在列表中，先关闭列表
      if (inList) {
        html += `</${listType}>\n`;
        inList = false;
        listType = '';
      }
      continue;
    }
    
    // 处理无序列表
    const ulMatch = line.match(/^[-*+]\s+(.+)$/);
    if (ulMatch) {
      if (!inList || listType !== 'ul') {
        if (inList) {
          html += `</${listType}>\n`;
        }
        html += '<ul>\n';
        inList = true;
        listType = 'ul';
      }
      html += `<li>${processInlineMarkdown(ulMatch[1])}</li>\n`;
      continue;
    }
    
    // 处理有序列表
    const olMatch = line.match(/^\d+\.\s+(.+)$/);
    if (olMatch) {
      if (!inList || listType !== 'ol') {
        if (inList) {
          html += `</${listType}>\n`;
        }
        html += '<ol>\n';
        inList = true;
        listType = 'ol';
      }
      html += `<li>${processInlineMarkdown(olMatch[1])}</li>\n`;
      continue;
    }
    
    // 处理普通段落
    if (inList) {
      html += `</${listType}>\n`;
      inList = false;
      listType = '';
    }
    html += `<p>${processInlineMarkdown(line)}</p>\n`;
  }
  
  // 确保关闭任何打开的列表
  if (inList) {
    html += `</${listType}>\n`;
  }
  
  return { __html: html };
};

// HTML转义函数
const escapeHtml = (text: string) => {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  
  return text.replace(/[&<>"']/g, (m) => map[m]);
};

// 处理行内Markdown元素
const processInlineMarkdown = (text: string) => {
  // 处理粗体文本
  let processed = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  
  // 处理斜体文本
  processed = processed.replace(/\*(.+?)\*/g, '<em>$1</em>');
  
  // 处理行内代码
  processed = processed.replace(/`(.+?)`/g, '<code>$1</code>');
  
  return processed;
};

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
          <div className="bg-white rounded-lg shadow-sm p-12 md:p-16 mb-8">
            <div 
              className="prose prose-xl prose-slate max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-headings:mt-16 prose-headings:mb-8 prose-h1:text-4xl prose-h1:font-extrabold prose-h1:text-transparent prose-h1:bg-clip-text prose-h1:bg-gradient-to-r prose-h1:from-indigo-600 prose-h1:to-purple-600 prose-h2:text-3xl prose-h2:font-bold prose-h2:text-gray-800 prose-h2:border-b-2 prose-h2:border-indigo-100 prose-h2:pb-3 prose-h3:text-2xl prose-h3:font-semibold prose-h3:text-indigo-700 prose-p:leading-loose prose-p:text-gray-700 prose-p:mb-8 prose-p:text-lg prose-ul:my-8 prose-ol:my-8 prose-li:mb-4 prose-li:text-gray-700 prose-li:leading-loose prose-li:text-lg prose-strong:text-gray-900 prose-em:text-indigo-600 prose-code:text-pink-600 prose-code:bg-pink-50 prose-code:px-3 prose-code:py-1.5 prose-code:rounded-lg prose-code:font-mono prose-code:text-sm prose-blockquote:border-l-4 prose-blockquote:border-indigo-500 prose-blockquote:bg-gradient-to-r prose-blockquote:from-indigo-50 prose-blockquote:to-purple-50 prose-blockquote:py-8 prose-blockquote:px-10 prose-blockquote:my-12 prose-blockquote:text-gray-700 prose-blockquote:italic prose-blockquote:rounded-r-lg prose-hr:border-gray-200 prose-hr:my-16 prose-hr:border-2 prose-hr:border-dashed prose-a:text-indigo-600 prose-a:no-underline prose-a:font-medium hover:prose-a:text-indigo-700 hover:prose-a:underline"
              dangerouslySetInnerHTML={parseMarkdownContent(post.content)}
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