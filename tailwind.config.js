/ @type {import('tailwindcss').Config} */
module.exports = {
 content: [
   "./src//*.{html,js,ts,jsx,tsx}",
 ],
 theme: {
   extend: {
     colors: {
       brand: '#4f46e5',
     },
   },
 },
 plugins: [],
}