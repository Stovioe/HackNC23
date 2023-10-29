const apiKey = '0ccb536496444666bc05d4fee8ce6f06';
const newsApiUrl = 'https://newsapi.org/v2/top-headlines';
const numArticles = 6; // Number of top articles to fetch
const categories = ['business', 'entertainment', 'sports', 'health', 'technology'];
//const arrayType = ['url', 'source'];

//get current date in js
const currentDate = new Date();
currentDate.setDate(currentDate.getDate() - 1);
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Month is 0-based, so add 1
const day = String(currentDate.getDate()).padStart(2, '0');

// yesterday's date formatted as 'year-month-day'
const formattedDate = `${year}-${month}-${day}`;

// Get the news articles from all sources
async function getTopNewsByCategory(category) {
    try {
        const response = await fetch(`${newsApiUrl}?apiKey=${apiKey}&country=us&from=formattedDate&category=${category}`);
        if (response.ok) {
            // Parse the JSON response into an object
            const data = await response.json(); 

            // Get the <ul> element with the id 'news-list' from your HTML
            const newsList = document.getElementById(`${category}-list`);

            // Extract the first 5 articles from the response. Filter out the removed articles
            articles = data.articles.filter((articles) => articles.url !== "https://removed.com");
          
        
            // Initialize an array to track the sources of collected articles
            const collectedSources = [];

            // Initialize an array to store the top headlines 
            const topHeadlines = [];

            //Create an array of top articles with unique news sources
            for (const article of articles) {
                if (!collectedSources.includes(article.source.name)) {
                    topHeadlines.push(article);
                    collectedSources.push(article.source.name);
                }
                if (topHeadlines.length == numArticles) {
                    break; // Stop when you have collected the desired number of articles
                }
            }
        
            
            // Loop through the articles and create <li> elements with links to the articles
            topHeadlines.forEach((article) => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `<a href="${article.url}" target="_blank">${article.title}</a>`;  
                newsList.appendChild(listItem);
            });
            
            
           // Initialize an array to store links of each news article for future access
           /*const newsLinks = [];
           const newsSources = [];

           topHeadlines.forEach((article) => {
                newsLinks.push(article.url);
                newsSources.push(article.source.name);
           })
           for (let i = 0; i < stringList.length; i++) {
            console.log(newsLinks[i]);
            }
/*
          if (arrayType == 'url') {
                return newsLinks;
           }
           else if (arrayType == 'source') {
                return newsSources;
           }
*/
        }
        
        else {
            console.error(`Failed to retrieve news data. Status code: ${response.status}`);
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

// Testing
categories.forEach((category) => {
    console.log(getTopNewsByCategory(category));
});
