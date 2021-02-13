rm -r build/
npm run build
scp -r build/* dalytica@dalytica.com:~/nana-scraper.dalytica.com/
