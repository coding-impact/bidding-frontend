
async function handleResponse(response: Response) {
  try {
    return await response.json()
  } catch (error) {
    console.error(error)
    return { status: 'error', message: '發生了預期外的錯誤，請檢查網路連線' }
  }
}

// const apiServerOrigin = 'http://localhost:8787'
const apiServerOrigin = 'https://bidding.kulimi.workers.dev'

export async function fetch_api(path: string = "") {
  const response = await fetch(`${apiServerOrigin}/api${path}`, {
    method: "GET",
    credentials: "include",

  });
  return await handleResponse(response);
}

export async function post_api(path: string = "", data: object | null = null) {
  const response = await fetch(`${apiServerOrigin}/api${path}`, {
    method: "POST",
    headers: {

      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });
  return await handleResponse(response);
}
