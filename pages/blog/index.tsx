import { Blog } from '~/components';
import { getAllPostsFrontMatter } from '~/lib/post';
import { Layout } from '~/layouts';
import { Animate } from '~/components';
import { ErrorPage } from '~/components';

import type { GetStaticProps } from 'next';

import type { FrontMatter } from '~/types';

interface BlogProps {
	serialisedFrontmatters: string;
}

export const getStaticProps: GetStaticProps<BlogProps> = async () => {
	const frontmatters = await getAllPostsFrontMatter();

	return {
		props: {
			serialisedFrontmatters: JSON.stringify(frontmatters),
		},
	};
};

export default function BlogPage({ serialisedFrontmatters }: BlogProps) {
	const frontmatters = JSON.parse(serialisedFrontmatters) as Array<FrontMatter>;

	if (frontmatters.length === 0) return <ErrorPage title="There's nothing here" message="Sorry, there are no blog posts for now. Check back later!" />;

	const latestPost = frontmatters.shift();

	return (
		<Layout.Default seo={{
			title: 'Blog - Transparency Guides & Software Engineering Tutorials',
			description: 'Discover comprehensive guides on making Discord, Spotify, Obsidian, and Zen Browser transparent. Learn software engineering, web development, and application customization with step-by-step tutorials.',
			additionalMetaTags: [
				{
					name: 'keywords',
					content: 'transparency guides, Discord transparent, Spotify transparent, Obsidian transparent, Zen Browser, software engineering blog, programming tutorials, web development, CSS themes, Windows customization, Vencord, application transparency',
				},
			],
			openGraph: {
				title: 'DebugBoard Blog - Transparency Guides & Software Engineering',
				description: 'Comprehensive guides on application transparency and software engineering tutorials',
				type: 'website',
			},
		}}>
			<div className="mt-8 sm:mt-16 mb-20 mx-0 sm:mx-6 lg:mb-28 lg:mx-8">
				<div className="relative max-w-6xl mx-auto">
					<div>
					<Blog.Latest frontmatter={latestPost} />
				</div>
				<div className="mt-4 lg:mt-12 grid gap-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 sm:max-w-none">
					{frontmatters.map((frontmatter, i) => (
						<article key={i}>
							<Blog.Post key={i} frontmatter={frontmatter} index={i} />
						</article>
					))}
					</div>
				</div>
			</div>
		</Layout.Default>
	);
}
