import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, Tag, Calendar, Search, Filter } from 'lucide-react';
import { blogPosts, blogCategories } from '../data/blogPosts';
import { BlogPost, BlogCategory } from '../types/blog';

export function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(blogPosts);

  const filteredCategories = blogCategories.filter(cat => cat.count > 0);

  React.useEffect(() => {
    let posts = blogPosts;

    // Filter by category
    if (selectedCategory !== 'all') {
      posts = posts.filter(post => post.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      posts = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredPosts(posts);
  }, [selectedCategory, searchTerm]);

  const featuredPosts = blogPosts.filter(post => post.featured);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            MBTI知识博客
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            深入了解MBTI人格理论，探索16种性格类型的奥秘，获取专业的职业规划建议和个人成长指导
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="搜索文章标题、描述或标签..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full transition-colors ${
              selectedCategory === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            全部文章
          </button>
          {filteredCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full transition-colors ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>

        {/* Featured Posts */}
        {selectedCategory === 'all' && !searchTerm && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">精选文章</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredPosts.map((post) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.id}`}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
                >
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2"></div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                        {blogCategories.find(cat => cat.id === post.category)?.name}
                      </span>
                      {post.featured && (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">
                          精选
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.description}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(post.publishDate).toLocaleDateString('zh-CN')}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {post.readTime}分钟
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* All Posts */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {selectedCategory !== 'all'
              ? `${blogCategories.find(cat => cat.id === selectedCategory)?.name}相关文章`
              : searchTerm
                ? `搜索结果 (${filteredPosts.length}篇)`
                : '最新文章'
            }
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.id}`}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
              >
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2"></div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                      {blogCategories.find(cat => cat.id === post.category)?.name}
                    </span>
                    {post.featured && (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">
                        精选
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.description}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(post.publishDate).toLocaleDateString('zh-CN')}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {post.readTime}分钟
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-1">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                      >
                        <Tag className="h-3 w-3" />
                        {tag}
                      </span>
                    ))}
                    {post.tags.length > 3 && (
                      <span className="text-xs text-gray-500">+{post.tags.length - 3}</span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              没有找到相关文章
            </h3>
            <p className="text-gray-600">
              试试其他关键词或选择不同的分类
            </p>
          </div>
        )}

        {/* SEO Keywords Section */}
        <section className="mt-16 bg-white rounded-lg p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4">热门搜索关键词</h2>
          <div className="flex flex-wrap gap-2">
            {[
              'MBTI测试', '免费MBTI测试', '16型人格', '性格测试', 'MBTI职业测试',
              'MBTI是什么', 'MBTI官网', '免费MBTI测评', 'MBTI人格测试', 'MBTI性格测试',
              '人格测试免费', 'MBTI十六型人格', 'MBTI免费版', 'MBTI测试官网免费版',
              'MBTI职业性格测试', '人格测试MBTI免费', 'MBTI免费完整版'
            ].map((keyword) => (
              <span
                key={keyword}
                className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 cursor-pointer"
                onClick={() => setSearchTerm(keyword)}
              >
                {keyword}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}