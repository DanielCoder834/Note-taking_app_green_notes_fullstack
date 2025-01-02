## Frontend Explanation

The Code is broken down into different parts, and I am hoping this readme can help explain it for future me and developers for this part of the code

# The Folder Structure

The way I structured the folders is to make it easier to understand the layout of the website and the code.
There are five folders within the src folder

- Pages

   - Pages are where the bulk of the website is located. The pages contains the main page of the sites sometimes with its own stylesheet and a folder for its components.
   - For smaller pages like the forgot-password page, it only contains a file with the page component
   - For the future, I hope to remove the stylesheets and just make them inline styles with tailwind

- General

   - General is where I keep files that are intended for multiple uses such as a helper function for cookies to api calls to a server to generic components like a loading page to different enums and types.
   - Within the folder, it contains 6 folders, an api folder, a general component folder, a helper folder, a hooks folder, a lotties folder, and a types folder
   - In the future, I hope to reduce the number of folder by combining so of them together

- Layout

   - Contains the general layout of the website
   - Only one file, with the elements you want to appear on every page, and a  element to represent the page component

- Style

   - Style is folder for general styles
   - Only used for root and app styles, barely used

- Assets

   - Contains all the cool photos on the site
   - For the future, I need to add contributions somewhere on the site

# Terminal Commands

I remember spending a week looking for the right commands to use for one of my sites. NEVER AGAIN!!! I have not chosen a hosting site. I might use netlify, but I am not sure. Maybe Vercel

- Vite + npm Commands (comes with vite):

   - To run the code in development mode: `npm run dev`
   - To build the site for deployment run: `npm run build`

- Netlify-cli Commands (have to install separately):

   - Disclaimer: specify dist
   - To build the netlify application: `ntl build`
   - To deploy the netlify application: `ntl deploy`
   - To deploy the netlify application to prod: `ntl deploy --prod`

# Libraries + Technologies used

For future contributors, here is the list of technologies you need to install. If you are not sure if you have it installed, you can try to look up their version command and run it in your terminal

- Typescript
- Vite.js
- Npm - (I recommend installing it with NVM as it will be easier to manage updates and versions)
- Tailwind.css

Any library used in the typescript or tsx code, just run the `npm install` command and it will install all of those libraries automatically

# Heads Up

- Please make sure the backend is running the same time as the frontend code

- If you save your file (assuming you don't have autosave on), it will update the page instantly with vite.js

- I ran into a weird glitch, where my files kept on getting duplicated. I think it's a vscode specific issue.
   I fixed it by changing my vscode settings for a search feature. I forgot what it's called.

- No need to mess with the lottie file. Any animation you don't want to do with code, can be replaced with a lottie json

- Do not make any hooks global variables.
Eg.

Not:

```tsx {"id":"01J3DV1PEYMATXHRDSAFAMHJ1X"}
let hook = useHook();
export const Component {
  return <div>Example</div>
  }
```

Do this instead:

```tsx {"id":"01J3DV1PEYMATXHRDSAH5CJ0E3"}

export const Component {
let hook = useHook();
return <div>Example</div>
}
```

- Please limit prop drilling to a minimum
  
- use useEffect and useState to do async calls to the api

- Please name variables well and happy coding :)
