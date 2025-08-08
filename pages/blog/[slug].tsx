import Image from 'next/image';
import { MDXRemote } from 'next-mdx-remote';

import { Blog, Pill } from '~/components';
import { getPost, getAllPostSlugs } from '~/lib/post';
import { Layout } from '~/layouts';

import type { GetStaticPaths, GetStaticProps } from 'next';
import type { ParsedUrlQuery } from 'querystring';
import type { Post } from '~/types';

interface PathProps extends ParsedUrlQuery {
	slug: string;
}

interface BlogPostProps {
	post: Post;
}

export const getStaticPaths: GetStaticPaths<PathProps> = async () => {
	const posts = await getAllPostSlugs();

	return {
		paths: posts.map((post) => ({
			params: {
				slug: post.slice(0, -3), // remove '.md'
			},
		})),
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps<BlogPostProps, PathProps> = async ({ params }) => {
	const { frontmatter, source } = await getPost(params.slug);

	return {
		props: {
			post: {
				frontmatter,
				source,
			},
		},
	};
};

export default function BlogPost({ post }: BlogPostProps) {
	const structuredData = {
		"@context": "https://schema.org",
		"@type": "Article",
		"headline": post.frontmatter.title,
		"description": post.frontmatter.description,
		"image": post.frontmatter.banner ? `https://debugboard.org${post.frontmatter.banner}` : "https://debugboard.org/banner.png",
		"datePublished": post.frontmatter.date,
		"dateModified": post.frontmatter.date,
		"author": {
			"@type": "Person",
			"name": "DebugBoard"
		},
		"publisher": {
			"@type": "Organization",
			"name": "DebugBoard",
			"logo": {
				"@type": "ImageObject",
				"url": "https://debugboard.org/favicon.ico"
			}
		},
		"mainEntityOfPage": {
			"@type": "WebPage",
			"@id": `https://debugboard.org/blog/${post.frontmatter.title.toLowerCase().replace(/\s+/g, '-')}`
		}
	};

	return (
		<>
			<Layout.Default
				backgroundBlur={4}
				seo={{
					title: `${post.frontmatter.title} | DebugBoard`,
					description: post.frontmatter.description ?? `Learn ${post.frontmatter.title} with this comprehensive guide from DebugBoard. Step-by-step tutorial with detailed instructions and examples.`,
					additionalMetaTags: [
						{
							name: 'keywords',
							content: `${post.frontmatter.title}, transparency guide, tutorial, ${post.frontmatter.title.includes('Discord') ? 'Discord transparent, Vencord' : ''} ${post.frontmatter.title.includes('Spotify') ? 'Spotify transparent, music player customization' : ''} ${post.frontmatter.title.includes('Obsidian') ? 'Obsidian transparent, note-taking app' : ''} ${post.frontmatter.title.includes('Zen') ? 'Zen Browser transparent, browser customization' : ''}, software engineering, programming, web development`,
						},
						{
							name: 'article:author',
							content: 'DebugBoard',
						},
						{
							name: 'article:published_time',
							content: post.frontmatter.date,
						},
						{
							name: 'article:section',
							content: 'Technology',
						},
						{
							name: 'article:tag',
							content: 'transparency, customization, tutorial, guide',
						},
					],
					openGraph: {
						title: post.frontmatter.title,
						description: post.frontmatter.description,
						site_name: 'DebugBoard',
						type: 'article',
						article: {
							publishedTime: post.frontmatter.date,
							authors: ['DebugBoard'],
							section: 'Technology',
							tags: ['transparency', 'customization', 'tutorial', 'guide'],
						},
						images: [
							{
								url: `https://debugboard.org${post.frontmatter.banner ?? '/banner.png'}`,
								alt: post.frontmatter.banner_alt ?? post.frontmatter.description ?? post.frontmatter.title,
								width: 1200,
								height: 630,
								type: 'image/png',
							},
						],
					},
					additionalLinkTags: [
						{
							rel: 'canonical',
							href: `https://debugboard.org/blog/${post.frontmatter.title.toLowerCase().replace(/\s+/g, '-')}`,
						},
					],
				}}
			>
				{/* Structured Data for Article */}
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
				/>
				<div className="relative py-16 overflow-hidden">
					<div className="relative">
						{post.frontmatter.banner && (post.frontmatter.banner_show ?? true) && (
							<div className="relative sm:max-w-5xl mx-auto my-2 sm:my-4">
								<div className="w-full h-60 sm:h-80 mb-8 bg-gray-200 dark:bg-gray-600 rounded-3xl motion-safe:animate-pulse" />
								<Image
									alt={post.frontmatter.banner_alt ?? post.frontmatter.title}
									title={post.frontmatter.banner_alt ?? post.frontmatter.title}
									className="absolute top-0 left-0 w-full h-auto max-h-64 lg:max-h-96 mb-8 rounded-3xl object-cover select-none shadow-xl default-transition"
									draggable={false}
									layout="fill"
									src={post.frontmatter.banner}
								/>
							</div>
						)}

						<div className="flex flex-col space-y-4 max-w-prose mx-auto my-4 text-lg text-center">
							<div>
								{post.frontmatter.tagline && (
									<span className="block text-primary-600 font-semibold tracking-wide uppercase text-base text-center">
										{post.frontmatter.tagline}
									</span>
								)}
								<span className="block mt-2 text-gray-900 dark:text-white sm:text-4xl text-3xl text-center leading-8 font-extrabold tracking-tight">
									{post.frontmatter.title}
								</span>
								<span className="block mt-2 text-gray-400 sm:text-xl text-lg text-center leading-8 tracking-tight">
									{post.frontmatter.description}
								</span>
							</div>

							<span className="flex justify-center items-center">
								<Pill.Date>{post.frontmatter.date}</Pill.Date>
							</span>

							{post.frontmatter.description && post.frontmatter.description_show && (
								<p className="mt-8 text-xl text-gray-400 dark:text-gray-300 leading-8">
									{post.frontmatter.description}
								</p>
							)}
						</div>

						<article className="max-w-prose mx-auto prose prose-primary prose-lg text-gray-500 mx-auto">
							<MDXRemote {...post.source} components={Blog.X} />
						</article>
					</div>
				</div>
			</Layout.Default>
			<Blog.Styles.Code />
			<Blog.Styles.Elements />
		</>
	);
}
