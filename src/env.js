import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({
	PUBLIC_DIRECTUS_URL: {
		description: 'Directus server URL',
		public: true,
		// inlined at build time, so this must be set in the build environment
		static: true,
		schema: (value) => {
			if (!value) throw new Error('PUBLIC_DIRECTUS_URL must be set (see .env.example)');
			return value;
		}
	}
});
