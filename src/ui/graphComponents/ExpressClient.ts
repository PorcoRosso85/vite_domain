async function expressFetchData() {
  console.log('Attempting to fetch data...');
  try {
    // const res = await fetch('http://localhost:3000/api/data', { mode: 'cors' });
    const res = await fetch('/api/data', { mode: 'cors' });
    console.log('Response received:', res);
    const data = await res.json();
    console.log('Data parsed:', data);
  } catch (error) {
    console.error('Fetch failed: ', error);
  }
}

export { expressFetchData };
