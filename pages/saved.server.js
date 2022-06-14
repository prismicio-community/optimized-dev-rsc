import * as savedDB from "../lib/savedDB";

import Layout from "../components/Layout.server.js";
import Feed from "../components/Feed.server";

export default function SavedPage({ saved }) {
  return (
    <Layout activeRoute="/saved">
      {saved.length > 0 ? (
        <Feed items={saved} saved={saved} />
      ) : (
        <p className="italic text-black/40 text-sm capsize">
          There&rsquo;s nothing here! Go save some stuff!
        </p>
      )}
    </Layout>
  );
}

export const getServerSideProps = async () => {
  const saved = await savedDB.load();

  return {
    props: {
      saved,
    },
  };
};
