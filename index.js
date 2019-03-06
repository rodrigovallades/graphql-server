'use strict';

const express = require('express');
const graphqlHTTP = require('express-graphql');
const { graphql, buildSchema } = require('graphql');

const PORT = process.env.PORT || 3000;
const server = express();

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

server.use('/graphql', graphqlHTTP({
	schema,
	graphiql: true,
	rootValue: resolvers,
}));

server.listen(PORT, () => {
	console.log(`Listening on http://localhost:${PORT}`);

});
