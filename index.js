'use strict';

const { graphql, buildSchema } = require('graphql');

const schema = buildSchema(`
type Video {
	id: ID,
	title: String,
	duration: Int,
	watched: Boolean
}

type Query {
	video: Video
	videos: [Video]
}

type Schema {
	query: Query
}
`);

const resolvers = {
	video: () => ({
		id: '1',
		title: 'bar',
		duration: 180,
		watched: true,
	}),
	videos: () => videos,
};

const query = `
	query myFirstQuery {
		videos {
			id
			title
			duration
			watched
		}
	}
`;

const videos = [
	{
		id: 'a',
		title: 'Drinking from the magic well',
		duration: 120,
		watched: false,
	},
	{
		id: 'b',
		title: 'The moose and the machine',
		duration: 240,
		watched: true,
	}
]

graphql(schema, query, resolvers)
	.then(result => console.log(result))
	.catch(error => console.log(error));
