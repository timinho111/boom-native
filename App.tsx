import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { default as theme } from './src/themes/custom-theme.json';
import { default as mapping } from './mapping.json';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { AppNavigator } from './src/components/Navigation';
import { createServer } from 'miragejs';
import { teamsJson } from './src/api/teams';

declare global {
	interface Window {
		server: any;
	}
}

if (window.server) {
	window.server.shutdown();
}

window.server = createServer({
	routes() {
		this.get('/api/teams', () => {
			return teamsJson;
		});
	},
});
export default () => (
	<>
		<IconRegistry icons={EvaIconsPack} />
		<ApplicationProvider
			{...eva}
			theme={{ ...eva.dark, ...theme }}
			customMapping={{ ...eva.mapping, mapping }}
		>
			<AppNavigator />
		</ApplicationProvider>
	</>
);
