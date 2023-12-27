import React from "react";

export default function useFetch(URL, options) {
  const [isLoading, setLoading] = React.useState();
  const [isError, setError] = React.useState();

  async function request() {
    let data;
    let response;
    try {
      setLoading(true);
      response = await fetch(URL, options);
      const json = await response.json();
      data = json;
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }

    return { data, response };
  }

  return { request, isLoading, isError };
}