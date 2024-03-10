import React, { memo } from "react";

function ResultComponent({ response }: any) {
  const { agifyResponse, genderizeResponse, nationalizeResponse } = response;

  return (
    <div className="mt-5">
      <table className="table table-borderd">
        <thead>
          <tr>
            <th>Age</th>
            <th>Gender</th>
            <th>Country Code</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{agifyResponse.age}</td>
            <td>{genderizeResponse.gender}</td>
            <td>
              {nationalizeResponse.country
                .map((c: any) => c.country_id)
                .join(",")}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default memo(ResultComponent);
