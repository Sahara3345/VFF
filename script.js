document.addEventListener('DOMContentLoaded', () => {
    let membersData = [];

    const membersDiv = document.getElementById('members');

    membersData.forEach(member => {
        const memberDiv = document.createElement('div');
        memberDiv.classList.add('member');

        const nameSpan = document.createElement('span');
        nameSpan.textContent = member.name;

        const statusSpan = document.createElement('span');
        statusSpan.classList.add('status');
        statusSpan.textContent = member.status;

        memberDiv.appendChild(nameSpan),
        membersDiv.appendChild(memberDiv);
    });

    function renderMembers() {
        membersDiv.innerHTML = '';
        const groupNameElement = document.createElement('h2');
        groupNameElement.textContent = membersData.groupName;
        membersDiv.appendChild(groupNameElement);

        membersData.members.forEach(member => {
            const memberDiv = document.createElement('div');
            memberDiv.classList.add('member');

            const numberSpan = document.createElement('span');
            numberSpan.textContent = member.number;
            numberSpan.classList.add('number');

            const roleSpan = document.createElement('span');
            roleSpan.textContent = member.role;
            roleSpan.classList.add('role');

            const nameSpan = document.createElement('span');
            nameSpan.textContent = member.name;

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.addEventListener('change', () => {
                memberDiv.classList.toggle('bold', checkbox.checked);
            });

            memberDiv.appendChild(numberSpan);
            memberDiv.appendChild(checkbox);
            memberDiv.appendChild(roleSpan);
            memberDiv.appendChild(nameSpan);
            membersDiv.appendChild(memberDiv);
        });
    }

    const csvFileInput = document.getElementById('csvFileInput');
    csvFileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const csvData = e.target.result;
                const parsedMembers = parseCSV(csvData);
                membersData = parsedMembers;
                renderMembers();
            };
            reader.readAsText(file);
        }
    });

    function parseCSV(csvText) {
        const lines = csvText.split('\n');
        let groupName = '';
        const members = [];
        if (lines.length > 0) {
            groupName = lines[0].trim();
            for (let i = 1; i < lines.length; i++) {
                const line = lines[i].trim();
                if (line) {
                    const parts = line.split(',');
                    if (parts.length === 3) {
                        const number = parts[0].trim();
                        const role = parts[1].trim();
                        const name = parts[2].trim();
                        members.push({ number: number, role: role, name: name });
                    }
                }
            }
        }
        return { groupName, members };
    }

    const clearButton = document.getElementById('clearButton');
    clearButton.addEventListener('click', () => {
        membersData = [];
        membersDiv.innerHTML = '';
        csvFileInput.value = '';
    });
});
