import { useRef, useState, useTransition } from "react";

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
  const ref = useRef(null);
  const [liveIsSaved, setLiveIsSaved] = useState();
  const isSaved = liveIsSaved ?? initialIsSaved;
  const [isPending, startTransition] = useTransition();

  const [x, setX] = useState();
  if (x) {
    x.read();
  }

  const toggle = () => {
    startTransition(() => {
      setX(suspensify(isSaved ? unsave() : save()));
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
      setLiveIsSaved(true);
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
      setLiveIsSaved(false);
    }
  };

  return (
    <button
      ref={ref}
      onClick={toggle}
      disabled={isPending}
      className={cn("capsize", isSaved && "font-bold text-rose-500")}
    >
      {isSaved ? "Unsave" : "Save"}
    </button>
  );
};

export default SaveButton;
