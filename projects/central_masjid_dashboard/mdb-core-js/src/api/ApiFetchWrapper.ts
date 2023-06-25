export function fetchWrapper(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
    return fetch(input, init);
}
