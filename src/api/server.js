export async function makeRequest(url) {
    let baseUrl = 'http://faceprog.ru/reactcourseapi';
    let response = await fetch(baseUrl + url);
    let data = await response.json();
    return data;
}