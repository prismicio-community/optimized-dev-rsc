// 🐔 "This file contains a component to toggle saving and unsaving an RSS feed
//     item. In case you missed it, this file's name ends with `.client.js`.
//     That means it will be rendered on the server AND the client (the
//     browser). All of our readers on the receiving end will have to download
//     all the JavaScript used in this file, but that means we can do some
//     interesting interactive stuff."

import { useState } from "react";
import PulseLoader from "react-spinners/PulseLoader";

import { cn } from "../lib/cn";

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
  // 🐔 "Looks like we have `save()` and `unsave()` functions, but they aren't
  //     being used anywhere.
  //
  //    "This is the behavior I think we're aiming for:
  //       - When you click the button, it toggles between saving and unsaving.
  //
  //       - When `save()` or `unsave()` is called, we can display a loading
  //         message. Check out React's `useTransition()` hook if you want to try
  //         something new.

  const [clientSideIsSaved, setClientSideIsSaved] = useState();
  const isSaved = clientSideIsSaved ?? initialIsSaved;

  const toggle = () => {
    // 🐔 "This is probably where you'll need to use the `save()` and
    //     `unsave()` functions."
  };

  const save = async () => {
    await fetch("/api/save", {
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

    // The function is artificially delayed by 1 second so you can detect the
    // network request.
    await new Promise((res) => setTimeout(res, 1000));

    if (res.ok) {
      setClientSideIsSaved(true);
    }
  };

  const unsave = async () => {
    await fetch("/api/unsave", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ guid }),
    });

    // The function is artificially delayed by 1 second so you can detect the
    // network request.
    await new Promise((res) => setTimeout(res, 1000));

    if (res.ok) {
      setClientSideIsSaved(false);
    }
  };

  // 🐔 "Good luck. This part might be difficult. I encourage you to build this
  //     using `useTransition()` so you can learn what it is and how it relates to...
  //
  //     ...wait for it...
  //
  //
  //     ...Suspense. Speaking of Suspense, you'll probably need to use the
  //     `suspensify()` function from `lib/suspensify.js`"

  return (
    <button
      onClick={toggle}
      className={cn("capsize", isSaved && "font-bold text-rose-500")}
    >
      {isSaved ? "Unsave" : "Save"}
    </button>
  );
};

export default SaveButton;
