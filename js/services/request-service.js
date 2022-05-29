import RequestException from "./exceptions/request-exception.js";

export async function getJson(url) {
  try {
    const resp = await fetch(url);
    const jsonBody = await resp.json();
    return jsonBody;
  } catch (e) {
      throw new RequestException("Error making request")
  }
}
