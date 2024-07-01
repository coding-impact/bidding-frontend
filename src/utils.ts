

export function required(v: string | number) {
  return !!v || "此欄位不得留空";
}

export function isNumber(v: string) {
  if (!v) {
    return "此欄位必須填入數字"
  }

  const inputNumber = Number(v)
  if (!Number.isInteger(inputNumber)) {
    return "請填入正整數"
  }

  if (inputNumber < 1000) {
    return "競標底價為 1000"

  }
  if (((inputNumber - 1000) % 500) != 0) {
    return "每標為 500"
  }
  return true;
}

async function handleResponse(response: Response) {
  try {
    return await response.json()
  } catch (error) {
    console.error(error)
    return { status: 'error', message: '發生了預期外的錯誤，請檢查網路連線' }
  }
}

// const apiServerOrigin = 'http://localhost:61888'
const apiServerOrigin = 'https://bidding.kulimi.workers.dev'

export async function fetch_api(path: string = "") {
  const response = await fetch(`${apiServerOrigin}/api${path}`, {
    method: "GET",
    credentials: "include",
    // headers: {
      // Cookie: `token=${localStorage.getItem('token')}; username=${localStorage.getItem('username')}`
    // }
  });
  return await handleResponse(response);
}

export async function post_api(path: string = "", data: any | null = null) {
  
  const response = await fetch(`${apiServerOrigin}/api${path}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      // Cookie: `token=${localStorage.getItem('token')}; username=${localStorage.getItem('username')}`
    },
    body: JSON.stringify(data),
    credentials: "include",
  });
  return await handleResponse(response);
}
