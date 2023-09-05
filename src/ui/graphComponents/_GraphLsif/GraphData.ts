import { GraphData, TreeGraphData } from '@antv/g6';

export async function expressFetchData(): Promise<
  GraphData | TreeGraphData | undefined
> {
  console.log('Attempting to fetch data...');
  try {
    const res = await fetch('/api/data', { mode: 'cors' });
    console.log('Response received:', res);
    const data = await res.json();
    console.log('Data parsed:', data);
    return data;
  } catch (error) {
    console.error('Fetch failed: ', error);
    return undefined;
  }
}

export const fetchedDataPromise: Promise<
  GraphData | TreeGraphData | undefined
> = expressFetchData();
