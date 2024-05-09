
class URLShortener {
    constructor() {
      this.urlMap = new Map(); // Map to store short code to long URL mapping
      this.shortenedBaseURL = "https://short.url/"; // Base URL for the shortened links
      this.shortURLLength = 6; // Length of the shortened URL
    }
  
    // Function to generate a random alphanumeric string of fixed length
    generateRandomString(length) {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let randomString = '';
      for (let i = 0; i < length; i++) {
        randomString += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      return randomString;
    }
  
    // Function to shorten a long URL
    encodeURL(longURL) {
      if (!longURL || typeof longURL !== 'string') {
        throw new Error('Invalid URL');
      }
  
      let shortURL;
      do {
        // Generate a random short code
        shortURL = this.generateRandomString(this.shortURLLength);
      } while (this.urlMap.has(shortURL)); // Ensure short code is unique
  
      // Store the mapping of short code to long URL
      this.urlMap.set(shortURL, longURL);
      
      // Return the shortened URL
      return `${this.shortenedBaseURL}${shortURL}`;
    }
  
    // Function to decode a shortened URL and redirect to the original long URL
    decodeURL(shortURL) {
      const shortCode = shortURL.slice(-this.shortURLLength); // Extract short code from URL
      const longURL = this.urlMap.get(shortCode); // Retrieve long URL from map
  
      if (!longURL) {
        throw new Error('Shortened URL not found');
      }
  
      // Redirect user to the original long URL
      window.location.href = longURL;
    }
  }
  
  // Example usage
  const urlShortener = new URLShortener();
  
  // Shorten a long URL
  const shortenedURL = urlShortener.encodeURL('https://www.example.com/very/long/url/that/needs/to/be/shortened');
  
  // Output the shortened URL
  console.log('Shortened URL:', shortenedURL);
  
  // Decode the shortened URL and redirect to the original long URL
  urlShortener.decodeURL(shortenedURL);
  