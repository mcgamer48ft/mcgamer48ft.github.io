document.addEventListener('DOMContentLoaded', function () {
    const terminalInput = document.getElementById('terminal-input');
    const terminalOutput = document.getElementById('terminal-output');
    const welcomeMessage = document.getElementById('welcome-message');
    const fakeShutdown = document.getElementById('fake-shutdown');
    const tnt = document.getElementById('tnt');
    const tntImg = document.getElementById('tnt-img');
    
    let currentUser = 'root';

    setTimeout(() => {
        welcomeMessage.style.display = 'none';
    }, 5000);

    const commands = {
        help: `Available commands:
    help - Display this help message
    contact - Display contact information
    github - Open GitHub profile
    discord - Display Discord server info
    skills - Display list of skills
    clear - Clear the terminal
    su - Switch user
    apt - Install packages`,
        
        contact: 'Email: defnotxylex@gmail.com',
        github: 'https://github.com/mcgamer48ft',
        discord: 'Discord: iskidtoomuch',
        skills: 'HTML, CSS, JavaScript, Python, etc.'
    };
    
    terminalInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            const inputText = terminalInput.value.trim();
            if (inputText.length > 0) {
                processCommand(inputText);
                terminalInput.value = '';
            }
        }
    });

    function processCommand(command) {
        const output = document.createElement('div');
        output.textContent = `$ ${command}`;
        terminalOutput.appendChild(output);
        
        if (command.startsWith('sudo apt install shutdown')) {
            promptForPassword();
        } else if (command === 'clear') {
            terminalOutput.innerHTML = '';
        } else if (commands[command]) {
            const result = document.createElement('div');
            result.textContent = commands[command];
            terminalOutput.appendChild(result);
        } else if (command.startsWith('su')) {
            switchUser(command.split(' ')[1]);
        } else if (command === 'shutdown') {
            initiateShutdown();
        } else {
            const error = document.createElement('div');
            error.textContent = `Command not found: ${command}`;
            terminalOutput.appendChild(error);
        }

        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }

    function promptForPassword() {
        const password = prompt('Enter sudo password:');
        if (password === '1234') {
            const loading = document.createElement('div');
            loading.textContent = 'Installing shutdown ...';
            terminalOutput.appendChild(loading);
            
            let progress = 0;
            const loadingBar = setInterval(() => {
                progress += 10;
                loading.textContent += '.';
                if (progress >= 100) {
                    clearInterval(loadingBar);
                    loading.textContent = 'shutdown installed.';
                    terminalOutput.appendChild(loading);
                    terminalOutput.scrollTop = terminalOutput.scrollHeight;
                }
            }, 300);
        } else {
            const error = document.createElement('div');
            error.textContent = 'Incorrect password.';
            terminalOutput.appendChild(error);
        }
    }

    function switchUser(user) {
        if (user !== 'me') {
            user = 'root';
        }
        currentUser = user;
        const output = document.createElement('div');
        output.textContent = `Switched to user ${user}`;
        terminalOutput.appendChild(output);
    }

    function initiateShutdown() {
        fakeShutdown.style.display = 'flex';
        
        document.getElementById('restart-btn').addEventListener('click', () => {
            fakeShutdown.style.display = 'none';
        });

        document.getElementById('exit-btn').addEventListener('click', () => {
            fakeShutdown.style.display = 'none';
            tnt.style.display = 'flex';
        });

        tntImg.addEventListener('click', () => {
            setTimeout(() => {
                tnt.style.display = 'none';
                document.body.innerHTML = '';
            }, 1000);
        });
    }
});