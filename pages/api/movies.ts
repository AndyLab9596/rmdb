import type { NextApiRequest, NextApiResponse } from "next";
// API urls
import { SEARCH_BASE_URL, POPULAR_BASE_URL } from "../../config";
// Basic fetch 
import { basicFetch } from "../../api/fetchFunction";
// Types
import type { Movie, Movies } from "../../api/types";

export default async function handler(req: NextApiRequest, res: NextApiResponse<Movies>) {
    const { page, search } = req.query;
    const endpoint = search ? `${SEARCH_BASE_URL}${search}&page=${page}` : `${POPULAR_BASE_URL}&page=${page}`;
    const data = await basicFetch<Movies>(endpoint);
    res.status(200).json(data);
}