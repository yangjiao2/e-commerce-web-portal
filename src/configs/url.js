// const graphqlEndpoint = 'http://ecenhance.ioobot.cn/graphql';            // old schema fc mongodb
const graphqlEndpoint = 'http://ecommerce.ioobot.cn/graphql';
const graphqlFC = window.location.hostname !== 'localhost' ? window.location.origin+'/graphql' : graphqlEndpoint;

// const graphqlFC = 'http://ecommerce.ioobot.cn/graphql';      // new schema server mongodb
const storeFile = 'http://deploy.ioobot.cn/api/store-file';

export {graphqlFC, storeFile}

