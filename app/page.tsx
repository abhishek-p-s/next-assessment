"use client";

import { ChangeEvent, FormEvent, Fragment, useCallback, useState } from "react";
import ResultComponent from "./component/ResultComponent";

type FormValues = {
  name: string;
};

export default function Home() {
  const [formValues, setFormValues] = useState<FormValues>({ name: "" });
  const [response, setResponse] = useState<any>({});

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { name } = formValues;

    try {
      const [agifyResponse, genderizeResponse, nationalizeResponse] =
        await Promise.all([
          fetch(`https://api.agify.io?name=${name}`).then((response) =>
            response.json()
          ),
          fetch(`https://api.genderize.io?name=${name}`).then((response) =>
            response.json()
          ),
          fetch(`https://api.nationalize.io?name=${name}`).then((response) =>
            response.json()
          ),
        ]);
      console.log({ agifyResponse, genderizeResponse, nationalizeResponse });
      setResponse({ agifyResponse, genderizeResponse, nationalizeResponse });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <Fragment>
      <div className="border-[1px] border-[#cccc] p-5 w-full rounded-md flex justify-center">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-row w-full">
            <input
              type="text"
              name="name"
              placeholder="enter name"
              className="input w-full max-w-xs input-bordered"
              onChange={handleInputChange}
            />
            <button className="btn mx-4" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
      {Object.keys(response).length > 0 && (
        <ResultComponent response={response} />
      )}
    </Fragment>
  );
}
