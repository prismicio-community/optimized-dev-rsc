import { useState, useTransition } from "react";
import PulseLoader from "react-spinners/PulseLoader";

import { cn } from "../lib/cn";

const suspensify = (promise) => {
  let status = "pending";
  let result;
  let suspender = promise.then(
    (r) => {
      status = "success";
      result = r;
    },
    (e) => {
      status = "error";
      result = e;
    }
  );

  return {
    read() {
      if (status === "pending") {
        throw suspender;
      } else if (status === "error") {
        throw result;
      } else if (status === "success") {
        return result;
      }
    },
  };
};

const SaveButton = ({
  initialIsSaved,
  guid,
  title,
  url,
  feedTitle,
  feedURL,
  publishedAt,
  commentsURL,
}) => {
  const [clientSideIsSaved, setClientSideIsSaved] = useState();
  const isSaved = clientSideIsSaved ?? initialIsSaved;

  const [isPending, startTransition] = useTransition();
  const [networkRequest, setNetworkRequest] = useState();
  if (networkRequest) {
    networkRequest.read();
  }

  const toggle = () => {
    startTransition(() => {
      setNetworkRequest(suspensify(isSaved ? unsave() : save()));
    });
  };

  const save = async () => {
    const res = await fetch("/api/save", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        guid,
        title,
        url,
        feedTitle,
        feedURL,
        publishedAt,
        commentsURL,
      }),
    });

    await new Promise((res) => setTimeout(res, 1000));

    if (res.ok) {
      setClientSideIsSaved(true);
    }
  };

  const unsave = async () => {
    const res = await fetch("/api/unsave", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ guid }),
    });

    await new Promise((res) => setTimeout(res, 1000));

    if (res.ok) {
      setClientSideIsSaved(false);
    }
  };

  if (isPending) {
    return (
      <div className="capsize">
        <PulseLoader color="currentColor" size={4} />
      </div>
    );
  } else {
    return (
      <button
        onClick={toggle}
        className={cn("capsize", isSaved && "font-bold text-rose-500")}
      >
        {isSaved ? "Unsave" : "Save"}
      </button>
    );
  }
};

export default SaveButton;
