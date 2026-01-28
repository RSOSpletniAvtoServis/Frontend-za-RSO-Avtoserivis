# Use the official PHP Apache image
FROM php:8.2-apache

# Set working directory in container
WORKDIR /var/www/html

# Copy your website files to the container
COPY . /var/www/html/
COPY insertLinks.js /var/www/html/
# Enable Apache mod_rewrite if needed
#RUN a2enmod rewrite

# Set proper permissions
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html

# Expose port 80
EXPOSE 80

# Start Apache in the foreground
CMD ["apache2-foreground"]