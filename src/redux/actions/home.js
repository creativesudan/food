import { CATEGORY_LOADED } from "./types";
import agent from "../../agent";

export const fetch_categories = () => {
    return {
        type: CATEGORY_LOADED,
        payload: agent.Category.all()
    }
}

