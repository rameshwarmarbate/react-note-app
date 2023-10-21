import { map } from "lodash";
import { useNavigate } from "react-router-dom";
import useApi from "../hooks/useApi";
import { formatDate } from "../utils/helper";

const NoteList = () => {
  const navigate = useNavigate();
  const { loading, data, error } = useApi("");

  const onNewClick = () => {
    navigate("/add-note");
  };
  const onDetailClick = (_id) => {
    navigate(`/note-detail/${_id}`);
  };
  return (
    <div
      className="container main-container min-vh-100 min-vw-100"
      style={{ padding: "2rem" }}
    >
      <div className="row">
        <div className="col-md-1" />
        <div className="col-md-10 d-flex justify-content-between">
          <div>
            <label className="heading">Notes</label>
          </div>
          <div>
            <button className="new-button" onClick={onNewClick}>
              + New
            </button>
          </div>
        </div>
        <div className="col-md-1" />
      </div>
      <div className="row">
        <div className="col-md-1" />
        <div className="col-md-10">
          <ul>
            {map(data, ({ title, desc, createdAt, _id }) => {
              return (
                <li key={_id} onClick={() => onDetailClick(_id)}>
                  <div className="title">{title}</div>
                  <div className="desc">{desc}</div>
                  <div className="date">{formatDate(createdAt)}</div>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="col-md-1" />
      </div>
    </div>
  );
};

export default NoteList;
