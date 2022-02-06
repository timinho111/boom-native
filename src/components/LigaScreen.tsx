import { Avatar, Layout, List, ListItem, Text } from '@ui-kitten/components';
import React, { useEffect, useState } from 'react';
import { ApiClub, Club } from '../api/models';
import { ImageBackground } from 'react-native';

export const LigaScreen = ({ navigation }) => {
	// create state for clubs
	const [clubs, setClubs] = useState({ status: 'loading', data: [] as Club[] });

	// get teams
	useEffect(() => {
		fetch('/api/clubs')
			.then((response) => response.json())
			.catch((error) => console.log(error))
			.then((thisClubs: ApiClub[]) => {
				console.log(clubs);

				const newClubs = [] as Club[];

				thisClubs.forEach((club) => {
					const newClub: Club = {
						id: club.id,
						name: club.name.full,
						threeLetterCode: club.threeLetterCode,
						image: club.logos[0].uri,
					};
					newClubs.push(newClub);
				});

				setClubs({ status: 'loaded', data: newClubs });

				console.log(newClubs);
				console.log('loaded');
			})
			.catch((error) => console.log(error));
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
			title={`${item.name}`}
			description={`${item.threeLetterCode}`}
			accessoryLeft={renderItemIcon(item.image)}
			onPress={() => navigation.navigate('LigaTeam', { teamId: item.id, name: item.name })}
		/>
	);

	return clubs.status === 'loaded' ? (
		<>
			<List data={clubs.data} renderItem={renderItem} />
		</>
	) : (
		<Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<Text category="h1">TEAM</Text>
		</Layout>
	);
};
