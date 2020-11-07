# Motivation



With the advent of powerful machine learning algorithms, more and more of our applications are becoming data-driven. The largest source of information humankind has managed to accumulate is the internet. When we think of internet as a source of useful data, we think of scraping text, images and other valuable information from web pages. The acquired data would be wrangled, cleaned and transformed into a format suitable for further analysis and predictive modeling. A big chunk of the feature engineering process had been made obsolete by Deep Learning.

The internet is full of structured data. When we scrape the web we try to get rid of this structural information. Imagine using this information as part of Data Analysis. Let's be a little bit bolder and imagine building a predictive model that can directly train on structured content on web pages. An ambitious idea indeed.

A web page consists of text content distributed spatially in such a way that keeps the reader focussed. Another way to look at a page is by inspecting it with developer tools. It shows the elements in a web page as a tree. We call this the DOM (Document Object Model) tree. In this article, I'll showcase a tool I built for visualizing DOM tree of web pages - webG. I will do a step-by-step walkthrough of the project's development process.

Now why would you want to visualize the DOM tree? Isn't that supposed to be hidden from the user?

>  A change in perspective is worth 80 IQ points.

Visualization of DOM trees as graphs reveals not-so-obvious, interesting and potentially useful information about the web page. webG offers you a new set of lens to look at the internet. Do with it what you will!





