import emojiRegex from 'emoji-regex';

import { readFileSync } from 'fs';
import { join } from 'path';

import type { GitHubRepo, GitHubRepos, Project, ProjectOverride } from '~/types';

function getHiddenProjects(): string[] {
	try {
		const configPath = join(process.cwd(), 'config', 'projects.json');
		const configFile = readFileSync(configPath, 'utf8');
		const config = JSON.parse(configFile);
		return config.hiddenProjects || [];
	} catch (error) {
		console.warn('Could not load projects config file:', error);
		return [];
	}
}

/**
 * Fetch Projects
 *
 * Make a GET request to the GitHub API to gather all repositories
 * under my `DebugBoard` username & then filter them down to only
 * include those that contain the `portfolio` topic
 *
 * @TODO Switch to v3 API using GraphQL to save over-fetching
 */
export async function fetchProjects(): Promise<Array<Project>> {
	const hiddenProjects = getHiddenProjects();

	// If no GitHub PAT is available, return static projects data
	if (!process.env.GITHUB_PAT) {
		console.warn('No GitHub PAT found, using static projects data');
		const { default: rawProjectOverrides } = await import('~/data/projects.json');
		const projectOverrides = rawProjectOverrides as Array<ProjectOverride>;
		
		return projectOverrides.map((project) => {
			// Check if description starts with an emoji
			const [firstWord, ...desc] = project.description.split(' ');
			const hasEmoji = emojiRegex().test(firstWord);

			let icon = '📦'; // Default icon
			let finalDescription = project.description;

			if (hasEmoji) {
				icon = firstWord;
				finalDescription = desc.join(' ');
			}

			return {
				description: finalDescription,
				icon: icon,
				homepage: undefined,
				name: project.repository.split('/')[1] || project.repository,
				private: false,
				template: false,
				url: `https://github.com/${project.repository}`,
			} as Project;
		});
	}

	let repos: GitHubRepos = [];
	let page = 1;
	while (true) {
		// Use authenticated user endpoint to get private repos
		const response = await fetch(`https://api.github.com/user/repos?per_page=100&page=${page}&type=all`, {
			headers: {
				authorization: `token ${process.env.GITHUB_PAT}`,
			},
		});

		const res = await response.json();

		if (response.status !== 200) {
			const error = res as {
				documentation_url: string;
				message: string;
			};

			console.error('Failed to fetch repos:', { error });

			// Fallback to static data on API failure
			const { default: rawProjectOverrides } = await import('~/data/projects.json');
			const projectOverrides = rawProjectOverrides as Array<ProjectOverride>;
			
			return projectOverrides.map((project) => {
				// Check if description starts with an emoji
				const [firstWord, ...desc] = project.description.split(' ');
				const hasEmoji = emojiRegex().test(firstWord);

				let icon = '📦'; // Default icon
				let finalDescription = project.description;

				if (hasEmoji) {
					icon = firstWord;
					finalDescription = desc.join(' ');
				}

				return {
					description: finalDescription,
					icon: icon,
					homepage: undefined,
					name: project.repository.split('/')[1] || project.repository,
					private: false,
					template: false,
					url: `https://github.com/${project.repository}`,
				} as Project;
			});
		}

		if (res.length === 0) break;
		repos = repos.concat(res as GitHubRepos);
		page += 1;
	}

	const { default: rawProjectOverrides } = await import('~/data/projects.json');
	const projectOverrides = rawProjectOverrides as Array<ProjectOverride>;

	const projects: Array<Project> = repos
		.sort((a, b) => b.stargazers_count - a.stargazers_count)
		.filter((repo) => {
			// Skip archived repositories
			if (repo.archived) return false;

			// Skip template repositories
			if (repo.is_template) return false;

			// Skip repositories without descriptions
			if (!repo.description?.trim()) return false;

			// Skip hidden projects
			if (hiddenProjects.includes(repo.name)) return false;

			return true;
		})
		.map((repo) => {
			// Check if there is a matching details override
			const projectOverride =
				projectOverrides.length > 0 &&
				projectOverrides.find(
					(override) => override.repository.toLowerCase() === repo.full_name.toLowerCase(),
				);
			let description = projectOverride ? projectOverride.description : repo.description;

			// Check if description starts with an emoji
			const [firstWord, ...desc] = description.split(' ');
			const hasEmoji = emojiRegex().test(firstWord);

			let icon = '📦'; // Default icon
			let finalDescription = description;

			if (hasEmoji) {
				icon = firstWord;
				finalDescription = desc.join(' ');
			}

			return {
				description: finalDescription,
				icon: icon,
				homepage: repo.homepage ?? undefined,
				name: repo.name,
				private: repo.private,
				template: false,
				url: repo.html_url,
			} as Project;
		});

	// Sort projects: public repositories first, then private ones
	return projects.sort((a, b) => {
		if (a.private === b.private) return 0;
		return a.private ? 1 : -1;
	});
}
