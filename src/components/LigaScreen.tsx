import { Avatar, Layout, List, ListItem, Text } from '@ui-kitten/components';
import React, { useEffect, useState } from 'react';
import { Team } from '../api/models';
import { teamsJson } from '../api/teams';
import { ImageBackground } from 'react-native';

export const LigaScreen = () => {
	// create state for teams
	const [teams, setTeams] = useState({ status: 'loading', data: [] as Team[] });

	// get teams
	useEffect(() => {
		fetch('/api/teams')
			.then((response) => response.json())
			.then((json) => {
				console.log(json);
				setTeams({ status: 'loaded', data: teamsJson });
			});
	}, []);

	// render team icon
	const renderItemIcon = (teamIconUrl: string) => (
		<Avatar
			ImageComponent={ImageBackground}
			source={{
				uri: teamIconUrl,
			}}
		/>
	);
	// render team item
	const renderItem = ({ item }) => (
		<ListItem
			title={`${item.teamName}`}
			description={`${item.shortName}`}
			accessoryLeft={renderItemIcon(item.teamIconUrl)}
		/>
	);

	return teams.status === 'loaded' ? (
		<>
			<List data={teams.data} renderItem={renderItem} />
		</>
	) : (
		<Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<Text category="h1">TEAM</Text>
		</Layout>
	);
};
