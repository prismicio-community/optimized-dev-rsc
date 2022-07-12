/**
 * 🐔 "This file contains a component to toggle saving and unsaving an RSS feed
 *     item. In case you missed it, this file's name ends with `.client.js`.
 *     That means it will be rendered on the server AND the client (the
 *     browser). All of our readers on the receiving end will have to download
 *     all the JavaScript used in this file, but that means we can do some
 *     interesting interactive stuff."
 */

import { useState, useTransition } from "react";
import PulseLoader from "react-spinners/PulseLoader";

import { cn } from "../lib/cn";
import { suspensify } from "../lib/suspensify";

/**
 * A button that saves or unsaves an RSS feed item. It toggles between
 * save/unsave depending on whether the item is already saved.
 *
 * Note: This component renders on the server *and* client since its filename
 * ends with `.client.js`. Its JavaScript *will* be sent to the browser.
 */
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
