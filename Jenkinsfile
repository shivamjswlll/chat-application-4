pipeline {
    agent any

    tools {
        nodejs 'nodejs'  // Referencing the name you gave in Global Tool Configuration
    }

    environment {
        DOCKER_COMPOSE_PATH = "./docker-compose.yml"
    }

    stages {

        stage('Checkout Code') {
            steps {
                echo "Cloning repository..."
                git branch: 'main', url: 'https://github.com/shivamjswlll/chat-application-4.git'
            }
        }

        stage('Install Frontend Dependencies') {
            steps {
                echo "Installing frontend dependencies..."
                dir('frontend') {
                    sh 'npm install'
                }
            }
        }

        stage('Install Backend Dependencies') {
            steps {
                echo "Installing backend dependencies..."
                dir('backend') {
                    sh 'npm install'
                }
            }
        }

        stage('Docker Compose Build') {
            steps {
                echo "Building Docker containers using Docker Compose..."
                dockerComposeBuild()
            }
        }

        stage('Docker Compose Up') {
            steps {
                echo "Starting Docker containers using Docker Compose..."
                dockerComposeUp()
            }
        }

    }

    post {
        always {
            echo "Cleaning up unused docker images..."
            sh "docker image prune -af || true"
        }
        success {
            echo "Build completed successfully!"
        }
        failure {
            echo "Build failed!"
        }
    }
}
