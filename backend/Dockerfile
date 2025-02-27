FROM payara/server-full:5.2022.2

# Set environment variables
ENV DEPLOY_DIR ${PAYARA_DIR}/deployments
ENV DOMAIN_NAME domain1
ENV PAYARA_ARGS --debug

# Copy the WAR file to the deployments directory
COPY target/taskmanagement.war ${DEPLOY_DIR}/

# Expose the ports
EXPOSE 8080 9009

# Start Payara Server
CMD ["asadmin", "start-domain", "--verbose", "${DOMAIN_NAME}"]