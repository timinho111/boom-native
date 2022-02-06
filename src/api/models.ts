export type Team = {
	teamId: number;
	teamName: string;
	shortName: string;
	teamIconUrl: string;
	teamGroupName: string | null;
};

export type ApiPlayer = {
	[key: string]: {
		[key: string]: [
			{
				id: string;
				name: {
					full: string;
				};
				nationality: {
					firstNationalityCode: string;
				};
				shirtNumber: string;
				playerImages: {
					FACE_CIRCLE: string;
				};
			},
		];
	};
};

export type Player = {
	id: string;
	name: string;
	shirtNumber: string;
	nationality: string;
	image: string;
};

export type ApiClub = {
	id: string;
	name: { full: string };
	logos: [{ id: string; uri: string }];
	threeLetterCode: string;
};

export type Club = {
	id: string;
	name: string;
	threeLetterCode: string;
	image: string;
};
