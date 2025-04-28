FROM jenkins/jenkins:lts

USER root

# Install necessary dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release \
    sudo

# Add Docker GPG key
RUN curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Add Docker repository
RUN echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/debian $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker Engine (full installation)
RUN apt-get update && apt-get install -y --no-install-recommends docker-ce docker-ce-cli containerd.io

# Install Docker Compose (standalone binary)
RUN curl -SL "https://github.com/docker/compose/releases/download/v2.20.2/docker-compose-linux-$(uname -m)" -o /usr/local/bin/docker-compose && \
    chmod +x /usr/local/bin/docker-compose

USER jenkins

# Expose Docker daemon port (optional, for remote access to the inner Docker)
EXPOSE 2375