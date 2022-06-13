import { useRef, useState } from "react";
import { cn } from "../lib/cn";

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

  const toggle = async () => {
    try {
      if (ref) {
        ref.current.disabled = true;
      }

      if (isSaved) {
        await unsave();
      } else {
        await save();
      }
    } finally {
      if (ref) {
        ref.current.disabled = false;
      }
    }
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

    if (res.ok) {
      setLiveIsSaved(true);
    }
  };

  const unsave = async () => {
    // if (!window.confirm(`Are you sure you want to unsave "${title}"?`)) {
    //   return;
    // }

    const res = await fetch("/api/unsave", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ guid }),
    });

    if (res.ok) {
      setLiveIsSaved(false);
    }
  };

  return (
    <button ref={ref} onClick={toggle}>
      <span className={cn("capsize", isSaved && "font-bold text-red-500")}>
        {isSaved ? "Unsave" : "Save"}
      </span>
    </button>
  );
};

export default SaveButton;
