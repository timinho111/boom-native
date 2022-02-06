import { Avatar, Layout, List, ListItem, Text } from '@ui-kitten/components';
import React, { useEffect, useState } from 'react';
import { ApiPlayer, Player } from '../api/models';
import { ImageBackground, ScrollView } from 'react-native';

interface Props {
	teamId: string;
}

export const LigaTeamScreen: React.FC<Props> = ({ navigation, route }) => {
	const teamId = route.params.teamId;

	// load team data
	const [loadStatus, setLoadStatus] = useState(false);
	const [goalkeeperPlayers, setGoalkeeperPlayers] = useState([] as Player[]);
	const [defensePlayers, setDefensePlayers] = useState([] as Player[]);
	const [midfieldPlayers, setMidfieldPlayers] = useState([] as Player[]);
	const [attackPlayers, setAttackPlayers] = useState([] as Player[]);

	// setplayer function
	const setPlayers = (players: any, position: string): Player[] => {
		const newPlayers = [] as Player[];
		console.log(players);
		players[position].forEach((player) => {
			const newPlayer: Player = {
				id: player.id,
				name: player.name.full,
				shirtNumber: player.shirtNumber,
				nationality: player.nationality.firstNationality,
				image: player.playerImages.FACE_CIRCLE,
			};
			newPlayers.push(newPlayer);
		});

		return newPlayers;
	};

	useEffect(() => {
		fetch('/api/players')
			.then((response) => response.json())
			.catch((error) => console.log(error))
			.then((thisPlayers: ApiPlayer) => {
				const filteredPlayers = thisPlayers[teamId];
				console.log(teamId);
				console.log(filteredPlayers);

				console.log('done');

				setGoalkeeperPlayers(setPlayers(filteredPlayers, 'GOALKEEPER'));
				console.log('done2');

				setDefensePlayers(setPlayers(filteredPlayers, 'DEFENSE'));
				console.log('done3');

				setMidfieldPlayers(setPlayers(filteredPlayers, 'MIDFIELD'));
				console.log('done4');

				setAttackPlayers(setPlayers(filteredPlayers, 'ATTACK'));
				console.log('done5');

				setLoadStatus(true);
			})
			.catch((error) => console.log(error));
	}, []);

	// render team icon
	const renderItemIcon = (iconUrl: string) => (
		<Avatar
			ImageComponent={ImageBackground}
			source={{
				uri: iconUrl,
			}}
		/>
	);

	// render team item
	const renderItem = ({ item }) => (
		<ListItem
			title={`${item.name}`}
			description={`${item.nationality}`}
			accessoryLeft={renderItemIcon(item.image)}
		/>
	);

	return loadStatus ? (
		<ScrollView>
			<Text>Torhüter</Text>
			<List data={goalkeeperPlayers} renderItem={renderItem} />
			<Text>Abwehr</Text>
			<List data={defensePlayers} renderItem={renderItem} />
			<Text>Mittelfeld</Text>
			<List data={midfieldPlayers} renderItem={renderItem} />
			<Text>Sturm</Text>
			<List data={attackPlayers} renderItem={renderItem} />
		</ScrollView>
	) : (
		<Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<Text category="h1">loading</Text>
		</Layout>
	);
};
