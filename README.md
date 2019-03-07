
# graphql-server
Building a GraphQL server

## Preview GraphiQL interface
https://graphql-vallades.now.sh/graphql

## Example query

    query AllVideosQuery {
      videos {
        edges {
          node {
            title
          }
        }
      }
    }

## Example mutation

    mutation AddVideoQuery($input: AddVideoInput!) {
      createVideo(input: $input) {
        video {
          title
        }
      }
    }

Query variable:

    {
      "input": {
        "title": "Video Title",
        "duration": 300,
        "released": false,
        "clientMutationId": "abcd"
      }
    }

