import { apiCall } from "../../common/services/api";
import alerts from "../alerts";
import loader from "../loader";
import { LOAD_SUMMARY, REMOVE_SUMMARY } from "../actionTypes";

const { addError } = alerts.actions;
const { addLoader, removeLoader } = loader.actions;

export const loadSummary = (summary) => ({
  type: LOAD_SUMMARY,
  summary,
});

export const removeSummary = () => ({
  type: REMOVE_SUMMARY,
});

export const fetchSummary = (reading_id) => {
  return (dispatch) => {
    dispatch(addLoader(reading_id));
    console.log(reading_id);
    return apiCall("get", `/readings/${reading_id}/summary`)
      .then((res) => {
        dispatch(loadSummary(res));
        dispatch(removeLoader(reading_id));
      })
      .catch((err) => {
        dispatch(addError(err.message));
      });
  };
};
