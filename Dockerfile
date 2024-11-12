# Stage 1: Build Stage
FROM node:18 AS build

# Set working directory in the container
WORKDIR /app

# Clone the repository with a specific tag
# Replace <GIT_REPOSITORY_URL> with your repository URL
# Replace <TAG> with the desired tag
RUN mkdir mp
RUN git clone --branch v2.49.0 https://bitbucket.org/geowerkstatt-hamburg/masterportal.git ./mp

COPY plugins /app/mp/addons

# Install dependencies
RUN npm --prefix ./mp install

# Install dependencies
RUN npm --prefix ./mp/addons ci

# Install dependencies
RUN npm --prefix ./mp/addons/dipasAddons/dataNarrator install --legacy-peer-deps

# Copy the "portal" folder to /app/portal/portal
COPY portal /app/mp/portal/portal

# Build the project
RUN npm --prefix ./mp run buildPortal


FROM httpd:2.4 AS final

# Set working directory in the container
WORKDIR /usr/local/apache2/htdocs/

# Copy specific folders from the build stage
COPY --from=build /app/mp/dist/portal .
COPY --from=build /app/mp/dist/build ./build
COPY --from=build /app/mp/dist/mastercode ./mastercode
