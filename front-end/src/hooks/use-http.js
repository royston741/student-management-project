
export default function useHttp() {

  const fetchData = async (request) => {
    let response = await fetch(request.url, {
      method: request.method ? request.method : "GET",
      body: request.body ? JSON.stringify(request.body) : null,
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return await response.json();

  };
  return fetchData;
}
