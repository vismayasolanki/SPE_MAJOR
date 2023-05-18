pipeline{
agent any
environment{
    dockerhub=credentials('docker_hub')
    PATH = "/opt/homebrew/bin:$PATH"
    

}
	stages{
		stage("Git pull ")
		{
			steps
			{ 
			    git url:'https://github.com/vismayasolanki/SPE_MAJOR.git',branch:'master'
			}
		}

		stage("Build Backend Docker Image")
		{
			steps
			{
				echo "build backend docker Image"
				sh "/opt/homebrew/bin/docker build -t vismayasolanki/backend server/"
			}
		}

		stage("Build Frontend Docker Image")
		{
			steps
			{
				echo "build frontend docker Image"
				sh "/opt/homebrew/bin/docker build -t vismayasolanki/frontend client/"
			}
		}
		stage("Login to Docker Hub")
		{
			steps
			{
				sh "/opt/homebrew/bin/docker logout"
				sh "echo $dockerhub_PSW | /opt/homebrew/bin/docker login -u $dockerhub_USR --password-stdin"
			}
		}
		stage("Push Backend Docker Image to Docker Hub")
		{
			steps
			
			{ 	echo "Push Backend Docker Image to Docker Hub"
				sh "/opt/homebrew/bin/docker push vismayasolanki/backend"	
			}
		}

		stage("Push Frontend Docker Image to Docker Hub")
		{
			steps
			
			{ 	echo "Push frontend Docker Image to Docker Hub"
				sh "/opt/homebrew/bin/docker push vismayasolanki/frontend"	
			}
		}
		stage("Removing Docker Images from Local ")
		{
			steps
			{ 	echo "Removing Docker Images from Local"
				sh "/opt/homebrew/bin/docker rmi vismayasolanki/frontend"
				sh "/opt/homebrew/bin/docker rmi vismayasolanki/backend"	
				}
		}

        stage('Ansible Deployment') {
            steps {
                script {
                    sh 'ansible-playbook -i inventory deploy.yml'
                }
            }
        }
	}
}
