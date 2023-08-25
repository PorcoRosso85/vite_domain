export async function expressFetchData() {
  console.log('Attempting to fetch data...');
  try {
    const res = await fetch('/api/data', { mode: 'cors' });
    console.log('Response received:', res);
    const data = await res.json();
    console.log('Data parsed:', data);
    return data;
  } catch (error) {
    console.error('Fetch failed: ', error);
    return null;
  }
}

export const fetchedDataPromise = expressFetchData();
