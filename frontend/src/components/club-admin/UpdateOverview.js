import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAdmin from "../../utils/useAdmin";
import { getClubByIdApi } from "../../services/apis/public/clubApis.public";
import { updateClubApi } from "../../services/apis/private/clubApis.private";

function UpdateOverview() {
  const [clubName, setClubName] = useState("");
  const [description, setDescription] = useState();

  const location = useLocation();
  const clubId = location.pathname.split("/")[2];
  const navigate = useNavigate();
  const { admin } = useAdmin();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const response = await getClubByIdApi({ id: clubId });

    if (response.data) {
      setDescription(response.data.clubDescription);
      setClubName(response.data.clubName);
    }
  }

  async function updateOverview() {
    const body = { clubId, newClubName: clubName, newClubDescription: description };
    const response = await updateClubApi({ body, token: admin.accessToken });

    if (response.data) navigate(-1);
  }

  if (!description) {
    return <div>loading....</div>;
  }

  return (
    <div className="p-2 m-4 flex justify-center items-center w-9/12">
      <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col w-9/12">
        <h1 className="font-bold text-3xl m-2">{clubName}</h1>
        <label className="mx-2">description:</label>
        <textarea value={description} rows={8} onChange={(e) => setDescription(e.target.value)} className="border-yellow-300 border-2 m-2 p-2" />
        <input className="m-2" type="file"></input>
        <div className="m-2">
          <button type="submit" className="px-4 py-2 bg-yellow-300 rounded-lg m-2" onClick={updateOverview}>
            save
          </button>
          <button type="cancel" className="px-4 py-2 bg-yellow-300 rounded-lg m-2" onClick={() => navigate(-1)}>
            cancle
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateOverview;
