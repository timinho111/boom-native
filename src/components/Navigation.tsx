import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab, Icon, Layout, Text } from '@ui-kitten/components';
import { LigaScreen } from './LigaScreen';

const { Navigator, Screen } = createBottomTabNavigator();

const HomeIcon = (props) => <Icon {...props} name="home-outline" />;

const TeamIcon = (props) => <Icon {...props} name="people-outline" />;

const LigaIcon = (props) => <Icon {...props} name="menu-outline" />;

const SettingsIcon = (props) => <Icon {...props} name="settings-2-outline" />;

const HomeScreen = () => (
	<Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
		<Text category="h1">HOME</Text>
	</Layout>
);

const TeamScreen = () => (
	<Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
		<Text category="h1">TEAM</Text>
	</Layout>
);

const SettingsScreen = () => (
	<Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
		<Text category="h1">SETTINGS</Text>
	</Layout>
);

const BottomTabBar = ({ navigation, state }) => (
	<BottomNavigation
		selectedIndex={state.index}
		onSelect={(index) => navigation.navigate(state.routeNames[index])}
	>
		<BottomNavigationTab title="HOME" icon={HomeIcon} />
		<BottomNavigationTab title="TEAM" icon={TeamIcon} />
		<BottomNavigationTab title="LIGA" icon={LigaIcon} />
		<BottomNavigationTab title="SETTINGS" icon={SettingsIcon} />
	</BottomNavigation>
);

const TabNavigator = () => (
	<Navigator tabBar={(props) => <BottomTabBar {...props} />}>
		<Screen name="Home" component={HomeScreen} />
		<Screen name="Team" component={TeamScreen} />
		<Screen name="Liga" component={LigaScreen} />
		<Screen name="Settings" component={SettingsScreen} />
	</Navigator>
);

export const AppNavigator = () => (
	<NavigationContainer>
		<TabNavigator />
	</NavigationContainer>
);
