import axios from "axios";

const CancelToken = axios.CancelToken;

export const getAmadeusData = params => {

  const { keyword = "", page = 0, city = true, airport = true } = params;
  const subTypeCheck = city && airport ? "CITY,AIRPORT" : city ? "CITY" : airport ? "AIRPORT" : ""
  const searchQuery = keyword ? keyword : "a";
  const source = CancelToken.source();
  const out = axios.get(
    `/api/airports/?keyword=${searchQuery}&page=${page}&subType=${subTypeCheck}`,
    {
      cancelToken: source.token
    }
  )

  return { out, source }
};
