import axios from "axios";

export default {
  runSearch: function(queryURL) {
    return axios.get(queryURL);
  },
  // Gets all articles
  getArticles: function() {
    return axios.get("/api/articles");
  },
  // Gets the article with the given id
  getArticle: function(id) {
    return axios.get("/api/articles/" + id);
  },
  // Deletes the article with the given id
  deleteArticle: function(id) {
    return axios.delete("/api/articles/" + id);
  },
  // Saves an article to the database
  saveArticle: function(articleData) {
    return axios.post("/api/articles", articleData);
  },
  // BEGIN MY CODE FOR UPDATING (added comma above also)
  // Updates an article in the database
  updateArticle: function(articleData) {
    let id = articleData.userId;
    let articleDataNew = {
         highScore: articleData.highScore,
         tutorialComplete: articleData.tutorialComplete
    };
    return axios.put("/api/articles/" + id , articleDataNew);
  }
  // END MY CODE FOR UPDATING
};
