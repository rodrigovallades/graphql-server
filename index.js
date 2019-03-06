'use strict';

const express = require('express');
const graphqlHTTP = require('express-graphql');
const {
	GraphQLBoolean,
	GraphQLID,
	GraphQLInt,
	GraphQLObjectType,
	GraphQLSchema,
	GraphQLString,
} = require('graphql');

const PORT = process.env.PORT || 3000;
const server = express();

const videoType = new GraphQLObjectType({
	name: 'Video',
	description: 'A video',
	fields: {
		id: {
			type: GraphQLID,
			description: 'The ID of the video.',
		},
		title: {
			type: GraphQLString,
			description: 'The title of the video.',
		},
		duration: {
			type: GraphQLInt,
			description: 'The duration of the video (in seconds).',
		},
		watched: {
			type: GraphQLBoolean,
			description: 'Whether or not the video has been watched.',
		},
	}
});

const queryType = new GraphQLObjectType({
	name: 'QueryType',
	description: 'The root querty type.',
	fields: {
		video: {
			type: videoType,
			resolve: () => new Promise((resolve) => {
				resolve({
					id: 'a',
					title: 'GraphQL',
					duration: 180,
					watched: false,
				});
			}),
		},
	},
});

const schema = new GraphQLSchema({
	query: queryType,
});

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
}));

server.listen(PORT, () => {
	console.log(`Listening on http://localhost:${PORT}`);

});
