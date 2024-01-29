import { baseUrl, repositoriesQuantity } from "/src/scripts/variables.js"

async function getRepositories(userName) {
    const response = await fetch(`${baseUrl}/${userName}/repos?per_page=${repositoriesQuantity}`)//filtrando para que busque uma certa quantidade de repositorios
    return await response.json()
}

export { getRepositories }