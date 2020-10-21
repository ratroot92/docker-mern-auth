#/bin/bash
 service nginx start && service php7.2-fpm start && service mysql start
cd  examNode
npm run dev 
