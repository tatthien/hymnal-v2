import { algoliasearch } from 'algoliasearch';
import { getSongs } from './app/hymns';

const client = algoliasearch(
  process.env.ALGOLIA_APP_ID as string,
  process.env.ALGOLIA_INDEX_API_KEY as string
);

// Fetch and index objects in Algolia
const processRecords = async (collection = 'hymns') => {
  const hymns = await getSongs(collection)
  return await client.saveObjects({
    indexName: 'hymns_index',
    objects: hymns.map((hymn) => ({
      ...hymn,
      content: hymn.content?.replace(/<[^>]*>/g, ''),
      objectID: hymn.collection + '-' + hymn.slug
    }))
  });
};

processRecords('hymns')
  .then(() => console.log('Successfully indexed hymns!'))
  .catch((err) => console.error(err));

processRecords('tvchh')
  .then(() => console.log('Successfully indexed tvchh!'))
  .catch((err) => console.error(err));
