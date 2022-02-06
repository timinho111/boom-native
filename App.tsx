import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { default as theme } from './src/themes/custom-theme.json';
import { default as mapping } from './mapping.json';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { AppNavigator } from './src/components/Navigation';
import { createServer } from 'miragejs';
import { teamsJson } from './src/api/teams';
import { clubs } from './src/api/clubs';
import { Logs } from 'expo';
import { players } from './src/api/players';

Logs.enableExpoCliLogging();

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
		this.get('/api/clubs', () => {
			return clubs;
		});
		this.get('/api/players', () => {
			return players;
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
