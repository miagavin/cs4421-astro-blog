import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const authors = defineCollection({
	loader: glob({ base: './src/content/authors', pattern: '**/*.md' }),
	schema: ({ image }) =>
		z.object({
			name: z.string(),
			role: z.string(),
			avatar: image().optional(),
			avatarAlt: z.string().optional(),
			links: z.array(z.object({ label: z.string(), url: z.string().url() })).default([]),
		}),
});

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			author: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
		}),
});

export const collections = { blog, authors };