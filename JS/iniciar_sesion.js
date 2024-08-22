document.addEventListener('DOMContentLoaded', function() {
    // Credenciales de acceso
    const users = {
        admin: 'admin123',
        empleado: 'empleado',
    };

    const loginForm = document.getElementById('loginForm');
    const adminContent = document.getElementById('adminContent');
    const employeeContent = document.getElementById('employeeContent');
    const showAdminModalBtn = document.getElementById('showAdminModalBtn');
    const adminModal = document.getElementById('adminModal');
    const closeModal = document.querySelector('.modal .close');
    const loginBtn = document.getElementById('loginBtn');
    const error = document.getElementById('error');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    
    // Función para manejar el inicio de sesión
    loginBtn.addEventListener('click', function() {
        const username = usernameInput.value;
        const password = passwordInput.value;

        if (users[username] && users[username] === password) {
            loginForm.style.display = 'none';

            if (username === 'admin') {
                adminContent.style.display = 'block';
            } else {
                employeeContent.style.display = 'block';
            }
        } else {
            error.textContent = 'Usuario o contraseña incorrectos. Inténtalo de nuevo.';
        }
    });

    // Mostrar el modal al hacer clic en el botón
    showAdminModalBtn.addEventListener('click', function() {
        adminModal.style.display = 'flex';
    });

    // Cerrar el modal
    closeModal.addEventListener('click', function() {
        adminModal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === adminModal) {
            adminModal.style.display = 'none';
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const ticketForm = document.getElementById('ticketForm');
    const ticketTitle = document.getElementById('ticketTitle');
    const ticketDescription = document.getElementById('ticketDescription');
    const ticketsUl = document.getElementById('tickets');
    const clearTicketsButton = document.getElementById('clearTickets');

    // Cargar tickets desde el almacenamiento local
    loadTickets();

    ticketForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const title = ticketTitle.value;
        const description = ticketDescription.value;

        if (title && description) {
            // Crear un nuevo ticket
            const ticket = {
                title: title,
                description: description,
                seen: false
            };

            // Guardar el ticket en el almacenamiento local
            saveTicket(ticket);

            // Limpiar el formulario
            ticketTitle.value = '';
            ticketDescription.value = '';
        }
    });

    clearTicketsButton.addEventListener('click', function() {
        // Borrar todos los tickets del almacenamiento local
        localStorage.removeItem('tickets');
        loadTickets();
    });

    function saveTicket(ticket) {
        let tickets = getTicketsFromStorage();
        tickets.push(ticket);
        localStorage.setItem('tickets', JSON.stringify(tickets));
        loadTickets();

        ticketBD = {}
        ticketBD.Personal = "fdsaf"
        ticketBD.Usuario = ticket.title
        ticketBD.Problema = "safsa"

        try{   
            respuesta = fetch('http://localhost:3000/Tickets/nuevo', {  // REEMPLAZAR ACA POR LA RUTA CORRESPONDIENTE
                
                method: 'POST', //metodo HTTP -- REEMPLAZAR POR EL METODO CORRESPONDIENTE
                headers: {   //aca decimos que devuelve un JSON
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                //mode: 'no-cors',
                body: JSON.stringify(ticketBD)     //Acá van los datos del registro    
            })
            .then(response => {
                codigoResp = response.status;
                console.log("Respuesta de petición: "+response.status);
    
                //recargamos la pagina
                if(codigoResp >= 200 && codigoResp < 300){
                alert("Ticket hecho correctamente");
                console.log("Recargando pagina...")
                location.reload();
                }
            });
        }
        catch (error){
            //hubo un error
            console.log("Error en registro: " + error);
        }
    
    
    
    }

    function getTicketsFromStorage() {
        const tickets = localStorage.getItem('tickets');
        return tickets ? JSON.parse(tickets) : [];
    }

    function loadTickets() {
        const tickets = getTicketsFromStorage();
        ticketsUl.innerHTML = '';
        tickets.forEach((ticket, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>${ticket.title}</strong>
                <p>${ticket.description}</p>
                <span class="mark-as-seen${ticket.seen ? ' seen' : ''}" data-index="${index}">
                    ${ticket.seen ? '✓' : '✗'}
                </span>
            `;
            ticketsUl.appendChild(li);
        });
        
        // Agregar listeners a los botones de "marcar como visto"
        document.querySelectorAll('.mark-as-seen').forEach(button => {
            button.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                markAsSeen(index);
            });
        });
    }

    function markAsSeen(index) {
        let tickets = getTicketsFromStorage();
        tickets[index].seen = true;
        localStorage.setItem('tickets', JSON.stringify(tickets));
        loadTickets();
    }
});



