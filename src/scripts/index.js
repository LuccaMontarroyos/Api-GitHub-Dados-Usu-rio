import { getUser } from "/src/scripts/services/user.js";
import { getRepositories } from "/src/scripts/services/repositories.js";
import { user } from "/src/scripts/objects/user.js";
import { screen } from "/src/scripts/objects/screen.js";
import { getEvents } from "/src/scripts/services/events.js";

document.getElementById('btn-search').addEventListener('click', () => {
    const userName = document.getElementById('input-search').value
    if (validateEmptyInput(userName)) return;
    getUserData(userName)
})

document.getElementById('input-search').addEventListener('keyup', (e) => {
    const userName = e.target.value
    const key = e.which || e.keyCode
    const isEnterKeyPressed = key === 13
    if (isEnterKeyPressed) {
        if (validateEmptyInput(userName)) return
        getUserData(userName)
    }
})

function validateEmptyInput(userName) {
    if (userName.length === 0) {
        alert('Preencha o campo com o nome do usuário do GitHub')
        return true 
    }
}

async function getUserData(userName) {
    const userReponse = await getUser(userName)
    if (userReponse.message === 'Not Found') {
        screen.renderNotFound()
        return
    }
    const repositoriesReponse = await getRepositories(userName)
    const eventsResponse = await getEvents(userName)
    user.setInfo(userReponse)
    user.setRepositories(repositoriesReponse)
    user.setEvents(eventsResponse)
    screen.renderUser(user)
    
}
