import os
import getpass

# Récupérer le nom de l'utilisateur
username = getpass.getuser()

# Récupérer le nom et le chemin du répertoire cloné
repo_path = os.environ['PWD']
repo_name = os.path.basename(repo_path)

# Ajouter le nom d'utilisateur au nom du répertoire
new_repo_name = f"{repo_name}_{username}"

# Renomer le répertoire cloner

os.rename(repo_path, new_repo_name)
