React Server Components have been teased for what feels like a loooong time, at least in Internet years. The concept was first presented by the React team [back in December 2020](https://reactjs.org/blog/2020/12/21/data-fetching-with-react-server-components.html). Since then, the React team and others in the industry, including Vercel and Shopify, have been working on refining and implementing the concept.

If you aren’t familiar with React Server Components, or “RSC” for short, they are effectively a way to render React apps on the server _while keeping component code away from the browser_. This is different than the traditional React Server-Side Rendering that we’re familiar with today where all of an app’s JavaScript is sent to and re-executed in the browser. With RSC, you can pick and choose which components are server-only and which require client-side interactivity.

Although React Server Components are still in development and not ready for production, you can try them out today thanks to [Next.js’s experimental support](https://nextjs.org/docs/advanced-features/react-18/server-components).

**Disclaimer**: The concepts you’ll learn throughout the challenge will change by the time React Server Components are officially released. Treat this challenge as a way to get familiar with RSC’s ideas, not as a way to learn their exact APIs.

## Challenge

Your challenge, should you choose to accept it, is to build an RSS feed reader powered by React Server Components. The app will let you save feed items to a database and take advantage of new concepts only available with React Server Components.

Before getting into the details of the challenge, let’s take a quick tour of what you’ll be starting with.

## Tour

🐔 Risc, the React Server Chicken (”RSC” — get it? did you get it??), will be your guide throughout the challenge. If you see her throughout the code in your project, she’s there to give you a hint or explain some concepts. You might even see a few 🥚 eggs to give you ideas on how to take the app further.

You’ll start with a standard Next.js app created using `create-next-app` with the following additions:

- React Server Components have been enabled using an experimental flag in `next.config.js`.
- Tailwind CSS has been installed to handle styling.

A couple of helper functions have been written for you in the `lib` directory, but you’ll need to write the rest (🐔: ”Don’t get your feathers in a bunch; I’ll be there to help!”):

- `savedDB()` - A small API that lets you read and write to a JSON file just like a database.
- `fetchRSSFeedItems()` - A function to fetch items from a collection of RSS feeds. Only some of the code has been written for you. You and 🐔 Risc will need to come up with your own solution.

Additionally, a few React components have been provided as well:

- `<Feed>` - Renders a list of RSS feed items.
- `<FeedItem>` - An individual RSS feed item.
- `<SaveButton>` - Saves and unsaves an RSS feed item. Like `fetchRSSFeedItems()`, this one is mostly empty and awaits your coding skills to complete. 🧙

Finally, a pair of Next.js API routes in the `pages/api` directory have been included to save and unsave RSS feed items to the database. To keep things simple, the “database” is really just a JSON file saved at `db/saved.json`. Maybe you can upgrade this to a real database when you’re done with the challenge. 👀 (🐔: ”Hey! Leaving 🥚 eggs is my job!”)

## Challenge Steps

React Server Components cover a wide variety of cases, from rendering components on the server to data fetching management. To learn how everything works together, you and 🐔 Risc will be writing **five missing parts** of the RSS reader app.

1. Write a function in `lib/fetchRSSFeedItems.js` that fetches items from RSS feeds and sorts them by publication date.
   1. 🐔 **Hint**: “Since this function will only be called on the server, you aren’t limited by what the browser allows. Use any RSS loader and parser you want, browsers be damned! **squawk**”
   2. 🐔 **Hint**: “Day.js, a modern date helper library, will make sorting simple and reliable. Again, we don’t need to worry about browser limitations like bundle size since the function will only be used on the server.”
2. Use the `fetchRSSFeedItems()` function in the home page to display the list of RSS feed items. A starting file has been written for you at `pages/index.server.js`.
   1. 🐔 **Hint**: “Since you’re using Next.js, you’ll need to fetch data using the `getServerSideProps()` API. This tells Next.js to server-render the page on each request.”
   2. 🐔 **What to check for**: “Since the page is only rendered on the server, you’ll see a smaller JavaScript payload that does _not_ include anything used in `fetchRSSFeedItems()`. Speaking of fetching feed… brb. Snack time.”
3. Display the publication date for each RSS feed item using a relative format like “6 hours ago” by editing `<FeedItem>` in `components/FeedItem.server.js`.
   1. 🐔 **Hint**: “I’m back. Day.js includes a `relativeTime` plugin that adds a simple `from()` method which outputs the exact format you’ll need. Don’t say I didn’t help you.”
   2. 🐔 **What to check for**: “Since the component uses a `.server.js` file extension, it will only be rendered on the server. The client will not receive any JavaScript used in the component, nor will it re-run once the app has loaded. This means you can use heavy JavaScript date libraries without worrying about sending too much JavaScript to the browser!”
4. Create a `<SaveButton>` component in `components/SaveButton.client.js` that, when clicked, saves or unsaves a feed item using the `/api/save` and `/api/unsave` API endpoints.
   1. 🐔 **Hint**: “You can keep track of network loading states using React’s new Server Components-compatible `useTransition()` hook. One of my favorite React personalities, chantastic, has [a great video explaining it](https://www.youtube.com/watch?v=Kd0d-9RQHSw).”
   2. 🐔 **What to check for**: “Because the component uses a `.client.js` file extension, it will re-run in the browser (or “hydrate” if you want to be _technical_). This lets you include interactive elements, such as loading messages and keeping track of state. Anything you use in this component _will_ be included in the page’s JavaScript. Am I the world’s smartest chicken?”
5. Create a page to see all of your saved items.
   1. 🐔 **Hint**: “It’s copy-pasta time. The code for this page can look almost identical to the home page. Remember: the database saves feed items with the same properties as those coming from the live RSS feed. You should be able to pass the saved items to `<Feed>` as if they were actual RSS feed items.”
