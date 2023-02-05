import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'https://spacex-production.up.railway.app/',
  documents: ['src/**/*.tsx'],
  generates: {
    './lib/__gql__/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
      }
    }
  },
  
  ignoreNoDocuments: true,
};

export default config;