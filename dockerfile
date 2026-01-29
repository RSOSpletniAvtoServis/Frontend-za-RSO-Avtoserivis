# Use the official Apache image
FROM httpd:2.4

# Copy your website files into Apache's default directory
COPY . /usr/local/apache2/htdocs/