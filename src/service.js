export const baseUrl = "http://localhost:8080";

export const getAllEntry = async (
  url
) => {
  try {
    const response = await fetch(baseUrl + url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("GET All - ", data);

    return data;
  } catch (error) {
    return [];
  }
};

export const getEntryById = async (
  url,
  entryId
) => {
  try {
    const response = await fetch(baseUrl + url + entryId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("GET By Id - ", data);

    return data;
  } catch (error) {
    console.error("There was an error!", error);
  }
};

export const createNewEntry = async (
  url,
  jsObject
) => {
  try {
    const response = await fetch(baseUrl + url, {
      headers: { "Content-Type": "application/json; charset=utf-8" },
      method: "POST",
      body: JSON.stringify(jsObject),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Create - ", data);

    return data;
  } catch (error) {
    console.error("There was an error!", error);
  }
};

export const updateExistingEntry = async (
  url,
  entryId,
  jsObject
) => {
  try {
    const response = await fetch(baseUrl + url + entryId, {
      headers: { "Content-Type": "application/json; charset=utf-8" },
      method: "PUT",
      body: JSON.stringify(jsObject),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

  } catch (error) {
    console.error("There was an error!", error);
  }
};

export const deleteEntry = async (
  url,
  entryId
) => {
  try {
    const response = await fetch(baseUrl + url + entryId, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error("There was an error!", error);
  }
};
