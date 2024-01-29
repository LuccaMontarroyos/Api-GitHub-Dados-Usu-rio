const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user) {
        this.userProfile.innerHTML = `<div class="info">
                                        <img src = "${user.avatarUrl}" alt = "foto do perfil do usuário"/>
                                         <div class = "data">
                                            <h1>${user.name ?? 'Não possui nome cadastrado 😢'}</h1>
                                            <p>${user.bio ?? 'Não possui bio cadastrada 😢'}</p>
                                            <p>Seguidores: ${user.followers}</p>
                                            <p>Seguindo: ${user.following}</p>    
                                        </div>
                                     </div>`
        // ?? serve para quando o campo estiver nulo daí colocamos a informação que iremos passar

        let repositoriesItens = ""
        user.repositories.forEach(repo => repositoriesItens += `<li><a href="${repo.html_url}" target="_blank">${repo.name}<br><br><span>🍴${repo.forks_count}</span><span>⭐${repo.stargazers_count}</span><span>👀${repo.watchers_count}</span><span>🧑‍💻${repo.language}</span></a></li>`);

        if (user.repositories.length > 0) {
            this.userProfile.innerHTML += `<div class="repositories section">
                                            <h2>Repositórios</h2>
                                            <ul>${repositoriesItens}</ul>
                                           </div>`
            // += para que possamos concatenar com o que ja colocamos na função getUserProfile, se colocassemos apenas = ele sobrescreveria o que ja teriamos colocado
        }
        let eventsItens = ""
        user.events.forEach(event => {
            let eventDescription
            if (event.payload.description === null) {
                eventDescription = event.type
            } else {
                eventDescription = event.payload.commits[0].message
            }
            eventsItens += `<li><strong>${event.repo.name}</strong>    - ${eventDescription}</li>`
        })

        if (user.events.length > 0) {

            this.userProfile.innerHTML += `<div class="events section">
                                            <h2>Eventos</h2>
                                            <ul>${eventsItens}</ul>
                                           </div>`
        }
    },
    renderNotFound() {
        this.userProfile.innerHTML = '<h3>Usuário não encontrado</h3>'
    }
}

export { screen }